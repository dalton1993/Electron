const express = require('express');
const slugify = require('slugify');
const Catagory = require('../models/catagory.js');
const { createCatagory, getCatagories, requireSignIn, adminMiddleware } = require('../controller/catagory.js');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname )
    }
  });

  const upload = multer({ storage });

router.post('/catagory/create', requireSignIn, adminMiddleware, upload.single('catagoryImage'), createCatagory);
router.get('/catagory/getcatagory', getCatagories);   

module.exports = router;