module.exports = async (dynamo, army_unit) => {
  const { documentClient } = dynamo;

  const params = {
    TableName: process.env.DYNAMODB_USER_TABLE,
    IndexName: "ArmyUnitIndex",
    KeyConditionExpression: "army_unit = :s",
    ExpressionAttributeValues: {
      ":s": army_unit,
    },
  };

  return await documentClient.query(params).promise();
};
