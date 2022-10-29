"use strict";

const createNewUserFunction = require("./createNewUser");
const registerVehicleFunction = require("./registerVehicle");
const createNewActivityFunction = require("./createNewActivity");
const getUsersInArmyUnitFunction = require("./getUsersInArmyUnit");
const getUserFunction = require("./getUser");
const getUserActivityOfMonthFunction = require("./getUserActivityOfMonth");
const getVehiclesInNodeFunction = require("./getVehiclesInNode");

const AWS = require("aws-sdk");

const dynamo = {
  dynamoDb: new AWS.DynamoDB(),
  documentClient: new AWS.DynamoDB.DocumentClient()
}

module.exports = {
  createNewUser: async (data) => createNewUserFunction(dynamo, data),
  registerVehicle: async (data) => registerVehicleFunction(dynamo, data),
  createNewActivity: async (data) => createNewActivityFunction(dynamo, data),
  getUsersInArmyUnit: async (army_unit) =>
    getUsersInArmyUnitFunction(dynamo, army_unit),
  getUser: async (telegram_id) => getUserFunction(dynamo, telegram_id),
  getUserActivityOfMonth: async (data) =>
    getUserActivityOfMonthFunction(dynamo, data),
  getVehiclesInNode: async (data) => getVehiclesInNodeFunction(dynamo, data),
};
