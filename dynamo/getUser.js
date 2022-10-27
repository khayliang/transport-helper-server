module.exports = async (dynamoDb, id) => {
  const params = {
    TableName: process.env.DYNAMODB_USER_TABLE,
    Key: {
      telegram_id: id,
    },
  };
  const { Item } = await dynamoDb.get(params).promise();

  return Item;
};
