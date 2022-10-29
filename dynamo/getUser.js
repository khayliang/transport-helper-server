module.exports = async (documentClient, id) => {
  const params = {
    TableName: process.env.DYNAMODB_USER_TABLE,
    Key: {
      telegram_id: id,
    },
  };
  const { Item } = await documentClient.get(params).promise();

  return Item;
};
