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
      console.log("Database populated with starting data.".bgGreen);
    } else {
      console.log("Starting data already exists in the database.".bgYellow);
    }
  } catch (error) {
    console.error("Error populating database:", error);
  }
};

initializProject();
  // {
  //     "name": "Air Jordan 1 Mid - Black/Red",
  //     "slug": "air-jordan-1-mid-black-red",
  //     "description": "A mid-top version of the Air Jordan 1 featuring a sleek black and red color combination.",
  //     "price": 120,
  //     "category": "Jordan",
  //     "quantity": 30,
  //     "photo": "https://images.unsplash.com/photo-1513188732907-5f732b831ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8am9yZGFuc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //     "shipping": false,
  //     "size": "7"
  //   },
  //   {
  //    "name": "Air Jordan 12 Retro",
  //   "slug": "air-jordan-12-retro",
  //   "description": "Elegant Air Jordan 12 Retro sneakers for a premium style.",
  //  "price": 269,
  //    "category": "Jordan",
  //    "quantity": 70,
  //    "photo": "https://images.unsplash.com/photo-1588584470505-2e1a329ce68e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fEpvcmRhbiUyMHNob2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  //    "shipping": true,
  //   "size": "9"
  //  },
//  {
//       "name": "Nike Air Force 1 Low - Classic White",
//       "slug": "nike-air-force-1-low-white",
//       "description": "The iconic Nike Air Force 1 Low in classic white colorway. A timeless sneaker that goes well with any outfit.",
//       "price": 100,
//       "category": "Nike",
//       "quantity": 50,
//       "photo": "https://images.unsplash.com/photo-1596480000676-abb41f2074b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fG5pa2UlMjBzaG9lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
//       "shipping": true,
//       "size": "6"
//     },
//     {
//       "name": "Nike Air Force 1 High - Wheat",
//       "slug": "nike-air-force-1-high-wheat",
//      "description": "The high-top version of the Air Force 1 in a warm wheat color, perfect for the fall season.",
//      "price": 110.00,
//       "category": "Nike",
//        "quantity": 15,
//     "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx5B1MSrc6mHgdu8YJRtdET939_q-b6p8aCw&usqp=CAU",
//        "shipping": true,
//       "size": "9"
//    },
// {
//     "name": "Nike Air Force 1 '07",
//     "slug": "air-force-1-07",
//     "description": "Classic Nike Air Force 1 '07 sneakers for a timeless look.",
//     "price": 89.99,
//     "category": "Nike",
//     "quantity": 50,
//     "photo": "air-force-1-07.jpg",
//     "shipping": true,
//     "size": "10"
//   },
//   {
//     "name": "Nike Air Force 1 Mid",
//     "slug": "air-force-1-mid",
//     "description": "Mid-top Nike Air Force 1 sneakers for a versatile style.",
//     "price": 99.99,
//     "category": "Nike",
//     "quantity": 30,
//     "photo": "air-force-1-mid.jpg",
//     "shipping": false,
//     "size": "9"
//   },
//   {
//     "name": "Nike Air Force 1 '07 (Women's)",
//     "slug": "air-force-1-07-womens",
//     "description": "Classic Nike Air Force 1 '07 sneakers for women.",
//     "price": 89.99,
//     "category": "Nike",
//     "quantity": 100,
//     "photo": "air-force-1-07-womens.jpg",
//     "shipping": true,
//     "size": "8"
//   },
//   {
//     "name": "Nike Air Force 1 Low",
//     "slug": "air-force-1-low",
//     "description": "Low-top Nike Air Force 1 sneakers for everyday wear.",
//     "price": 79.99,
//     "category": "Nike",
//     "quantity": 20,
//     "photo": "air-force-1-low.jpg",
//     "shipping": true,
//     "size": "11"
//   },
//   {
//     "name": "Nike Air Force 1 High",
//     "slug": "air-force-1-high",
//     "description": "High-top Nike Air Force 1 sneakers for a classic look.",
//     "price": 99.99,
//     "category": "Nike",
//     "quantity": 60,
//     "photo": "air-force-1-high.jpg",
//     "shipping": false,
//     "size": "7"
//   },
//   {
//     "name": "Nike Air Force 1 LV8",
//     "slug": "air-force-1-lv8",
//     "description": "Stylish Nike Air Force 1 LV8 sneakers with unique detailing.",
//     "price": 109.99,
//     "category": "Nike",
//     "quantity": 40,
//     "photo": "air-force-1-lv8.jpg",
//     "shipping": true,
//     "size": "10"
//   },
//   {
//     "name": "Nike Air Force 1 Sage Low",
//     "slug": "air-force-1-sage-low",
//     "description": "Women's Nike Air Force 1 Sage Low sneakers for a modern look.",
//     "price": 94.99,
//     "category": "Nike",
//     "quantity": 70,
//     "photo": "air-force-1-sage-low.jpg",
//     "shipping": true,
//     "size": "9"
//   },
//   {
//     "name": "Nike Air Force 1 React",
//     "slug": "air-force-1-react",
//     "description": "Nike Air Force 1 React sneakers with responsive cushioning.",
//     "price": 119.99,
//     "category": "Nike",
//     "quantity": 90,
//     "photo": "air-force-1-react.jpg",
//     "shipping": false,
//     "size": "11"
//   },
//   {
//     "name": "Nike Air Force 1 Gore-Tex",
//     "slug": "air-force-1-gore-tex",
//     "description": "Nike Air Force 1 Gore-Tex sneakers for all-weather wear.",
//     "price": 129.99,
//     "category": "Nike",
//     "quantity": 25,
//     "photo": "air-force-1-gore-tex.jpg",
//     "shipping": true,
//     "size": "7"
//   },
//   {
//     "name": "Nike Air Force 1 Shadow",
//     "slug": "air-force-1-shadow",
//     "description": "Nike Air Force 1 Shadow sneakers for a bold and playful style.",
//     "price": 109.99,
//     "category": "Nike",
//     "quantity": 55,
//     "photo": "air-force-1-shadow.jpg",
//     "shipping": false,
//     "size": "12"
//   },
  // {
  //     "name": "Nike Air Force 1 High - Wheat",
  //     "slug": "nike-air-force-1-high-wheat",
  //     "description": "The high-top version of the Air Force 1 in a warm wheat color, perfect for the fall season.",
  //     "price": 110.00,
  //     "category": "Addidas",
  //     "quantity": 15,
  //     "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx5B1MSrc6mHgdu8YJRtdET939_q-b6p8aCw&usqp=CAU",
  //     "shipping": true,
  //     "size": "9"
  //   },
  // {
  //   "name": "Adidas Stan Smith Sneakers",
  //   "slug": "stan-smith-sneakers",
  //   "description": "Iconic Adidas Stan Smith sneakers for everyday wear.",
  //   "price": 79.99,
  //   "category": "Addidas",
  //   "quantity": 100,
  //   "photo": "stan-smith-sneakers.jpg",
  //   "shipping": true,
  //   "size": "11"
  // },
  // {
  //   "name": "Adidas Ultraboost 21 Running Shoes (Women's)",
  //   "slug": "ultraboost-21-running-shoes-womens",
  //   "description": "High-performance Adidas Ultraboost 21 running shoes for women athletes.",
  //   "price": 179.99,
  //   "category": "Addidas",
  //   "quantity": 20,
  //   "photo": "ultraboost-21-running-shoes-womens.jpg",
  //   "shipping": true,
  //   "size": "8"
  // },
  // {
  //   "name": "Adidas NMD R1 Sneakers",
  //   "slug": "nmd-r1-sneakers",
  //   "description": "Modern Adidas NMD R1 sneakers for a trendy streetwear look.",
  //   "price": 129.99,
  //   "category": "Addidas",
  //   "quantity": 60,
  //   "photo": "nmd-r1-sneakers.jpg",
  //   "shipping": false,
  //   "size": "7"
  // },
  // {
  //   "name": "Adidas Terrex Hiking Boots",
  //   "slug": "terrex-hiking-boots",
  //   "description": "Durable Adidas Terrex hiking boots for outdoor adventures.",
  //   "price": 149.99,
  //   "category": "Addidas",
  //   "quantity": 40,
  //   "photo": "terrex-hiking-boots.jpg",
  //   "shipping": true,
  //   "size": "10"
  // },
  // {
  //   "name": "Adidas Adilette Slides",
  //   "slug": "adilette-slides",
  //   "description": "Comfortable Adidas Adilette slides for casual wear.",
  //   "price": 29.99,
  //   "category": "Addidas",
  //   "quantity": 70,
  //   "photo": "adilette-slides.jpg",
  //   "shipping": true,
  //   "size": "9"
  // },
  // {
  //   "name": "Adidas X9000L4 Running Shoes",
  //   "slug": "x9000l4-running-shoes",
  //   "description": "Adidas X9000L4 running shoes with responsive cushioning.",
  //   "price": 119.99,
  //   "category": "Addidas",
  //   "quantity": 90,
  //   "photo": "x9000l4-running-shoes.jpg",
  //   "shipping": false,
  //   "size": "11"
  // },
  // {
  //   "name": "Adidas Sleek Sneakers",
  //   "slug": "sleek-sneakers",
  //   "description": "Stylish Adidas Sleek sneakers for women.",
  //   "price": 69.99,
  //   "category": "Addidas",
  //   "quantity": 25,
  //   "photo": "sleek-sneakers.jpg",
  //   "shipping": true,
  //   "size": "7"
  // },
  // {
  //   "name": "Adidas Cloudfoam Running Shoes",
  //   "slug": "cloudfoam-running-shoes",
  //   "description": "Comfortable Adidas Cloudfoam running shoes for everyday use.",
  //   "price": 59.99,
  //   "category": "Addidas",
  //   "quantity": 55,
  //   "photo": "cloudfoam-running-shoes.jpg",
  //   "shipping": false,
  //   "size": "12"
  // },
