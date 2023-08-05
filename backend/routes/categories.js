var express = require('express');
var router = express.Router();
const categories = require('../controllers/categories');
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/adminAuth')

router.post('/create-category', auth, isAdmin, categories.createCategoryController)
router.put('/update-category/:id', auth, isAdmin, categories.updateCategoryController)
router.get('/get-categories', categories.categoryController)
router.get('/single-category/:slug', categories.singleCategoryController)
router.delete('/delete-category/:id',  auth, isAdmin, categories.deleteCategoryController)

module.exports = router;
