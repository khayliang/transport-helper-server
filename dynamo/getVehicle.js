module.exports = async (dynamo, vehicle_no) => {
  const { documentClient } = dynamo;

  const params = {
    TableName: process.env.DYNAMODB_VEHICLE_TABLE,
    Key: {
      vehicle_no: vehicle_no,
    },
  };

  const { Item } = await documentClient.get(params).promise();

  return Item;
};
