const mongoose = require("mongoose");


const BlacklistSchema=mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    }
})

const BlacklistModel=mongoose.model("blacklisttoken",BlacklistSchema);

module.exports={
    BlacklistModel
}