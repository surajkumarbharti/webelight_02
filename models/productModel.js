const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    category:{
        type:String,
        require:true,
        unique:false
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
   
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema) 