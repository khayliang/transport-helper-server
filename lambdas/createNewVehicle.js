const Dynamo = require("../dynamo");

module.exports.createNewVehicle = async (event) => {
  const body = JSON.parse(event.body);

  try {
    await Dynamo.createNewVehicle(body);

    return {
      statusCode: 201,
    };
  } catch (err) {
    return {
      body: err.message,
      statusCode: 400,
    };
  }
};
