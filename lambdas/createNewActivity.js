const { object, number, string, boolean } = require("yup");

const Dynamo = require("../dynamo");

const activitySchema = object({
  timestamp: number().required(),
  purpose: string(),
  ivc_working: boolean(),
  initial_destination: string(),
  final_destination: string(),
  final_timestamp: number(),
  pol_amt: number(),
  pol_odo: number(),
  vehicle_no: number().required(),
  telegram_id: number().required(),
  final_mileage: number().required(),
  activity_type: string().required(),
  initial_mileage: number().required(),
  vehicle_class: number().required(),
});

module.exports.createNewActivity = async (event) => {
  try {
    const activity = await activitySchema.validate(JSON.parse(event.body));
    await Dynamo.createNewActivity(activity);

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
