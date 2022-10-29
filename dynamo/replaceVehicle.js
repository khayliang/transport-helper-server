module.exports = async (documentClient, vehicle) => {
  const putParams = {
    TableName: process.env.DYNAMODB_VEHICLE_TABLE,
    Item: vehicle,
  };
  return await documentClient.put(putParams).promise();
};
