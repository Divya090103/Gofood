const mongoose = require("mongoose");
const uri =
  "mongodb+srv://divya65air:123RTTp0824@cluster0.nsuwbvj.mongodb.net/food-delivery?retryWrites=true&w=majority";

const mongodb = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connection successful");

  
  } catch (e) {
    console.log("Connection error:", e);
    return false;
  }
};

module.exports = mongodb;
