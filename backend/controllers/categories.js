const Category = require("../models/Category");
const slugify = require("slugify");

module.exports = {
  categoryController: async function (req, res, next) {
    try {
      const category = await Category.find({});
      res.status(200).send(category);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error getting all categories",
        error,
      });
    }
  },

  createCategoryController: async function (req, res, next) {
    try {
      const { name, catImg } = req.body;
      if (!name) {
        return res.status(401).send({ message: "Category name is required" });
      }
      if (!catImg) {
        return res.status(401).send({ message: "Category image is required" });
      }

      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(200).send({ message: "Category already exists" });
      }

      const category = await new Category({
        name,
        slug: slugify(name),
        catImg
      }).save();
      res
        .status(201)
        .send({ success: true, message: "Category created", category });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Category",
        error,
      });
    }
  },

  updateCategoryController: async function (req, res, next) {
    try {
      const { name, catImg } = req.body;
      const { id } = req.params;
      if (!name) {
        return res.send({ message: "Category name is required" });
      }
      if (!catImg) {
        return res.send({ message: "Category image is required" });
      }
      const category = await Category.findByIdAndUpdate(
        id,
        { name, slug: slugify(name), catImg },
        { new: true }
      );
      res
        .status(200)
        .send({ success: true, message: "Category updated", category });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error wile updating Category",
        error,
      });
    }
  },

  singleCategoryController: async function (req, res, next) {
    try {
   const category = await Category.findOne({slug: req.params.slug})
    res
      .status(200)
      .send({ success: true, message: "Found selected category", category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting single category",
      error,
    });
  }
  },

  deleteCategoryController: async function (req, res, next) {
    try {
      const { id } = req.params;
      await Category.findByIdAndDelete(id);
      res.status(200).send({ success: true, message: "Category deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error deleting category",
        error,
      });
    }
  },
};
