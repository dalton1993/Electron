const express = require('express');
const slugify = require('slugify');
//const { getCatagories } = require('../controller/catagory.js')
const { createProduct, getProducts, getProduct, productReview } = require('../controller/product.js');
const { userMiddleware, adminMiddleware, requireSignIn } = require('../middleware/middleware.js');
const Product = require('../models/product.js');
const multer = require('multer');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname )
    }
  });

const upload = multer({ storage });

router.post('/product/create', requireSignIn, upload.array('productPicture'), createProduct);
router.get('/categories/:id', getProducts);
router.get('/getproduct/:id', getProduct); 
router.post('/product-review/:id', productReview); 
//router.get('/catagory/getcatagory', getCatagories);
   

module.exports = router;