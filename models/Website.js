const mongoose = require("mongoose");

const WebsiteSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    backupUrl:{
        type:String,
        default:""
    },

    url:{
        type:String,
        required:true
    },

    expiredDate:{
        type:String,
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports =
mongoose.model("Website", WebsiteSchema);
