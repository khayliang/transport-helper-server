const getUser = require("./getUser");

module.exports = async (dynamoDb, { telegram_id, mileage_to_add }) => {
  const { total_mileage } = await getUser(dynamoDb, telegram_id);
  const params = {
    TableName: process.env.DYNAMODB_USER_TABLE,
    Key: {
      telegram_id: telegram_id,
    },
    UpdateExpression: "set total_mileage = :r",
    ExpressionAttributeValues: {
      ":r": total_mileage + mileage_to_add,
    },
  };

  await dynamoDb.update(params).promise();
};
