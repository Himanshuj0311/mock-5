const express = require("express");
const {Signup,Login,Logout}=require("../controllers/user");
const {auth}=require("../middleware/auth")


const userRouter=express.Router();

//signup
userRouter.post("/signup",Signup);

//login
userRouter.post("/login",Login);

//logout
userRouter.post("/logout",auth,Logout);

module.exports={
    userRouter
}