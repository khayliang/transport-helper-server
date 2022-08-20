const getVehicle = require("./getVehicle");

module.exports = async (
  dynamoDb,
  {
    vehicle_no,
    model,
    vehicle_class,
    last_topup_mileage,
    last_activity_timestamp,
    current_mileage,
    status,
    node,
  }
) => {
  const get_vehicle_response = await getVehicle(dynamoDb, vehicle_no);
  if (get_vehicle_response) {
    throw Error("Vehicle already exists in database");
  }

  const putParams = {
    TableName: process.env.DYNAMODB_VEHICLE_TABLE,
    Item: {
      vehicle_no,
      model,
      vehicle_class,
      last_topup_mileage,
      last_activity_timestamp,
      current_mileage,
      status,
      node,
    },
  };

  return await dynamoDb.put(putParams).promise();
};
