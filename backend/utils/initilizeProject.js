const Item = require("./../models/Item");
const products = require("./initialData.json");

const initializProject = async () => {
  const allItems = await Item.find({});
  if (allItems.length <= 0) {
    Card.create(products);
  }
};

initializProject();