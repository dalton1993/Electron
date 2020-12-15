const express = require('express');
const Catagory = require('../models/catagory.js');
const router = express.Router();
const { filter } = require('../controller/filter');

router.post('/filter-params/:id', filter);

module.exports = router; 
