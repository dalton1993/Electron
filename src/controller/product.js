const express = require('express');
const Product = require('../models/product.js');
const User = require('../models/user.js'); 
const router = express.Router();
const multer = require('multer'); 
const shortid = require('shortid');
const slugify = require('slugify');  

exports.createProduct = async (req, res) => {
    //res.status(200).json({file: req.files, body: req.body });
    

    const { name, price, description, offer, catagory, quantity } = req.body;
    
    /*let productPictures = []; 

    if(req.files.length > 0) {
        productPictures = req.files.map(file => {
            console.log(file);
            return { img: file.filename }
        });
    }*/

    const uploader = async (path) => await cloudinary.uploads(path, 'Images');

        const urls = []
    
        if (req.method === 'POST') {
            const files = req.files;
            for (const file of files) {
                const { path } = file;
                const newPath = await uploader(path)
                urls.push(newPath)
                fs.unlinkSync(path)
            }

                /*res.status(200).json({
                    message: 'images uploaded successfully',
                    data: urls
                })*/

            } 

            
            const product = new Product({
                name: name,
                slug: slugify(name),
                price: price,
                quantity: quantity, 
                description: description,
                offer: offer,
                productPictures: urls,
                catagory: catagory,
                createdBy: req.user,
            });

            console.log(product);
            product.save((error, product) => {
                if(error) return res.status(400).json({message:error});
                if(product){
                    console.log(product)
                    res.status(200).json({product, urls}); 
                } 
            }); 



    /*const product = new Product({

        name: name,
        slug: slugify(name),
        price: price,
        quantity: quantity, 
        description: description,
        offer: offer,
        productPictures: productPictures,
        catagory: catagory,
        createdBy: req.user,
    });
    console.log(product);
    product.save((error, product) => {
        if(error) return res.status(400).json({message:error});
        if(product){
            console.log(product)
            res.status(200).json({product}); 
        } 
    }); */
}

exports.getProducts = (req, res) => {
    Product.find({catagory: req.params.id})
    .then(products => {
        res.status(200).json(products)
    })
    .catch(err => {
        res.status(400).json({err})
    });
}

exports.getProduct = (req,res) => {
    Product.findOne({_id: req.params.id}).populate('catagory', 'name').populate('reviews.userId', 'userName firstName lastName')  
    .then(product => {
        return res.status(200).json({product:product})
    })
    .catch(error => {
        return res.status(400).json({message:'error'})
    })
}

/*exports.productReview = (req,res) => {
    Product.findOneAndUpdate({_id:req.params.id}, {
            $push: { reviews: { userId: req.params.id, reviewTitle: req.body.reviewTitle, review: req.body.review, rating: req.body.rating } }
            }, { 
                new:true 
            })
        .exec( result, error => {
            if(result){
                console.log(result); 
                res.status(200).json(result)
            }
            if(error){
                console.log(error);
                res.status(400).json(error)
            }  
        })
    }*/

    exports.productReview = (req, res) => {

        if(!req.body.user_id || !req.body.review || !req.body.reviewTitle){
            return res.status(400).json({message:'Please fill out all fields'})
        }

        Product.findOneAndUpdate({_id:req.params.id}, 
            { $push: {reviews: {$each: [{ userId: req.body.user_id, review:req.body.review, reviewTitle:req.body.reviewTitle, rating:req.body.rating }], $position:0}}
        
        },{ new:true })
        .populate('reviews.userId', 'firstName lastName userName')
        .then(result => 
           res.status(200).json(result) 
        )
        .catch( error => 
            res.status(400).json(error)
        )
    }

