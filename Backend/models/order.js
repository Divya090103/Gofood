const mongoose = require("mongoose");
const { Schema } = mongoose;
//store the ordered data of particular user
const orderSchema = new Schema({
  userID: { type:String, required: true },
  items: [
    {
      Qty: { type: Number, required: true },
      Size: {
        type: String,
      },
      id: { type: String },
      image: {
        type: String,
      },
      name: { type: String, required: true },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("order", orderSchema);
