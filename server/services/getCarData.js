import CarVersion from '../models/CarVersion.js'
import Car from '../models/Car.js'
export const getCars=async(carID,field)=>{
    try{
        const fields=[field,'verName']
        const fieldsObj=fields.reduce((acc, field) => {
            acc[field] = 1;
            return acc;
        }, {});
        if(carID==='*'){
            const carData=await CarVersion.find({},fieldsObj);
            return carData;
        }
        const carData=await CarVersion.find({carID:carID},fieldsObj)
        return carData;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}
export const getCarType=async()=>{
    try{
        const carData=await Car.find({},'_id name');
        return carData;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}
