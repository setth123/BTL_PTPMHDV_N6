import SelectInput from "../../components/selectInput/selectInput";
import './chartPage.css'
import { useEffect,useState } from "react";
const CarChart = () => {
    const [carOpt,setCarOpt]=useState(null);
    const [fieldOpt,setFieldOpt]=useState('');
    const [typeOpt,setTypeOpt]=useState('');
    const [colorsOpt,setColorsOpt]=useState('');
    const [cars,setCars]=useState({});
    useEffect(() => {
        const fetchCarsData = async () => {
        try {
            const res = await fetch('http://localhost:4000/chart/cars', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const carsData = await res.json();
            const newData=carsData.map(car=>({id:car._id,name:car.name}))
            setCars(newData)
            setCars((prevData)=>[...prevData,{id:'*',name:'*'}])
            console.log(cars)
      } catch (error) {
        console.error('Error fetching cars data:', error);
      }
    };
    fetchCarsData(); 
  }, []);

    const handleSubmit=async()=>{
        try{
            const res=await fetch(`http://localhost:4000/chart/${carOpt}/${fieldOpt}`,{
                method:'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const data=await res.json();
            console.log(data);
        }
        catch(err){
            console.log('Error fetching carsversion data: ',err)
        }

    }
    const fieldName=[{name:'Giá',id:'price'},{name:'Thời gian tăng tốc',id:'acceleration'},{name:'Dung lượng pin',id:'battery'},{name:'Quãng đường chạy 1 lần sạc',id:'dist'},{name:'Chiều cao',id:'height'},{name:'Chiều dài',id:'length'},{name:'Công suất tối đa',id:'maxPower'},{name:'Số chỗ',id:'seatsNumber'},{name:'Trọng lượng',id:'weight'},{name:'Chiều rộng',id:'width'}]
    const type=[{name:'Biểu đồ cột',id:'bar'},{name:'Biểu đồ đường',id:'line'},{name:'Biểu đồ cột ngang',id:'line'},{name:'Biểu đồ radar',id:'radarChart'}]
    const colors=[{name:'Đỏ',id:'red'},{name:'Xanh dương',id:'blue'},{name:'Xanh lá',id:'green'},{name:'Vàng',id:'yellow'},{name:'Cam',id:'orange'}]
    return (
        <>
            <div className='selectOpt'>
                <SelectInput data={cars} name={'Mẫu xe'} onChange={(value)=>setCarOpt(value)}/>
                <SelectInput data={fieldName} name={'Trường giá trị'} onChange={(value)=>setFieldOpt(value)}/>
                <SelectInput data={type} name={'Kiểu biểu đồ'} onChange={(value)=>setColorsOpt(value)}/>
                <SelectInput data={colors} name={'Màu sắc'} onChange={(value)=>setTypeOpt(value)}/>
                <button id="submitBtn" onClick={handleSubmit}>Tạo biểu đồ</button>
            </div>
            {/* <Chart /> */}
        </>
    )
}

export default CarChart;