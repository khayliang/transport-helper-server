"use strict";

const createNewUserFunction = require("./createNewUser");
const registerVehicleFunction = require("./registerVehicle");
const createNewActivityFunction = require("./createNewActivity");
const getUsersInArmyUnitFunction = require("./getUsersInArmyUnit");
const getUserFunction = require("./getUser");
const getUserActivityOfMonthFunction = require("./getUserActivityOfMonth");
const getVehiclesInNodeFunction = require("./getVehiclesInNode");

const AWS = require("aws-sdk");
//const documentClient = new AWS.DynamoDB()
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
  createNewUser: async (data) => createNewUserFunction(documentClient, data),
  registerVehicle: async (data) => registerVehicleFunction(documentClient, data),
  createNewActivity: async (data) => createNewActivityFunction(documentClient, data),
  getUsersInArmyUnit: async (army_unit) =>
    getUsersInArmyUnitFunction(documentClient, army_unit),
  getUser: async (telegram_id) => getUserFunction(documentClient, telegram_id),
  getUserActivityOfMonth: async (data) =>
    getUserActivityOfMonthFunction(documentClient, data),
  getVehiclesInNode: async (data) => getVehiclesInNodeFunction(documentClient, data),
};
