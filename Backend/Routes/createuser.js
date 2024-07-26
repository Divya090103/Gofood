const express = require("express");
const routes = express.Router();
//get schema
const user = require("../models/User");
//now we have to check wheather the data is validate or not thus we use express valodator
//Bcrypt use for encode the password on the server
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jsonSecret = "forauthentication";
const { body, validationResult } = require("express-validator");
routes.post(
  "/createuser",
  [
    body("name").notEmpty(),
    body("Location").isLength({ min: 5 }),
    body("phone_num").isLength({ max: 10 }).isNumeric(),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log("result is emty");
      return res.status(400).json({ result: result.array() });
    }
    try {
      console.log("going to try");
      //addition charac add to password make it secure
      const salt = await Bcrypt.genSalt(10);
      const newpasswors = await Bcrypt.hash(req.body.password, salt);
      await user.create({
        name: req.body.name,
        Location: req.body.Location,
        phone_num: req.body.phone_num,
        email: req.body.email,
        password: newpasswors,
      });
      return res.json({ success: true });
    } catch (e) {
      return res.json({ success: false });
    }
  }
);

//find user
routes.post("/log_in", async (req, res) => {
  try {
    let username = req.body.name;
    let getuser = await user.findOne({ name: username });
    // console.log(usermail);
    if (!getuser) {
      return res.status(400).json("put correct mail");
    }
    const compare = await Bcrypt.compare(req.body.password, getuser.password);
    if (!compare) return res.status(400).json("put correct mail");

    const data = {
      User: {
        id: getuser.id,
      },
    };
    const jwttoken=jwt.sign(data,jsonSecret);
    return res.json({ success: true, usercontent: user ,authorizetoken:jwttoken});
  } catch (e) {
    return res.json({ success: false, message: "not found" });
  }
});
module.exports = routes;

// jwt (JSONWEB TOKEN):It gives the authorization that once the user login in,each subsequent request of jwt allowing ther user to access the routes ,services that are permitted with that token
