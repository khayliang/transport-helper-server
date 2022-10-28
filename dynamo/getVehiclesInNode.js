module.exports = async (dynamoDb, node) => {
  const params = {
    TableName: process.env.DYNAMODB_VEHICLE_TABLE,
    IndexName: "NodeVehiclesIndex",
    KeyConditionExpression: "node = :s",
    ExpressionAttributeValues: {
      ":s": node,
    },
  };

  return await dynamoDb.query(params).promise();
};
