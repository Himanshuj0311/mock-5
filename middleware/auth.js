const jwt=require("jsonwebtoken");
const {BlacklistModel}=require("../model/blacklist");
const {UserModel}=require("../model/user");
require("dotenv").config();

const auth=async(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1] || req.headers.authorization;
        const isBlacklisted=await BlacklistModel.findOne({token});
        if(isBlacklisted)return res.status(500).send({msg:"Login Again"});
        const decoded=await jwt.verify(token,process.envJWT_KEY);
        if(!decoded)return res.status(500).send({msg:"Login Again"});
        
        const user=await UserModel.findOne({_id:decoded.userId});
        if(!user)return res.status(500).send({msg:"Someting Went Wrong !"});
        next()
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
}

module.exports={
    auth
}