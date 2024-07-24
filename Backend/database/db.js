const mongoose = require("mongoose");

const uri =
  "mongodb+srv://divya65air:123RTTp0824@cluster0.nsuwbvj.mongodb.net/food-delivery?retryWrites=true&w=majority";

const mongodb = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection successful");

    const fetch = async () => {
      try {
        const fetch_data = mongoose.connection.db.collection("data");
        const data = await fetch_data.find({}).toArray();
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetch();
  } catch (e) {
    console.log("Connection error:", e);
  }
};

module.exports = mongodb;
