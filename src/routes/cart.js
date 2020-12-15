const express = require('express');
const slugify = require('slugify');
const Cart = require('../models/cart.js');
const { addCartItem, getCart, editCartQuant, deleteCartItem } = require('../controller/cart.js');
const { userMiddleware, adminMiddleware, requireSignIn } = require('../middleware/middleware.js');
const router = express.Router();

router.post('/user/cart/add-to-cart', requireSignIn, userMiddleware, addCartItem);

router.get('/user/cart/get-cart', requireSignIn, userMiddleware, getCart);

router.post('/user/cart/edit-cart', requireSignIn, userMiddleware,  editCartQuant);

router.post('/user/cart/delete-item', requireSignIn, userMiddleware, deleteCartItem);
   

module.exports = router;
