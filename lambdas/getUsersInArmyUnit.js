const Dynamo = require("../dynamo");

module.exports.getUsersInArmyUnit = async (event) => {
  try {
    if (!event.queryStringParameters.army_unit) {
      throw Error("No army_unit parameter in query string");
    }

    const army_unit = event.queryStringParameters.army_unit;

    const data = await Dynamo.getUsersInArmyUnit(army_unit);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      body: err.message,
      statusCode: 400,
    };
  }
};
