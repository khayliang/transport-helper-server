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
    last_activity_type,
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
      last_activity_type,
      timestamp_by_vehicle_no: `${last_activity_timestamp}${vehicle_no}`,
    },
  };

  return await dynamoDb.put(putParams).promise();
};
