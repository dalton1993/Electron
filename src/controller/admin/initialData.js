const express = require('express');
const Catagory = require('../../models/catagory.js');
const Product = require('../../models/product.js');


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

exports.initialData = async (req, res) => {

    const catagories = await Catagory.find({}).exec();
    const products = await Product.find({}).select('_id name price slug quantity description catagory productPictures').populate({path:'catagory', select: '_id name'}).exec();

    res.status(200).json({
        catagories: createCatagory(catagories),
        products
    });
}