const express = require("express");
const Routes = express.Router();
const mongoose = require("mongoose");
Routes.post("/getallorder", async (req, res) => {
  try {
    const category = await mongoose.connection.db.collection("orders");
    const fetched = await category.find({}).toArray();
    return res.send(fetched); 
  } catch (e) {
    return res.send({ success: false, message: "error" });
  }
});
module.exports=Routes
