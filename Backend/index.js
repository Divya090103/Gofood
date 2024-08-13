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
// app.use("/api",require("./Routes/userorder.js"))
//send mail fior verification
// app.use("/send")
app.listen(process.env.port, () => {
  connect();
console.log("going show",global.food_items)

  console.log("server is created");
});
