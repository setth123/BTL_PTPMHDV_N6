import SelectInput from "../../components/selectInput/selectInput";
import './chartPage.css'
import { useEffect,useState } from "react";
const CarChart = () => {
    const [carsName, setCarsName] = useState([]);
    const [carOpt,setCarOpt]=useState('');
    const [fieldOpt,setFieldOpt]=useState('');
    const [typeOpt,setTypeOpt]=useState('');
    const [colorsOpt,setColorsOpt]=useState('');
    const [cars,setCars]=useState({});
    useEffect(() => {
        const fetchCarsData = async () => {
        try {
            const res = await fetch('http://localhost:4000/chart/cars', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const carsData = await res.json();
            setCars(carsData.map(car=>({id:car._id,name:car.name})))
            const carsName = carsData.map(car => car.name);
            setCarsName([...carsName,'*']); 
      } catch (error) {
        console.error('Error fetching cars data:', error);
      }
    };
    fetchCarsData(); 
  }, []);

    const handleSubmit=async()=>{
        console.log(carOpt,fieldOpt,colorsOpt,typeOpt);

    }
    const fieldName=['Giá','Thời gian tăng tốc','Dung lượng pin','Thời gian chạy 1 lần sạc','Chiều cao','Chiều dài','Công suất tối đa','Số chỗ','Trọng lượng','Chiều rộng']
    const type=['Biểu đồ cột','Biểu đồ đường','Biểu đồ cột ngang','Biểu đồ radar']
    const colors=['Đỏ','Xanh dương','Xanh lá','Vàng','Cam']
    return (
        <>
            <div className='selectOpt'>
                <SelectInput data={carsName} name={'Mẫu xe'} onChange={(value)=>setCarOpt(value)}/>
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