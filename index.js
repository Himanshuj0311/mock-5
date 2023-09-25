const express = require("express");
const {connection}=require("./config/db");
const cors=require("cors");
const {employeeRouter}=require("./routes/employee")
const {userRouter}=require("./routes/user")
require("dotenv").config();
const app=express();
const port = process.env.PORT || 8080

app.use(cors());
app.use(express.json());



app.get("/",(req,res)=>{
    res.status(200).send("Welcome to employee Managment app")
})

app.use("/user",userRouter);
app.use("/employee",employeeRouter)


app.listen(port,async()=>{
    try {
       await connection; 
       console.log("Server is runing at "+port)
    } catch (error) {
        console.log("Connection Fail");
        console.log(error.message)
    }
})