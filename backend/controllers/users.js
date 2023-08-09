const User = require("../models/User");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const config = require("../config/dev");
const sendEmail = require("./../utils/mail");

const signToken = (_id) => {
  return jwt.sign({ _id }, config.jwt_token, { expiresIn: "72800s" });
};

module.exports = {
  allUsers: async function (req, res, next) {
    try {
      const result = await User.find();
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "error getting users" });
    }
  },
  signup: async function (req, res, next) {
    try {
      const { firstName, lastName, email, password, phone, address } = req.body;
      if (!firstName) {
        return res.send({ message: "First name is required" });
      }
      if (!lastName) {
        return res.send({ message: "Last name is required" });
      }
      if (!email) {
        return res.send({ message: "Email is required" });
      }
      if (!password) {
        return res.send({ message: "Password is required" });
      }
      if (!phone) {
        return res.send({ message: "Phone is required" });
      }
      if (!address) {
        return res.send({ message: "Address is required" });
      }
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(200).send({
          success: false,
          message: "Already registered please login",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      const user = await new User({
        firstName,
        lastName,
        email,
        password: hash,
        phone,
        address,
      }).save();

      await sendEmail({
        email: user.email,
        subject: "Thank you for registering.",
        html: ` <h1>We can't wait to show you what we have in store!</h1> <a href="http://localhost:3001"><button style="background-color:blue; border: none; color: white; height: 35px; cursor: pointer; ">Go to Bcard NOW!</button> </a>`,
      });

      res.status(201).send({
        success: true,
        message: "User registered successfully.",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error in Registration",
        error,
      });
    }
  },

  login: async function (req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registered",
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(200).send({
          success: false,
          message: "Invalid password",
        });
      }

      const token = signToken(user._id);
      res.status(200).send({
        success: true,
        message: "Login successful.",
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
          favorites: user.favorites,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: true,
        message: "Error logging in",
        error,
      });
    }
  },

  updateProfileController: async function (req, res, next) {
    try {
      const { firstName, lastName, email, password, address, phone } = req.body;
      const user = await User.findById(req.user._id);
      if (password && password.length < 6) {
        return res.json({
          error: "Password is required and min of 6 characters long",
        });
      }
      // const hashedPassword = password ? await hashPassword(password) : undefined;
      const hashedPassword = password
        ? await bcrypt.hash(password, 10)
        : undefined;
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          firstName: firstName || user.firstName,
          lastName: lastName || user.lastName,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile updated",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error updating profile",
        error,
      });
    }
  },

  deleteUserController: async function (req, res, next) {
    try {
     const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.status(200).send({ success: true, message: "User deleted" });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error deleting user",
        error,
      });
    }
  },
};
