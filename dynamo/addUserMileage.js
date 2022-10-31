const getUser = require("./getUser");

module.exports = async (dynamo, { telegram_id, mileage_to_add }) => {
  const { documentClient } = dynamo;
  const { total_mileage } = await getUser(dynamo, telegram_id);
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

  await documentClient.update(params).promise();
};
