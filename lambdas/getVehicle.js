const { number } = require("yup");
const Dynamo = require("../dynamo");

const vehicleNoSchema = number().required();

module.exports.getVehicle = async (event) => {
  try {
    if (!event.queryStringParameters.vehicle_no) {
      throw Error("No vehicle_no parameter in query string");
    }

    const vehicle_no = await vehicleNoSchema.validate(
      event.queryStringParameters.vehicle_no
    );
    const vehicleData = await Dynamo.getVehicle(vehicle_no);

    return {
      statusCode: 200,
      body: JSON.stringify(vehicleData),
    };
  } catch (err) {
    return {
      body: err.message,
      statusCode: 400,
    };
  }
};
