module.exports = async (dynamodb, { telegram_id, month, year }) => {
  const userActivityId = `${telegram_id}#${month}#${year}`;
  const params = {
    TableName: process.env.DYNAMODB_ACTIVITY_TABLE,
    IndexName: "UserActivityIndex",
    KeyConditionExpression: "telegram_id_by_month = :s",
    ExpressionAttributeValues: {
      ":s": userActivityId,
    },
  };
  const data = await dynamodb.query(params).promise();
  return data;
};
