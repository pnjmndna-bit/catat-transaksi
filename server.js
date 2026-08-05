require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const Website = require("./models/Website");

const app = express();

app.use(cors());
app.use(express.json());

// Folder frontend
app.use(express.static(path.join(__dirname, "public")));

// ================================
// CONNECT MONGODB
// ================================

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

    console.log("✅ MongoDB Connected");

})
.catch(err=>{

    console.log(err);

});

// ================================
// GET SEMUA WEBSITE
// ================================

app.get("/website", async(req,res)=>{

    try{

        const data = await Website.find().sort({

            expiredDate:1

        });

        res.json(data);

    }catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

});

// ================================
// TAMBAH WEBSITE
// ================================

app.post("/website", async(req,res)=>{

    try{

        const website = await Website.create({

            name:req.body.name,

            backupUrl:req.body.backupUrl,

            url:req.body.url,

            expiredDate:req.body.expiredDate

        });

        res.json({

            success:true,

            website

        });

    }catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

});

// ================================
// EDIT WEBSITE
// ================================

app.put("/website/:id", async(req,res)=>{

    try{

        const website = await Website.findByIdAndUpdate(

            req.params.id,

            {

                name:req.body.name,

                backupUrl:req.body.backupUrl,

                url:req.body.url,

                expiredDate:req.body.expiredDate

            },

            {

                new:true

            }

        );

        res.json({

            success:true,

            website

        });

    }catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

});

// ================================
// HAPUS WEBSITE
// ================================

app.delete("/website/:id", async(req,res)=>{

    try{

        await Website.findByIdAndDelete(

            req.params.id

        );

        res.json({

            success:true

        });

    }catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

});

// ================================
// INDEX
// ================================

app.use((req,res)=>{

    res.sendFile(
        path.join(__dirname,"public","index.html")
    );

});

// ================================
// START SERVER
// ================================

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{

    console.log(

        `🚀 Server berjalan di port ${PORT}`

    );

});
