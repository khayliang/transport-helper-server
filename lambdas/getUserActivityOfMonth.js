const { object, number } = require("yup");

const Dynamo = require("../dynamo");

const userActivityQuerySchema = object({
  telegram_id: number().required(),
  month: number().required(),
  year: number().required(),
});

module.exports.getUserActivityOfMonth = async (event) => {
  try {
    const { telegram_id, month, year } = event.queryStringParameters;
    if (!telegram_id || !month || !year) {
      throw Error("Missing query variables: telegram_id, month, year");
    }
    const userActivityQuery = await userActivityQuerySchema.validate(
      event.queryStringParameters
    );
    const userData = await Dynamo.getUserActivityOfMonth(userActivityQuery);

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
