import React, { useEffect, useState } from 'react';
import SelectInput from '../../components/selectInput/selectInput';

const priceCalculate = () => {
    const [cars, setCars] = useState({});
    const [carOpt, setCarOpt] = useState(null);
    const [fieldOpt, setFieldOpt] = useState('');
    const [carVerOpt, setVerOpt] = useState('');
    const [carVers, setCarVers] = useState('');
    const [banks, setBanks] = useState({});
    const [bankOpt, setBankOpt] = useState('');
    const [downPayRateOpt, setDownPayRate] = useState(0)
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
            
            console.log(cars);
          } catch (error) {
            console.error('Error fetching cars data:', error);
          }
        };
        fetchCarsData();
      }, []);
    
    const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:4000/carChart/${carOpt}/${fieldOpt}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
    } catch (err) {
      console.log('Error fetching carsversion data: ', err);
    }
  };

  useEffect(() => {
    const fetchVersData = async () => {
      try {
        const res = await fetch(`http://localhost:4000/carver/${carOpt}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const versData = await res.json();
        const newData = versData.map((ver) => ({ id: ver._id, name : `${ver.verName} ${ver.isBaterry ? 'Có pin' : 'Không pin'}` }));
        setCarVers(newData);
        
        console.log(cars);
      } catch (error) {
        console.error('Error fetching cars data:', error);
      }
    };
    fetchVersData();
  }, [carOpt]);
      
  useEffect(() => {
    const fetchBanksData = async () => {
      try {
        const res = await fetch('http://localhost:4000/bankChart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const banksData = await res.json();
        const newData = banksData.map((bank) => ({ id: bank._id, name: `${bank.BankName} - ${bank.Rate}%`}));
        setBanks(newData);
        
        console.log(cars);
      } catch (error) {
        console.error('Error fetching cars data:', error);
      }
    };
    fetchBanksData();
  }, []);

  const downPaymentOptions = {value: 20}

  return (
    <>
      <div className='selectOpt'>
        <SelectInput data={cars} name={'Mẫu xe'} onChange={(value) => setCarOpt(value)} isRanked/>
        <SelectInput data={carVers} name={'Phiên bản xe'} onChange={(value) => setVerOpt(value)} isRanked/>
        <SelectInput data={banks} name={'Ngân hàng'} onChange={(value) => setBankOpt(value)} isRanked/>
      </div>
    </>
  );
}

export default priceCalculate