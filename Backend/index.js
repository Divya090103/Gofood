const express = require("express");
const app = express();
const port = 5000;
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
app.use("/api", require("./Routes/createuser.js"));

app.listen(port, () => {
  connect();
  console.log(`server is created,${port}`);
});
