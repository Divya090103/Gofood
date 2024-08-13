const mongoose = require("mongoose")
  // "mongodb+srv://divya65air:123RTTp0824@cluster0.nsuwbvj.mongodb.net/food-delivery?retryWrites=true&w=majority";
  // console.log(uri)

const mongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
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
