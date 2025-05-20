const mongoose = require('mongoose');

// define the person schema
const MenueItemsSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true,
    },
    price:{
        type : Number,
        required: true,
    },
    taste:{
        type : String,
        enum:['sweet','sour','spice'],
        required: true,
    },
    is_drink:{
        type : Boolean,
        default: true,
    },  
    inggredients:{
        type : [String],
        default: [],
        
    }, 
     num_sales:{
        type : Number,
        default: 0,
        
    }, 
});

const MenueItem  = mongoose.model('MenueItem',MenueItemsSchema )
module.exports = MenueItem ;