"use strict";

const createNewUserFunction = require("./createNewUser");
const registerVehicleFunction = require("./registerVehicle");
const createNewActivityFunction = require("./createNewActivity");
const getUsersInArmyUnitFunction = require("./getUsersInArmyUnit");
const getUserFunction = require("./getUser");
const getUserActivityOfMonthFunction = require("./getUserActivityOfMonth");
const getVehiclesInNodeFunction = require("./getVehiclesInNode");

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = {
  createNewUser: async (data) => createNewUserFunction(dynamoDb, data),
  registerVehicle: async (data) => registerVehicleFunction(dynamoDb, data),
  createNewActivity: async (data) => createNewActivityFunction(dynamoDb, data),
  getUsersInArmyUnit: async (army_unit) =>
    getUsersInArmyUnitFunction(dynamoDb, army_unit),
  getUser: async (telegram_id) => getUserFunction(dynamoDb, telegram_id),
  getUserActivityOfMonth: async (data) =>
    getUserActivityOfMonthFunction(dynamoDb, data),
  getVehiclesInNode: async (data) => getVehiclesInNodeFunction(dynamoDb, data),
};
