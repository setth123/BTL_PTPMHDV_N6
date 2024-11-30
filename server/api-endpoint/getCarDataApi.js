import express from "express"
import {getCars, getCarType } from "../services/getCarData.js";
const carDtRouter=express.Router();

carDtRouter.get("/cars",async(req,res)=>{
    try{
        const data=await getCarType();
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

carDtRouter.get("/:carId/:field",async(req,res)=>{
    const {carID,field}=req.body;
    try{
        let data;
        if(carID=='*'){
            data=await getCars(field);
        }
        else data=await getCars(carID,field);
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})
export default carDtRouter;