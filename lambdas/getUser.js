const Dynamo = require("../dynamo");

module.exports.getUser = async (event) => {
  try {
    if (!event.queryStringParameters.telegram_id) {
      throw Error("No telegram_id parameter in query string");
    }

    const telegram_id = event.queryStringParameters.telegram_id;
    const userData = await Dynamo.getUser(telegram_id);

    return {
      statusCode: 200,
      body: JSON.stringify(userData),
    };
  } catch (err) {
    return {
      body: err.message,
      statusCode: 400,
    };
  }
};
