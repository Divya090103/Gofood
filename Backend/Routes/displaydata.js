const express = require("express");
const Routes = express.Router();
const mongoose = require("mongoose");
const connect = require("../database/db.js");
Routes.post("/food_data", async (req, res) => {
  try {
    const data = await mongoose.connection.db.collection("data");
    const fetched = await data.find({}).toArray();

    return res.send([fetched]);
  } catch (e) {
    console.log(e);
  }
});
Routes.post("/category",async(req,res)=>{
  try{
    const category = await mongoose.connection.db.collection("Category");
    const fetched=await category.find({}).toArray();
    return res.send([fetched]);

  }catch(e){
    return res.send(e);
  }

})
module.exports = Routes;
