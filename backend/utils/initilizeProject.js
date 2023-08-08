const Item = require("./../models/Item");
const Category = require("./../models/Category");
const products = require("./initializeItems.json");
const categories = require("./initializeCategories.json");

const initializProject = async () => {
  const existingCategories = await Category.countDocuments();
  try {
    if (existingCategories === 0) {
      const newCategories = await Category.insertMany(categories);

      const allProducts = products.map((prod) => ({
        ...prod,
        category: newCategories.find(
          (oneCat) => oneCat.name === prod.category
        )._id,
      }));

      await Item.insertMany(allProducts);
      console.log("Database populated with starting data.");
    } else {
      console.log("Starting data already exists in the database.");
    }
  } catch (error) {
    console.error("Error populating database:", error);
  }
};

initializProject();
