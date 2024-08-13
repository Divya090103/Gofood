const mongoose=require("mongoose");
const {Schema}=mongoose;
const orderSchema= new Schema({
  "order_id":{type:String},
  "customer_name":{type:String},
  "category":{type:String},
  "product_name":{type:String},
  "product_image":{type:String}
})