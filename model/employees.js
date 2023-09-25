const mongoose = require("mongoose");


const EmployeeSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
       
    },
lastName:{
    type:String,
        required:true,
       
},
email:{
    type:String,
        required:true,
       unique:true
},
deparment:{
    type:String,
        required:true,
       
},
salary:{
    type:Number,
        required:true,
       
},
})

const EmployeeModel=mongoose.model("employee",EmployeeSchema);

module.exports={
    EmployeeModel
}