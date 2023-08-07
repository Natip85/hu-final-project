const Item = require("./../models/Item");
const Category = require("./../models/Category");
const products = require("./initializeItems.json");
const categories = require("./initializeCategories.json");

const catIds = [];

const initializProject = async () => {

  const allCategories = await Category.find({});

  if (allCategories.length <= 0) {
    Category.create(categories);
    const inputCategories = await Category.find({});
    inputCategories.forEach((cat) => {
      catIds.push(cat._id);
    });
  }

  const allItems = await Item.find({});
  if (allItems.length <= 0) {
    products.forEach((item, index) => {
      item.category = catIds[index];
        Item.create(item);
    });
  }
};

initializProject();

//  {
//       "name": "Nike Air Force 1 High - Baby blue",
//       "slug": "nike-air-force-1-bay blue",
//       "description": "The high-top version of the Air Force 1 in a warm wheat color, perfect for the fall season.",
//       "price": 80,
//       "category": "123456789999",
//       "quantity": 15,
//       "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx5B1MSrc6mHgdu8YJRtdET939_q-b6p8aCw&usqp=CAU",
//       "shipping": true
//     },
//     {
//       "name": "Nike Air Force 1 High - green",
//       "slug": "nike-air-force-1-high-green",
//       "description": "The high-top version of the Air Force 1 in a warm wheat color, perfect for the fall season.",
//       "price": 190,
//       "category": "123456789999",
//       "quantity": 15,
//       "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx5B1MSrc6mHgdu8YJRtdET939_q-b6p8aCw&usqp=CAU",
//       "shipping": true
//     },
//     {
//       "name": "Nike Air Force 1 High - pink",
//       "slug": "nike-air-force-1-high-pink",
//       "description": "The high-top version of the Air Force 1 in a warm wheat color, perfect for the fall season.",
//       "price": 125,
//       "category": "123456789999",
//       "quantity": 15,
//       "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx5B1MSrc6mHgdu8YJRtdET939_q-b6p8aCw&usqp=CAU",
//       "shipping": true
//     },
//     {
//       "name": "Nike Air Force 1 High - yellow",
//       "slug": "nike-air-force-1-high-yellow",
//       "description": "The high-top version of the Air Force 1 in a warm wheat color, perfect for the fall season.",
//       "price": 155,
//       "category": "123456789999",
//       "quantity": 15,
//       "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx5B1MSrc6mHgdu8YJRtdET939_q-b6p8aCw&usqp=CAU",
//       "shipping": true
//     }
