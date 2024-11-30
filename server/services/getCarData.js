import CarVersion from '../models/CarVersion.js'
import Car from '../models/Car.js'
export const getCars=async(carID=null,field)=>{
    try{
        if(carID===null){
            const carData=await CarVersion.find(field);
            return carData;
        }
        const carData=await CarVersion.find({carID:carID},field)
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
