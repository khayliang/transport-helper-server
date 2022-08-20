module.exports = async (dynamoDb, telegram_id) => {
  const params = {
    TableName: process.env.DYNAMODB_USER_TABLE,
    Key: {
      telegram_id: telegram_id,
    },
  };

  const { Item } = await dynamoDb.get(params).promise();

  return Item;
};
