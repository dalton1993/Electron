const { response } = require('express');
const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('../../controller/admin/user.js');
const User = require('../../models/user.js');
const { validateSignUpRequest, isRequestValidated, validateSignInRequest } = require('../../validators/auth.js');
const { requireSignIn } = require('../../middleware/middleware.js')

router.post('/admin/signin', validateSignInRequest, isRequestValidated, signin); 

router.post('/admin/signup', validateSignUpRequest, isRequestValidated, signup);

router.post('/admin/signout', requireSignIn, signout); 

router.post('/profile', requireSignIn, (req, res) => {
    res.status(200).json({user:"profile"})
}); 

module.exports = router; 