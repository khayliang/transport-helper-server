module.exports = async (documentClient, vehicle_no) => {
  const params = {
    TableName: process.env.DYNAMODB_VEHICLE_TABLE,
    Key: {
      vehicle_no: vehicle_no,
    },
  };

  const { Item } = await documentClient.get(params).promise();

  return Item;
};
