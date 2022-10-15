const createNewVehicle = require("./createNewVehicle");
const getVehicle = require("./getVehicle");
const replaceVehicle = require("./replaceVehicle");
const updateUserMileage = require("./addUserMileage");
const addUserMileage = require("./addUserMileage");

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
  dynamoDb,
  {
    timestamp,
    vehicle_no,
    telegram_id,
    final_mileage,
    activity_type,
    initial_mileage,
    vehicle_class,
  }
) => {
  const dateOfActivity = new Date(timestamp);

  const yearOfActivity = dateOfActivity.getWeekYear();
  const weekOfYear = dateOfActivity.getWeek();
  const monthOfActivity = dateOfActivity.getMonth();

  const vehicleWeekString = `${vehicle_no}#${weekOfYear}#${yearOfActivity}`;
  const telegramIdString = `${telegram_id}#${monthOfActivity}#${yearOfActivity}`;

  const vehicle = await getVehicle(dynamoDb, vehicle_no);

  if (final_mileage < initial_mileage) {
    throw Error("Final mileage is less than initial mileage.");
  }
  if (!vehicle) {
    await createNewVehicle(dynamoDb, {
      vehicle_no,
      current_mileage: final_mileage,
      status: "active",
      last_activity_timestamp: timestamp,
      vehicle_class: vehicle_class,
    });
  } else {
    await replaceVehicle(dynamoDb, {
      ...vehicle,
      current_mileage: final_mileage,
      last_activity_timestamp: timestamp,
    });
  }

  await addUserMileage(dynamoDb, {
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
    },
  };

  return await dynamoDb.put(putParams).promise();
};
