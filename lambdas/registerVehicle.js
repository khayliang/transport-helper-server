const { object, number, string } = require("yup");

const Dynamo = require("../dynamo");

const vehicleSchema = object({
  vehicle_no: number().required(),
  vehicle_class: number().required(),
  model: string().required(),
  last_topup_mileage: number().required(),
  last_activity_timestamp: number().required(),
  current_mileage: number().required(),
  status: string(),
  node: string().required(),
  last_activity_type: string().required()
});

module.exports.registerVehicle = async (event) => {
  try {
    const vehicle = await vehicleSchema.validate(JSON.parse(event.body));
    await Dynamo.registerVehicle(vehicle);

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
