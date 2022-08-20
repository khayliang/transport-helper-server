module.exports = async (dynamoDb, army_unit) => {
  const params = {
    TableName: process.env.DYNAMODB_USER_TABLE,
    IndexName: "ArmyUnitIndex",
    KeyConditionExpression: "army_unit = :s",
    ExpressionAttributeValues: {
      ":s": army_unit,
    },
  };

  return await dynamoDb.query(params).promise();
};
