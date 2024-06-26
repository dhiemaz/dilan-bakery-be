// import express from "express"
// import authMiddleware from "../middleware/auth.js"
// import { placeOrder } from "../controllers/orderController.js"

const express = require("express");
const authMiddleware = require("../middleware/auth.js");
const { placeOrder } = require("../controllers/orderController.js");

const orderRouter = express.Router();


orderRouter.post("/place",authMiddleware,placeOrder);

module.exports = orderRouter;
// export default orderRouter;