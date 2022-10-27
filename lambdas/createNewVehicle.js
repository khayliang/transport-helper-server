const { object, number, string } = require("yup");

const Dynamo = require("../dynamo");

const vehicleSchema = object({
  vehicle_no: number().required(),
  vehicle_class: number().required(),
  model: string().required(),
  last_topup_mileage: number().required(),
  last_activity_timestamp: number().required(),
  current_mileage: number().required(),
  status: string().required(),
  node: string().required(),
});

module.exports.createNewVehicle = async (event) => {
  try {
    const vehicle = await vehicleSchema.validate(JSON.parse(event.body));
    await Dynamo.createNewVehicle(vehicle);

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
