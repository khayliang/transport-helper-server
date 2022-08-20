module.exports = async (dynamoDb, vehicle_no) => {
  const params = {
    TableName: process.env.DYNAMODB_VEHICLE_TABLE,
    Key: {
      vehicle_no: vehicle_no,
    },
  };

  const { Item } = await dynamoDb.get(params).promise();

  return Item;
};
