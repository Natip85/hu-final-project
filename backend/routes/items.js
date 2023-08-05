var express = require('express');
var router = express.Router();
const items = require('../controllers/items');
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/adminAuth')
// const  formidable =require('express-formidable')

router.post('/create-product', auth, isAdmin, items.createProductController)
router.put('/update-product/:pid', auth, isAdmin, items.updateProductController)
router.get('/get-product',  items.getProductController)
router.get('/single-product/:slug',  items.singleProductController)
// router.get('/product-photo/:pid',  productPhotoController)
router.delete('/delete-product/:pid', auth, isAdmin,  items.deleteProductController)
router.post('/product-filter',  items.productFilterController)
router.get('/product-count',  items.productCountController)
router.get('/product-list/:page',  items.productListController)
// router.get('/search/:keyword',  searchController)
router.get('/related-product/:pid/:cid',  items.relatedProductController)
router.get('/product-category/:slug',  items.productCategoryController)
// router.get("/braintree/token", braintreeTokenController);
// router.post("/braintree/payments", requireSignIn, braintreePaymentsController);
router.get('/favorites', auth, items.getUserFavoriteCards);

router.put('/set-favorites/:id',auth, items.setFavoriteController);


// router.get('/', items.getAll);
// router.post('/', auth, items.add);

module.exports = router;
