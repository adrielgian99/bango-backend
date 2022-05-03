const express = require("express");
const { userControllers } = require("../controllers");
const routers = express.Router();

routers.post("/register", userControllers.add);

module.exports = routers;
