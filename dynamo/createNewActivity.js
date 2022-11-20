const createNewVehicle = require("./registerVehicle");
const getVehicle = require("./getVehicle");
const replaceVehicle = require("./replaceVehicle");
const addUserMileage = require("./addUserMileage");
const { format } = require("util");

Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function () {
  var date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  return date.getFullYear();
};

module.exports = async (
  dynamo,
  {
    timestamp,
    vehicle_no,
    telegram_id,
    final_mileage,
    activity_type,
    initial_mileage,
    vehicle_class,
    purpose,
    ivc_working,
    initial_destination,
    final_destination,
    final_timestamp,
    pol_amt,
    pol_odo,
  }
) => {
  const { documentClient } = dynamo;

  const dateOfActivity = new Date(timestamp);

  const yearOfActivity = dateOfActivity.getWeekYear();
  const weekOfYear = dateOfActivity.getWeek();
  const monthOfActivity = dateOfActivity.getMonth();

  const vehicleWeekString = `${vehicle_no}#${weekOfYear}#${yearOfActivity}`;
  const telegramIdString = `${telegram_id}#${monthOfActivity}#${yearOfActivity}`;
  const vehicle = await getVehicle(dynamo, vehicle_no);

  let latestActivityTimestamp = 0;
  let mostCurrentMileage = 0;
  let timestampByVehicleNo = 0;

  if (vehicle) {
    latestActivityTimestamp =
      timestamp > vehicle.last_activity_timestamp
        ? timestamp
        : vehicle.last_activity_timestamp;
    timestampByVehicleNo = `${latestActivityTimestamp}${vehicle_no}`;

    mostCurrentMileage =
      final_mileage > vehicle.current_mileage
        ? final_mileage
        : vehicle.current_mileage;
  } else {
    timestampByVehicleNo = `${timestamp}${vehicle_no}`;
    mostCurrentMileage = final_mileage;
  }

  if (final_mileage < initial_mileage) {
    throw Error("Final mileage is less than initial mileage.");
  }

  if (final_timestamp < timestamp) {
    throw Error("End time is less than starting time.");
  }

  if (pol_odo > final_mileage) {
    throw Error(
      "POL odometer mileage is greater than ending odometer mileage."
    );
  }

  if (!vehicle) {
    await createNewVehicle(dynamo, {
      vehicle_no,
      model: "unregistered",
      last_topup_mileage: 0,
      status: "active",
      current_mileage: mostCurrentMileage,
      status: "active",
      last_activity_timestamp: timestamp,
      vehicle_class,
      node: "unregistered",
      last_activity_type: activity_type,
    });
  } else {
    await replaceVehicle(dynamo, {
      ...vehicle,
      current_mileage: mostCurrentMileage,
      last_activity_timestamp: latestActivityTimestamp,
      timestamp_by_vehicle_no: timestampByVehicleNo,
      last_activity_type: activity_type,
    });
  }

  await addUserMileage(dynamo, {
    telegram_id,
    mileage_to_add: final_mileage - initial_mileage,
  });

  const putParams = {
    TableName: process.env.DYNAMODB_ACTIVITY_TABLE,
    Item: {
      vehicle_no_by_week: vehicleWeekString,
      final_mileage: final_mileage,
      telegram_id_by_month: telegramIdString,
      activity_type: activity_type,
      timestamp: timestamp,
      initial_mileage: initial_mileage,
      vehicle_class: vehicle_class,
      purpose,
      ivc_working,
      initial_destination,
      final_destination,
      final_timestamp,
      pol_amt,
      pol_odo,
    },
  };

  return await documentClient.put(putParams).promise();
};
