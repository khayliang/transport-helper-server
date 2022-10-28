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
    const wptVehiclesInUnregistered = _.slice(
      unregisteredVehicles,
      0,
      _.sortedIndexBy(
        unregisteredVehicles,
        { last_activity_timestamp: oneWeekBeforeTimestamp },
        (x) => x.last_activity_timestamp
      )
    );

    unregisteredWpt1 = [];
    unregisteredWpt2 = [];
    nodeWpt1 = [];
    nodeWpt2 = [];

    wptVehiclesInUnregistered.forEach((vehicle) => {
      const { last_activity_type } = vehicle;
      if (last_activity_type === "wpt1") unregisteredWpt2.push(vehicle);
      else unregisteredWpt1.push(vehicle);
    });

    wptVehiclesInNode.forEach((vehicle) => {
      const { last_activity_type } = vehicle;
      if (last_activity_type === "wpt1") nodeWpt2.push(vehicle);
      else nodeWpt1.push(vehicle);
    });

    const data = {
      unregistered: {
        wpt1: unregisteredWpt1,
        wpt2: unregisteredWpt2,
      },
      node: {
        wpt1: nodeWpt1,
        wpt2: nodeWpt2,
      },
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
