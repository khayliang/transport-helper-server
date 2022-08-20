const Dynamo = require("../dynamo");

module.exports.getUserActivityOfMonth = async (event) => {
  try {
    const { telegram_id, month, year } = event.queryStringParameters;
    if (!telegram_id || !month || !year) {
      throw Error("Missing query variables: telegram_id, month, year");
    }

    const userData = await Dynamo.getUserActivityOfMonth({
      telegram_id,
      month,
      year,
    });

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
