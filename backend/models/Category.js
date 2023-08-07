const mongoose =require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    // unique: true
  },
  slug:{
    type: String,
    lowercase: true
  },
  catImg:{
    type: String,
    required: true
  }
})

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;