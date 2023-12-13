const mongoose=require('mongoose');

const ordersSchema=mongoose.Schema({

    customer_name:{
        type:String,
        required:[true,"Enter Customer name"]
    },

    customer_email:{
        type:String,
        required:[true,"Enter age"]
    },
    
    address:{
        type:String,
        required:[true,"Enter Address"]

    },
    phonenumber:{
        type:String,
        required:[true,"Enter Phone Number"]

    },
    cake:{
    type:String,
    required:[true,"Enter Cake type"]
    },
    quantity:{
        type:String,
        required:[true,"Enter Cake type"]
    },
    user_id:{
        type:String,
        required:[true,"Enter Username"]
    },
    status:{
        type:String,
        default:"Order Recieved"
    }
},
{
         timestamps:true,
        versionKey:false
     
}


)


const Orders=mongoose.model('Orders',ordersSchema);

module.exports=Orders;