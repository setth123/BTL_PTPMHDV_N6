import InterestRate from '../models/InterestRate.js'
const getBanks=async(field)=>{
    try{
        const fields=[field,'BankName']
        const fieldsObj=fields.reduce((acc, field) => {
            acc[field] = 1;
            return acc;
        }, {});
        const bankData=await InterestRate.find({},fieldsObj)
        return bankData;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}
export default getBanks;