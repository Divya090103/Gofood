const express = require("express");
require('dotenv').config();

const app = express();
const cors = require("cors");
const connect = require("./database/db.js");
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client's origin
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.get("/", (req, res) => {
  res.send("Hello it created");
});
//provide middle ware
app.use(express.json());
//middle ware for creating user
app.use("/api", require("./Routes/createuser.js"));
//middle ware to get data
app.use("/api",require("./Routes/displaydata.js"))
//middle ware to check the token is authorize or not
app.use("/api",require("./Routes/authorize.js"))
//middle ware to verify the mail of the user
app.use("/api",require("./Routes/verify.js"))
//middle ware to post the check out data
app.use("/api",require("./Routes/ALL_orders.js"))
//middleware to get the all the ordered data
app.use("/api",require("./Routes/getorder.js"))
//send mail fior verification
app.listen(process.env.port, () => {
  connect();
console.log("going show",global.food_items)

  console.log("server is created");
});
