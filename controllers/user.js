const {UserModel}=require("../model/user");
const{BlacklistModel}=require("../model/blacklist")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();


const Signup=async(req,res)=>{
    try {
        const{email,password,conform_Password}=req.body;
         const isUserExists= await UserModel.find({email});
        // if(isUserExists)return res.status(400).send({msg:"User is Already Exists Please Login"});
        const hash_Password=await bcrypt.hash(password,10);
        const Confirm_Password_hash=await bcrypt.hash(conform_Password,10);
        const user=new UserModel({email,password:hash_Password,conform_Password:Confirm_Password_hash});
        await user.save();
        res.status(200).send({msg:"Signup Successfull!"})
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
}


const Login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const isUserExists= await UserModel.findOne({email});
        if(!isUserExists)return res.status(400).send({msg:"User is not Exists Please Signup"});

        const result= await bcrypt.compare(password,isUserExists.password);
        if(result){
            const access_token=jwt.sign({userId:isUserExists._id},process.env.JWT_KEY,{expiresIn:"1h"});
            res.status(200).send({msg:"Login Successfull",token:access_token})
        }else{
            res.status(500).send({msg:error.message})
        }


        
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
}

const Logout=async(req,res)=>{
    try {
        const token=req.headers.authorization.split(" ")[1] ||req.headers.authorization;
        const blacklist= new BlacklistModel({"token":token})
        await blacklist.save();
        res.status(200).send({msg:"Logout Successfull"});
        
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
}


module.exports={
    Signup,Login,Logout
}