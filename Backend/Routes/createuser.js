const express = require("express");
const routes = express.Router();
//get schema
const user = require("../models/User");
//now we have to check wheather the data is validate or not thus we use express valodator
//Bcrypt use for encode the password on the server
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//get verfication function
const sendVerificationEmail = require("./nodemailer");

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
    console.log(req.body);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log("result is emty");
      return res.status(400).json({ result: result.array() });
    }
    try {
      //check if the mail is already present or not
      console.log("send the mail request");
      const mail = req.body.email;
      const name =req.body.name;
      const result = await user.findOne({ email: mail });
      const reslt=await user.findOne({name:name})
      if (result||reslt) {
        return res.status(400).json({
          success: false,
          message: "already present user with that mail id",
        });
      } else {
        console.log("going to try");
        //addition charac add to password make it secure
        const salt = await Bcrypt.genSalt(10);
        const newpasswors = await Bcrypt.hash(req.body.password, salt);
        console.log("change in bcrypt completed");
        //create a user using model
        //send mail to verified using nodemailer
        //npm i nodemailer
        //we use Smtp server which given by Ethereal
        console.log("user model creation");
        function generateVerificationToken(user) {
          console.log("generate tokem");
          return jwt.sign({ id: user.phone_num }, process.env.jsonSecret, {
            expiresIn: "1h",
          });
        }
       
        const User = req.body;
        const token = generateVerificationToken(User);
        console.log("send the mail verification function");
        const sendmail = sendVerificationEmail(User, token); //send mail
        const newuser = {
          //create a user
          name: req.body.name,
          Location: req.body.Location,
          phone_num: req.body.phone_num,
          email: req.body.email,
          password: newpasswors,
          JwtToken:token
        };
        if (sendmail) {
          //send the to port where check the verification
          await user.create({
            ...newuser,
            verified: false,
          });
          console.log("going to redirect");
          return res.json({
            success: true,
            message: "verfication mail sent successfully",
          });
        } else
          return res.json({
            success: true,
            message: "message is not verified yet",
          });
      }
    } catch (e) {
      console.log("error in create user");
      return res.json({ success: false, message: "catch error" });
    }
  }
);

//log in user
    routes.post("/log_in", async (req, res) => {
      try {
        let username = req.body.name;
        let getuser = await user.findOne({ name: username });
        // console.log(usermail);
        if (!getuser) {
          return res.status(400).json("put correct username");
        }
        const compare = await Bcrypt.compare(
          req.body.password,
          getuser.password
        );
        if (!compare) return res.status(400).json("put correct password");
        // const data = {
        //   User: {
        //     id: getuser._id, // Use the user’s ID from the database
        //   },
        // };
        console.log(getuser);
        if(getuser.verified){
    // Fetch previous orders for the user
        return res.json({
          success: true,
          // usercontent: user,
          user: getuser,
        });
      }else return res.json({
        success:false,
        message:"not verified user yet"
      })
      } catch (e) {
        console.log("erroe during log in", e);
        return res.json({ success: false, message: "not found" });
      }
    });

    
module.exports = routes;

// jwt (JSONWEB TOKEN):It gives the authorization that once the user login in,each subsequent request of jwt allowing ther user to access the routes ,services that are permitted with that token
