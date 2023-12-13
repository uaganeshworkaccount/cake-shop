const mongoose=require('mongoose');

const cakesSchema=mongoose.Schema({

    name:{
        type:String,
        required:[true,"Enter Cake name"]
    },

    flavor:{
        type:String,
        required:[true,"Enter flavor"]
    },
    
    layers:{
        type:String,
        required:[true,"Enter Layers"]

    },
    topping:{
    type:String,
    required:[true,"Enter Topping"]
    },
    weight_kg:{
        type:String,
        required:[true,"Enter Weight"]
    },

     price:{
        type:String,
        required:[true,"Enter Price"]
        
    },
    image_url:{
        type:String,
        required:[true,"Enter Image URL"]
    },
    quantity:{
        type:String,
        required:[true,"Enter Quantity"]
    }
},
{
         timestamps:true,
        versionKey:false
     
}


)


const Cakes=mongoose.model('Cakes',cakesSchema);

module.exports=Cakes;

