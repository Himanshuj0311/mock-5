const mongoose = require("mongoose");


const UserSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
password:{
    type:String,
        required:true,
       
},
conform_Password:{
    type:String,
        
       
}
})

const UserModel=mongoose.model("user",UserSchema);

module.exports={
    UserModel
}