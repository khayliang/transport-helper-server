module.exports = async (documentClient, data) => {
  const putParams = {
    TableName: process.env.DYNAMODB_USER_TABLE,
    Item: {
      telegram_id: data.telegram_id,
      army_unit: data.army_unit,
      name: data.name,
      nric: data.nric,
      total_mileage: data.total_mileage,
      role: data.role,
      rank: data.rank,
    },
  };

  return await documentClient.put(putParams).promise();
};
