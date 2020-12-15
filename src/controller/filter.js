const express = require('express');
const Catagory = require('../models/catagory.js');
const Product = require('../models/product.js');
const router = express.Router();

exports.filter = (req, res) => {
    const { itemMin, itemMax } = req.body; 
    Product.find({catagory: req.params.id})
        .then(products => {
            //console.log(products); 
                let newProductArr = [];
                    for(let product of products){
                        if(product.price >= itemMin && product.price <= itemMax){
                            newProductArr.push(product)
                        }
                    }  
                    return res.status(200).json(newProductArr);
                })
                .catch(err => {
                    return res.status(400).json({message:err}); 
                })
            }