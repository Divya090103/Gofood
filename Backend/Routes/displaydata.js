const express = require("express");
const Routes = express.Router();
const mongoose = require("mongoose");
const connect = require("../database/db.js");
Routes.post("/food_data", async (req, res) => {
  try{
    const data=await mongoose.connection.db.collection("data");
    const fetched=await data.find({}).toArray();
    console.log(fetched);
    return res.send([fetched]);
  }catch(e){
    console.log(e);
  }
});
module.exports = Routes;
