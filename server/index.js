import express from "express";
import mongoose from "mongoose";

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://thanhtkcb2004:ksiuOWOBVmMF6sP5@cluster0.uuuqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(async()=>{
    console.log("Successfully connected to the database");
    app.listen(4000,()=>{
        console.log("Listening on port 4000")
    })
})
.catch((err)=>{
    console.log(err.message);
})
