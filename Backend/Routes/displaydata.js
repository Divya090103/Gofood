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
Routes.post("/category", async (req, res) => {
  try {
    const category = await mongoose.connection.db.collection("Category");
    const fetched = await category.find({}).toArray();
    return res.send([fetched]);
  } catch (e) {
    return res.send(e);
  }
});

Routes.post("/searchcategory", async (req, res) => {
  try {
    const category = req.body.category_name;
    const data = await mongoose.connection.db.collection("data");
    // const result = await data.find({ category_name: category }).toArray();
    const result=await data.find({category_name:{$regex:category,$options:'i'}}).toArray();
    if(result.length==0)
    {return res.status(404).json({
      success: false,
      items: [],
      message: "Internal Server Error",
    })}
    else return res.status(200).json({
      success:true,
      items:result
    })
  } catch (error) {
    return res.json({
      success: false,
      items: [],
      message: "Internal Server Error",
    });
  }
});
module.exports = Routes;
