const { orderBy } = require("lodash");

module.exports = async (dynamo, { telegram_id, month, year }) => {
  const { documentClient } = dynamo;

  const userActivityId = `${telegram_id}#${month}#${year}`;
  const params = {
    TableName: process.env.DYNAMODB_ACTIVITY_TABLE,
    IndexName: "UserActivityIndex",
    KeyConditionExpression: "telegram_id_by_month = :s",
    ExpressionAttributeValues: {
      ":s": userActivityId,
    },
  };
  const { Items } = await documentClient.query(params).promise();
  const parsedActivities = Items.map((activity) => {
    const { vehicle_no_by_week, ...rest } = activity;
    const vehicle_no = vehicle_no_by_week.split("#")[0];
    return {
      ...rest,
      vehicle_no,
    };
  });
  return orderBy(parsedActivities, ["timestamp"], ["asc"]);
};
