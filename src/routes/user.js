const express = require('express');
const router = express.Router();
const { signup, signin, requireSignIn } = require('../controller/user.js');
const User = require('../models/user.js');
const { validateSignUpRequest, isRequestValidated, validateSignInRequest } = require('../validators/auth.js');

router.post('/user/signin', signin); 

router.post('/user/signup', signup); 

router.post('/profile', requireSignIn, (req, res) => {
    res.status(200).json({user:"profile"});
}); 

module.exports = router; 