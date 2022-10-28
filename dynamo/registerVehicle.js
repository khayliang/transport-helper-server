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
      timestamp_by_vehicle_no: `${last_activity_timestamp}${vehicle_no}`,
    },
  };

  return await dynamoDb.put(putParams).promise();
};
