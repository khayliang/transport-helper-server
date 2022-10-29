module.exports = async (dynamo, id) => {
  const { documentClient } = dynamo;

  const params = {
    TableName: process.env.DYNAMODB_USER_TABLE,
    Key: {
      telegram_id: id,
    },
  };
  const { Item } = await documentClient.get(params).promise();

  return Item;
};
