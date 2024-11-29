import CarVersion from '../models/CarVersion.js'
const getCars=async(carID=null,field)=>{
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
export default getCars;