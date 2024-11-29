import express from "express"
import getBanks from "../services/getBankData";
const bankDtRouter=express.Router();
bankDtRouter.get("/:field",async(req,res)=>{
    const field=req.body;
    try{
        const data=await getBanks(field)
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})
export default bankDtRouter;