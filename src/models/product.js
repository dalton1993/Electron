const mongoose = require('mongoose'); 

const ProductSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },

    slug: {
        type:String,
        required:true,
        unique: true
    },

    price: {
        type:Number,
        required:true,
    },
    quantity: {
        type:Number,
        required:true,
    },
    description: {
        type:String,
        required:true,
        trim:true,
        max:5000
    },
    offer: {
        type:Number
    },
    productPictures: [
        {img: {type:String} }
    ],
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            reviewTitle: {type:String},
            review: {type:String},
            rating: {type:Number}
        }
    ],
    catagory: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CatagorySchema',
        required: true 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true 
    },
    updatedAt:Date
},{timestamps: true }); 

module.exports = mongoose.model('Product', ProductSchema); 