// {
//     "name": "Air Jordan 1 Retro High OG",
//     "slug": "air-jordan-1-retro-high-og",
//     "description": "Classic Air Jordan 1 Retro High OG sneakers for sneakerheads.",
//     "price": 199.99,
//     "category": "Jordan",
//     "quantity": 50,
//     "photo": "air-jordan-1-retro-high-og.jpg",
//     "shipping": true,
//     "size": "10"
//   },
//   {
//     "name": "Air Jordan 4 Retro",
//     "slug": "air-jordan-4-retro",
//     "description": "Iconic Air Jordan 4 Retro sneakers for basketball enthusiasts.",
//     "price": 229.99,
//     "category": "Jordan",
//     "quantity": 30,
//     "photo": "air-jordan-4-retro.jpg",
//     "shipping": false,
//     "size": "9"
//   },
//   {
//     "name": "Air Jordan 11 Retro",
//     "slug": "air-jordan-11-retro",
//     "description": "Legendary Air Jordan 11 Retro sneakers for a premium look.",
//     "price": 249.99,
//     "category": "Jordan",
//     "quantity": 100,
//     "photo": "air-jordan-11-retro.jpg",
//     "shipping": true,
//     "size": "11"
//   },
//   {
//     "name": "Air Jordan 1 Retro High OG (Women's)",
//     "slug": "air-jordan-1-retro-high-og-womens",
//     "description": "Classic Air Jordan 1 Retro High OG sneakers for women.",
//     "price": 199.99,
//     "category": "Jordan",
//     "quantity": 20,
//     "photo": "air-jordan-1-retro-high-og-womens.jpg",
//     "shipping": true,
//     "size": "8"
//   },
//   {
//     "name": "Air Jordan 3 Retro",
//     "slug": "air-jordan-3-retro",
//     "description": "Timeless Air Jordan 3 Retro sneakers for sneaker enthusiasts.",
//     "price": 219.99,
//     "category": "Jordan",
//     "quantity": 60,
//     "photo": "air-jordan-3-retro.jpg",
//     "shipping": false,
//     "size": "7"
//   },
//   {
//     "name": "Air Jordan 6 Retro",
//     "slug": "air-jordan-6-retro",
//     "description": "Classic Air Jordan 6 Retro sneakers for a sporty look.",
//     "price": 239.99,
//     "category": "Jordan",
//     "quantity": 40,
//     "photo": "air-jordan-6-retro.jpg",
//     "shipping": true,
//     "size": "10"
//   },
//   {
//     "name": "Air Jordan 12 Retro",
//     "slug": "air-jordan-12-retro",
//     "description": "Elegant Air Jordan 12 Retro sneakers for a premium style.",
//     "price": 269.99,
//     "category": "Jordan",
//     "quantity": 70,
//     "photo": "air-jordan-12-retro.jpg",
//     "shipping": true,
//     "size": "9"
//   },
//   {
//     "name": "Air Jordan 5 Retro",
//     "slug": "air-jordan-5-retro",
//     "description": "Classic Air Jordan 5 Retro sneakers with a bold design.",
//     "price": 209.99,
//     "category": "Jordan",
//     "quantity": 90,
//     "photo": "air-jordan-5-retro.jpg",
//     "shipping": false,
//     "size": "11"
//   },
//   {
//     "name": "Air Jordan 1 Low",
//     "slug": "air-jordan-1-low",
//     "description": "Stylish Air Jordan 1 Low sneakers for everyday wear.",
//     "price": 189.99,
//     "category": "Jordan",
//     "quantity": 25,
//     "photo": "air-jordan-1-low.jpg",
//     "shipping": true,
//     "size": "7"
//   },
//   {
//     "name": "Air Jordan 13 Retro",
//     "slug": "air-jordan-13-retro",
//     "description": "Sleek Air Jordan 13 Retro sneakers for a sporty look.",
//     "price": 249.99,
//     "category": "Jordan",
//     "quantity": 55,
//     "photo": "air-jordan-13-retro.jpg",
//     "shipping": false,
//     "size": "12"
//   },
//  {
//     "name": "Reebok Classic Nylon Sneakers",
//     "slug": "classic-nylon-sneakers",
//     "description": "Comfortable Reebok Classic Nylon sneakers for everyday wear.",
//     "price": 69.99,
//     "category": "Reebok",
//     "quantity": 100,
//     "photo": "classic-nylon-sneakers.jpg",
//     "shipping": true,
//     "size": "11"
//   },
//   {
//     "name": "Reebok Freestyle Hi Top Sneakers",
//     "slug": "freestyle-hi-top-sneakers",
//     "description": "Classic Reebok Freestyle Hi Top sneakers with a retro look.",
//     "price": 74.99,
//     "category": "Reebok",
//     "quantity": 20,
//     "photo": "freestyle-hi-top-sneakers.jpg",
//     "shipping": true,
//     "size": "8"
//   },
//   {
//     "name": "Reebok Floatride Running Shoes",
//     "slug": "floatride-running-shoes",
//     "description": "High-performance Reebok Floatride running shoes for athletes.",
//     "price": 109.99,
//     "category": "Reebok",
//     "quantity": 60,
//     "photo": "floatride-running-shoes.jpg",
//     "shipping": false,
//     "size": "7"
//   },
//   {
//     "name": "Reebok Club C 85 Sneakers",
//     "slug": "club-c-85-sneakers",
//     "description": "Stylish Reebok Club C 85 sneakers for a retro streetwear look.",
//     "price": 84.99,
//     "category": "Reebok",
//     "quantity": 40,
//     "photo": "club-c-85-sneakers.jpg",
//     "shipping": true,
//     "size": "10"
//   },
//   {
//     "name": "Reebok CrossFit Nano 9 Training Shoes",
//     "slug": "crossfit-nano-9-training-shoes",
//     "description": "Crossfit-specific Reebok CrossFit Nano 9 training shoes for intense workouts.",
//     "price": 119.99,
//     "category": "Reebok",
//     "quantity": 70,
//     "photo": "crossfit-nano-9-training-shoes.jpg",
//     "shipping": true,
//     "size": "9"
//   },
//   {
//     "name": "Reebok Zig Kinetica Running Shoes",
//     "slug": "zig-kinetica-running-shoes",
//     "description": "Innovative Reebok Zig Kinetica running shoes for dynamic cushioning.",
//     "price": 94.99,
//     "category": "Reebok",
//     "quantity": 90,
//     "photo": "zig-kinetica-running-shoes.jpg",
//     "shipping": false,
//     "size": "11"
//   },
//   {
//     "name": "Reebok Classic Leather Sneakers (Women's)",
//     "slug": "classic-leather-sneakers-womens",
//     "description": "Timeless Reebok Classic Leather sneakers for women.",
//     "price": 79.99,
//     "category": "Reebok",
//     "quantity": 25,
//     "photo": "classic-leather-sneakers-womens.jpg",
//     "shipping": true,
//     "size": "7"
//   },
//   {
//     "name": "Reebok Sole Fury Running Shoes",
//     "slug": "sole-fury-running-shoes",
//     "description": "Sleek and lightweight Reebok Sole Fury running shoes.",
//     "price": 89.99,
//     "category": "Reebok",
//     "quantity": 55,
//     "photo": "sole-fury-running-shoes.jpg",
//     "shipping": false,
//     "size": "12"
//   },
//  {
//     "name": "Puma Ignite Running Shoes",
//     "slug": "ignite-running-shoes",
//     "description": "High-performance Puma Ignite running shoes for athletes.",
//     "price": 89.99,
//     "category": "Puma",
//     "quantity": 30,
//     "photo": "ignite-running-shoes.jpg",
//     "shipping": false,
//     "size": "9"
//   },
//   {
//     "name": "Puma Cali Sneakers",
//     "slug": "cali-sneakers",
//     "description": "Classic Puma Cali sneakers for a trendy streetwear look.",
//     "price": 79.99,
//     "category": "Puma",
//     "quantity": 100,
//     "photo": "cali-sneakers.jpg",
//     "shipping": true,
//     "size": "11"
//   },
//   {
//     "name": "Puma Muse X-2 Sneakers",
//     "slug": "muse-x-2-sneakers",
//     "description": "Fashion-forward Puma Muse X-2 sneakers for women.",
//     "price": 74.99,
//     "category": "Puma",
//     "quantity": 20,
//     "photo": "muse-x-2-sneakers.jpg",
//     "shipping": true,
//     "size": "8"
//   },
//   {
//     "name": "Puma Hybrid Rocket Running Shoes",
//     "slug": "hybrid-rocket-running-shoes",
//     "description": "Innovative Puma Hybrid Rocket running shoes for dynamic cushioning.",
//     "price": 109.99,
//     "category": "Puma",
//     "quantity": 60,
//     "photo": "hybrid-rocket-running-shoes.jpg",
//     "shipping": false,
//     "size": "7"
//   },
//   {
//     "name": "Puma Suede Classic Sneakers",
//     "slug": "suede-classic-sneakers",
//     "description": "Timeless Puma Suede Classic sneakers for everyday wear.",
//     "price": 64.99,
//     "category": "Puma",
//     "quantity": 40,
//     "photo": "suede-classic-sneakers.jpg",
//     "shipping": true,
//     "size": "10"
//   },
//   {
//     "name": "Puma Cell Venom Sneakers",
//     "slug": "cell-venom-sneakers",
//     "description": "Retro-inspired Puma Cell Venom sneakers for a sporty look.",
//     "price": 79.99,
//     "category": "Puma",
//     "quantity": 70,
//     "photo": "cell-venom-sneakers.jpg",
//     "shipping": true,
//     "size": "9"
//   },
//   {
//     "name": "Puma NRGY Neko Running Shoes",
//     "slug": "nrgy-neko-running-shoes",
//     "description": "Comfortable Puma NRGY Neko running shoes for daily workouts.",
//     "price": 59.99,
//     "category": "Puma",
//     "quantity": 90,
//     "photo": "nrgy-neko-running-shoes.jpg",
//     "shipping": false,
//     "size": "11"
//   },
//   {
//     "name": "Puma RS-X3 Puzzle Sneakers",
//     "slug": "rs-x3-puzzle-sneakers",
//     "description": "Unique Puma RS-X3 Puzzle sneakers for a bold statement.",
//     "price": 84.99,
//     "category": "Puma",
//     "quantity": 25,
//     "photo": "rs-x3-puzzle-sneakers.jpg",
//     "shipping": true,
//     "size": "7"
//   },
//   {
//     "name": "Puma RS-Fast Sneakers",
//     "slug": "rs-fast-sneakers",
//     "description": "Sleek and fast Puma RS-Fast sneakers for a sporty look.",
//     "price": 89.99,
//     "category": "Puma",
//     "quantity": 55,
//     "photo": "rs-fast-sneakers.jpg",
//     "shipping": false,
//     "size": "12"
//   },
//  {
//       "name": "Converse Chuck Taylor Star Low",
//       "slug": "converse-chuck-taylor-low",
//       "description": "The converse shoe, perfect for all seasons.",
//       "price": 55,
//       "category": "Converse",
//       "quantity": 15,
//       "photo": "data:image/jpeg;base64,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",
//       "shipping": true,
//       "size": "8"
//     },
//     {
//     "name": "Converse Chuck Taylor All Star Low Top",
//     "slug": "chuck-taylor-all-star-low-top",
//     "description": "Classic Converse Chuck Taylor All Star Low Top sneakers for a timeless look.",
//     "price": 54,
//     "category": "Converse",
//     "quantity": 50,
//     "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YXkp02LvjCl1uVvNpa3xHhKM3GMfJP9BpA&usqp=CAU",
//     "shipping": true,
//     "size": "10"
//   },
//   {
//     "name": "Converse Chuck 70 High Top",
//     "slug": "chuck-70-high-top",
//     "description": "High-top Converse Chuck 70 sneakers for a retro style.",
//     "price": 69,
//     "category": "Converse",
//     "quantity": 30,
//     "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGcJ0T3s7AiZeQYTLJWbUdly9SEAZgyZ2wuQ&usqp=CAU",
//     "shipping": false,
//     "size": "9"
//   },
//   {
//     "name": "Converse Chuck Taylor All Star Low Top (Women's)",
//     "slug": "chuck-taylor-all-star-low-top-womens",
//     "description": "Classic Converse Chuck Taylor All Star Low Top sneakers for women.",
//     "price": 54,
//     "category": "Converse",
//     "quantity": 100,
//     "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqtddelksk1hKgIdK4Jz2NkexhMDIYtDXWww&usqp=CAU",
//     "shipping": true,
//     "size": "8"
//   },
//   {
//     "name": "Converse Chuck Taylor All Star High Top",
//     "slug": "chuck-taylor-all-star-high-top",
//     "description": "High-top Converse Chuck Taylor All Star sneakers for a classic look.",
//     "price": 59,
//     "category": "Converse",
//     "quantity": 20,
//     "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq8RT2qNEaZyvujqKWXhBI_fv4dRLw2-EfBw&usqp=CAU",
//     "shipping": true,
//     "size": "11"
//   },
//   {
//     "name": "Converse Chuck Taylor All Star Lift High Top",
//     "slug": "chuck-taylor-all-star-lift-high-top",
//     "description": "Platform Converse Chuck Taylor All Star Lift High Top sneakers for added style.",
//     "price": 64,
//     "category": "Converse",
//     "quantity": 60,
//     "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqDYhgYvCIfOnMFqTVYu8WZ47MV5Rb1mUXfQ&usqp=CAU",
//     "shipping": false,
//     "size": "7"
//   },
//   {
//     "name": "Converse Chuck Taylor All Star Dainty Low Top",
//     "slug": "chuck-taylor-all-star-dainty-low-top",
//     "description": "Slim and dainty Converse Chuck Taylor All Star Low Top sneakers for women.",
//     "price": 49,
//     "category": "Converse",
//     "quantity": 40,
//     "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTonpElQjjSKsS0A0byGc531N4gDzwrSp_Knw&usqp=CAU",
//     "shipping": true,
//     "size": "10"
//   },
//   {
//     "name": "Converse Chuck Taylor All Star Core Ox",
//     "slug": "chuck-taylor-all-star-core-ox",
//     "description": "Classic Converse Chuck Taylor All Star Core Ox sneakers for everyday wear.",
//     "price": 54,
//     "category": "Converse",
//     "quantity": 70,
//     "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa1M3C827WwV44dFF1VeJM-LYIA_MlDvDfnQkdS1DB9am17OgUWM1dxyoqjP6awP2UsAE&usqp=CAU",
//     "shipping": true,
//     "size": "9"
//   },
//   {
//     "name": "Converse Chuck Taylor All Star Leather High Top",
//     "slug": "chuck-taylor-all-star-leather-high-top",
//     "description": "Leather Converse Chuck Taylor All Star High Top sneakers for a premium look.",
//     "price": 79,
//     "category": "Converse",
//     "quantity": 90,
//     "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1PU5TCI6fUzY0omeI7pMnyuOyThv8huh9K_SRvxwE6kj43Br948vby-PDm79-p0PYRzk&usqp=CAU",
//     "shipping": false,
//     "size": "11"
//   },
//   {
//     "name": "Converse Chuck 70 Low Top",
//     "slug": "chuck-70-low-top",
//     "description": "Low-top Converse Chuck 70 sneakers for a retro and versatile style.",
//     "price": 64,
//     "category": "Converse",
//     "quantity": 25,
//     "photo": "data:image/jpeg;base64,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",
//     "shipping": true,
//     "size": "7"
//   },
//   {
//     "name": "Converse Chuck Taylor All Star High Street",
//     "slug": "chuck-taylor-all-star-high-street",
//     "description": "Modern Converse Chuck Taylor All Star High Street sneakers for urban style.",
//     "price": 59,
//     "category": "Converse",
//     "quantity": 55,
//     "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPL9O3obk56w3Tan7YAKdDrkJfZPGrfA3JqQ&usqp=CAU",
//     "shipping": false,
//     "size": "12"
//   },
//  {
//     "name": "Puma Future Rider Sneakers",
//     "slug": "future-rider-sneakers",
//     "description": "Stylish Puma Future Rider sneakers for a retro look.",
//     "price": 69.99,
//     "category": "Puma",
//     "quantity": 50,
//     "photo": "future-rider-sneakers.jpg",
//     "shipping": true,
//     "size": "10"
//   },