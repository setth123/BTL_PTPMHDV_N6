import React, { useEffect, useState } from 'react';
import SelectInput from '../../components/selectInput/selectInput';

const priceCalculate = () => {
    const [cars, setCars] = useState({});
    useEffect(() => {
        const fetchCarsData = async () => {
          try {
            const res = await fetch('http://localhost:4000/carChart/cars', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const carsData = await res.json();
            const newData = carsData.map((car) => ({ id: car._id, name: car.name }));
            setCars(newData);
            setCars((prevData) => [...prevData, { id: '*', name: '*' }]);
            console.log(cars);
          } catch (error) {
            console.error('Error fetching cars data:', error);
          }
        };
        fetchCarsData();
      }, []);

      
  return (
    <>
      <div className='selectOpt'>
        <SelectInput data={cars} name={'Mẫu xe'} onChange={(value) => setCars(value)} isRanked/>
      </div>
    </>
  );
}

export default priceCalculate