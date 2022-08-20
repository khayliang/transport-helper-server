const Dynamo = require("../dynamo");

module.exports.createNewActivity = async (event) => {
  const body = JSON.parse(event.body);

  try {
    await Dynamo.createNewActivity(body);

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
