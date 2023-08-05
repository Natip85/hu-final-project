const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: Number,
      default: 0,
    },
    firstName: {
      type: String,
      required: [true, "Must submit a name."],
      maxlength: [100, "Too many characters."],
      minlength: [2, "Min 2 characters required."],
    },
    lastName: {
      type: String,
      maxlength: [100, "Too many characters."],
      minlength: [2, "Min 2 characters required."],
    },
    email: {
      type: String,
      unique: true,
      maxlength: [150, "Too many characters."],
      required: [true, "Must submit an email."],
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: [8, "Min 8 characters required."],
      maxlength: [200, "Max 200 characters allowed."],
    },
    phone: {
      type: String,
      minlength: [6, "Phone number is not valid"],
      maxlength: [250, "Phone number is not valid"],
      match: [
        /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Enter a valid phone number",
      ],
    },
    address: {
      type: {},
      required: true,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    blockReleaseTime: {
      type: Date,
      default: null,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
