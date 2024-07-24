const express = require("express");
const routes = express.Router();
//get schema
const user = require("../models/User");
//now we have to check wheather the data is validate or not thus we use express valodator
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
      console.log("result is emty")
      return res.status(400).json({ result: result.array() });
    }
    try {
      console.log("going to try")
      await user.create({
        name: req.body.name,
        Location: req.body.Location,
        phone_num: req.body.phone_num,
        email: req.body.email,
        password: req.body.password,
      });
      return res.json({ success: true });
    } catch (e) {
      return res.json({ success: false });
    }
  }
);

module.exports = routes;
