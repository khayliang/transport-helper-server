module.exports = async (dynamoDb, vehicle) => {
  const putParams = {
    TableName: process.env.DYNAMODB_VEHICLE_TABLE,
    Item: vehicle,
  };
  return await dynamoDb.put(putParams).promise();
};
