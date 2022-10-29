module.exports = async (documentClient, node) => {
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
