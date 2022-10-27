const { object, number, string } = require("yup");

const Dynamo = require("../dynamo");

const userSchema = object({
  telegram_id: number().required(),
  army_unit: string().required(),
  name: string().required().uppercase(),
  total_mileage: number().required(),
  rank: string().required(),
});

module.exports.createNewUser = async (event) => {
  try {
    const user = await userSchema.validate(JSON.parse(event.body));
    await Dynamo.createNewUser(user);

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
