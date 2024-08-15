const express = require("express");
const routes = express.Router();
//get schem
const order = require("../models/order.js");
routes.post("/ALL_orders", async (req, res) => {
  console.log("going to send the orders")
  console.log(req.body);
  //create a new orders

  try {
    // Create a new order
    const newOrder = await order.create({
      userID: req.body. userID, // Corrected to req.body.userID
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      date: req.body.date || Date.now(),
    });

    if (newOrder) {
      return res.send({ success: true, order: newOrder });
    } else {
      return res.send({ success: false, message: "Order creation failed" });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).send({ success: false, message: "Internal Server Error", error: error.message });
  }
});
module.exports = routes;
