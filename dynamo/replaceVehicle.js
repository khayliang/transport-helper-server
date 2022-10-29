module.exports = async (
  dynamo,
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
    timestamp_by_vehicle_no,
  }
) => {
  const { dynamoDb } = dynamo;

  const putParams = {
    TableName: process.env.DYNAMODB_VEHICLE_TABLE,
    Item: {
      vehicle_no: {
        N: "" + vehicle_no,
      },
      model: {
        S: model,
      },
      vehicle_class: {
        N: "" + vehicle_class,
      },
      last_topup_mileage: {
        N: "" + last_topup_mileage,
      },
      last_activity_timestamp: {
        N: "" + last_activity_timestamp,
      },
      current_mileage: {
        N: "" + current_mileage,
      },
      status: {
        S: status ? status : "active",
      },
      node: {
        S: node,
      },
      last_activity_type: {
        S: last_activity_type,
      },
      timestamp_by_vehicle_no: {
        N: timestamp_by_vehicle_no,
      },
    },
  };

  return await dynamoDb.putItem(putParams).promise();
};
