const { _ } = require("lodash");
const moment = require("moment/moment");
const Dynamo = require("../dynamo");

module.exports.getWptListForNode = async (event) => {
  try {
    if (!event.queryStringParameters.node) {
      throw Error("No node parameter in query string");
    }

    const node = event.queryStringParameters.node;

    const { Items: nodeVehicles } = await Dynamo.getVehiclesInNode(node);
    const { Items: unregisteredVehicles } = await Dynamo.getVehiclesInNode(
      "unregistered"
    );

    const oneWeekBeforeTimestamp = moment()
      .subtract(6, "days")
      .toDate()
      .valueOf();
    const wptVehiclesInNode = _.slice(
      nodeVehicles,
      0,
      _.sortedIndexBy(
        nodeVehicles,
        { last_activity_timestamp: oneWeekBeforeTimestamp },
        (x) => x.last_activity_timestamp
      )
    );
    const wptVehiclesInunregistered = _.slice(
      unregisteredVehicles,
      0,
      _.sortedIndexBy(
        unregisteredVehicles,
        { last_activity_timestamp: oneWeekBeforeTimestamp },
        (x) => x.last_activity_timestamp
      )
    );

    const data = {
      unregistered: wptVehiclesInunregistered,
      node: wptVehiclesInNode,
    };

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
