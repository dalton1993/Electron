const Catagory = require('../models/catagory.js');
const slugify = require('slugify');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "ecom-secret";

function createCatagory(catagories, parentId = null){
    const catagoryList = [];
    let catagory; 
    if(parentId == null){
        catagory = catagories.filter(cat => cat.parentId == undefined)
    } else {
        catagory = catagories.filter(cat => cat.parentId == parentId)  
    }

    for(let cate of catagory){
        catagoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId, 
            children: createCatagory(catagories, cate._id)
        });
    }
    return catagoryList; 
}

exports.createCatagory = (req, res) => {
    console.log(req.body)
    const catagoryObject = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if(req.file){
        catagoryObject.catagoryImage = '/public/' + req.file.filename;  
    }

    if(req.body.parentId){
        catagoryObject.parentId = req.body.parentId; 
    }

    const cat = new Catagory(catagoryObject)
    cat.save((error, catagory) => {
        if(error) return res.status(400).json({ message: error }); 
        if(catagory){
            return res.status(200).json({ catagory }); 
        }
    }); 
}

exports.getCatagories = (req, res) => {
    Catagory.find({})
    .exec((error, catagories) => {
        if(error) return res.status(400).json({message:error});
        if(catagories) {
            const catagoryList = createCatagory(catagories)
            res.status(200).json({ catagoryList }); 
        }
    })
}

exports.userMiddleware = (req, res, next) => {
    if(req.user.role !== 'user'){
        return res.status(400).json({message:' user access denied'});
    }
    next(); 
}

exports.adminMiddleware = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(400).json({message:'admin access denied'});
    }
    next(); 
}

exports.requireSignIn = (req, res, next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]; 
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        } else {
            return res.status(400).json({message:'Authorization required'})
        }
        next();
    }