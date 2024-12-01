import InterestRate from '../models/InterestRate.js'
const getBanks=async(field)=>{
    try{
        const bankData=await InterestRate.find({},{ [field]: 1 })
        return bankData;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}
export default getBanks;