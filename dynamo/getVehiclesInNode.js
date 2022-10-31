module.exports = async (dynamo, node) => {
  const { documentClient } = dynamo;

  const params = {
    TableName: process.env.DYNAMODB_VEHICLE_TABLE,
    IndexName: "NodeVehiclesIndex",
    KeyConditionExpression: "node = :s",
    ExpressionAttributeValues: {
      ":s": node,
    },
  };

  return await documentClient.query(params).promise();
};
