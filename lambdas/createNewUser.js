const Dynamo = require("../dynamo");

module.exports.createNewUser = async (event) => {
  const body = JSON.parse(event.body);

  try {
    await Dynamo.createNewUser(body);

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
