const mongoose = require('mongoose');

const CatagorySchema = new mongoose.Schema({
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

    catagoryImage: {
        type:String,
    },

    parentId: {
        type:String,

    }
},{timestamps: true }); 

module.exports = mongoose.model('CatagorySchema', CatagorySchema)
