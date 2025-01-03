import express from "express"
import mongoose from "mongoose"
import carRouter from "./route/carRouters.js";
import cors from 'cors';
import carVerRouters from "./route/carVerRouters.js";
import adminRouters from "./route/adminRouters.js";
import verifyToken from "./middlewares/verify.js";
import rateRouters from "./route/rateRouters.js";
import customerStaticRouter from "./route/customerStatic.js"
import Car from "./Models/Car.js";
import carVersion from "./Models/CarVersion.js";
import InterestRate from "./Models/InterestRate.js";

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//verifyToken to verify admin before doing any actions
app.use('/rate',verifyToken,rateRouters);
app.use('/car',verifyToken,carRouter);
app.use('/carVer',verifyToken, carVerRouters);
app.use('/admin',adminRouters);
app.use('/custormerStatic',verifyToken,customerStaticRouter);

async function setDefaultValues() {
    try {
      await Car.updateMany(
        { viewed: { $exists: false } }, // Chỉ cập nhật những bản ghi chưa có field "status"
        { $set: { viewed:0  } }
      );
      await InterestRate.updateMany(
        {viewed:{$exists:false}},
        {$set:{viewed:0}}
      )
      await carVersion.updateMany(
        {viewed:{$exists:false}},
        {$set:{viewed:0}}
      )
    } catch (error) {
      console.error('Lỗi khi cập nhật giá trị mặc định:', error);
    }
  }

mongoose.connect("mongodb+srv://thanhtkcb2004:ksiuOWOBVmMF6sP5@cluster0.uuuqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(async()=>{
    setDefaultValues();
    console.log('yes');
    app.listen(3000,'0.0.0.0', ()=>{
        console.log("success");
    })
})
.catch((err)=>{
    console.log(err.message);
})
