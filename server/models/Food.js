const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    foodname:{type:String,
    required:true,
    },
    daysSinceIAte:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        required:true,
    }
    
});

const Food = mongoose.model("fooddatas", FoodSchema)

module.exports = Food