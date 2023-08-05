const Item = require("../models/Item");
const User = require("../models/User");
const Category = require("../models/Category");

const slugify = require("slugify");
const fs = require("fs");

module.exports = {
  getProductController: async function (req, res, next) {
    try {
      const products = await Item.find({})
        .populate("category")
        .limit(12)
        .sort({ createdAt: -1 });

      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in getting products",
        error: error.message,
      });
    }
  },

  createProductController: async function (req, res, next) {
    try {
      const {
        name,
        slug,
        description,
        price,
        quantity,
        category,
        photo,
        shipping,
      } = req.body;
      // const { photo } = req.files;
      switch (true) {
        case !name:
          return res.status(500).send({ message: "Product name is required" });
        case !description:
          return res
            .status(500)
            .send({ message: "Product description is required" });
        case !price:
          return res.status(500).send({ message: "Product price is required" });
        case !category:
          return res
            .status(500)
            .send({ message: "Select a category for your product" });
        case !quantity:
          return res
            .status(500)
            .send({ message: "Product quantity is required" });
        case !photo:
          return res.status(500).send({ message: "Product image is required" });
        // case !photo && photo.size > 1000000:
        //   return res
        //     .status(500)
        //     .send({ message: "Photo is required and must be less than 1mb" });
      }

      // const product = new Item({ ...req.fields, slug: slugify(name) });
      const product = await new Item({
        name,
        description,
        price,
        quantity,
        category,
        slug: slugify(name),
        photo,
        shipping,
      }).save();

      // if (photo) {
      //   product.photo.data = fs.readFileSync(photo.path);
      //   product.photo.contentType = photo.type;
      // }

      // await product.save();

      res
        .status(201)
        .send({ success: true, message: "Product created", product });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in creating product",
        error,
      });
    }
  },

  deleteProductController: async function (req, res, next) {
    try {
      await Item.findByIdAndDelete(req.params.pid);

      res.status(200).send({
        success: true,
        message: "Product deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in deleting product",
        error,
      });
    }
  },

  updateProductController: async function (req, res, next) {
    try {
      const {
        name,
        slug,
        description,
        price,
        quantity,
        category,
        photo,
        shipping,
      } = req.body;
      // const { photo } = req.files;
      switch (true) {
        case !name:
          return res.status(500).send({ message: "Product name is required" });
        case !description:
          return res
            .status(500)
            .send({ message: "Product description is required" });
        case !price:
          return res.status(500).send({ message: "Product price is required" });
        case !category:
          return res
            .status(500)
            .send({ message: "Product category is required" });
        // case !shipping:
        //   return res.status(500).send({ message: "Shipping is required" });
        case !quantity:
          return res
            .status(500)
            .send({ message: "Product quantity is required" });
        case !photo:
          return res.status(500).send({ message: "Product image is required" });
        // case !photo:
        //   return res
        //     .status(500)
        //     .send({ message: "Photo is required and must be less than 1mb" });
      }

      const product = await Item.findByIdAndUpdate(
        req.params.pid,
        {
          ...req.body,
          slug: slugify(name),
        },
        { new: true }
      );

      // if (photo) {
      //   product.photo.data = fs.readFileSync(photo.path);
      //   product.photo.contentType = photo.type;
      // }

      await product.save();

      res
        .status(201)
        .send({ success: true, message: "Product updated", product });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in updating product",
        error,
      });
    }
  },

  productCategoryController: async function (req, res, next) {
    try {
      const category = await Category.findOne({ slug: req.params.slug });
      const products = await Item.find({ category }).populate("category");
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error getting products",
        error,
      });
    }
  },

  productFilterController: async function (req, res) {
    try {
      const { checked, radio } = req.body;
      let args = {};
      if (checked.length > 0) args.category = checked;
      if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
      const products = await Item.find(args);
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error in filtering product",
        error,
      });
    }
  },

  productCountController: async function (req, res) {
     try {
    const total = await Item.find({}).estimatedDocumentCount();
    res.status(200).send({ success: true, total });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in product count",
      error,
    });
  }
  },

  productListController: async function (req, res) {
    try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await Item
      .find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send( products);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error per page list",
      error,
    });
  }
  },

   singleProductController: async function (req, res, next) {
    try {
      const product = await Item.findOne({ slug: req.params.slug }).populate(
        "category"
      );
      res.status(200).send(product);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in getting single products",
        error,
      });
    }
  },

   relatedProductController: async function (req, res, next) {
     try {
    const { pid, cid } = req.params;
    const products = await Item
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .limit(3)
      .populate("category");
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error getting related products",
      error,
    });
  }
  },

   getUserFavoriteCards: async function (req, res, next) {
    try {
      const userFavorites = await User.findById(req.user._id).populate('favorites');
      if (!userFavorites) {
        return res.status(404).json({ message: "User not found" });
      }

      
      const favoriteCards = userFavorites.favorites

      return res.status(200).json( favoriteCards );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },

   setFavoriteController: async function (req, res, next) {
    const itemId = req.params.id;
   
    const userId = req.user._id;
    let status = false;
    try {
      const item = await Item.findById(itemId);
      const user = await User.findById(userId);
      console.log(user);
     
      if (!item) {
        return res.status(404).json({ message: "Product not found" });
      }

      const itemIndex = item.favorites.indexOf(userId);
      const userIndex = user.favorites.indexOf(itemId)

      if (itemIndex === -1) {
        item.favorites.push(userId);
        status = true;
      } else {
        item.favorites.splice(itemIndex, 1);
        status = false;
      }

      if (userIndex === -1) {
        user.favorites.push(itemId);
      } else {
        user.favorites.splice(userIndex, 1);
      }

      await item.save();
      await user.save();
      const { name } = item;

      return res.status(200).json({ name, status });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },

};
