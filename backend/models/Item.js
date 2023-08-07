const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must submit a name."],
      maxlength: [100, "Too many characters."],
      minlength: [2, "Min 2 characters required."],
    },
    slug: {
      type: String,
      required: [true, "Must submit a name."],
      maxlength: [100, "Too many characters."],
      minlength: [2, "Min 2 characters required."],
    },
    description: {
      type: String,
      required: [true, "Must submit a description."],
      maxlength: [5000, "Too many characters."],
      minlength: [2, "Min 2 characters required."],
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      // required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true
    },
    shipping: {
      type: Boolean,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
