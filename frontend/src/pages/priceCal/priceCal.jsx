import React, { useEffect, useState } from 'react';
import SelectInput from '../../components/selectInput/selectInput';
import './priceCal.css'

const priceCalculate = () => {
    const [cars, setCars] = useState({});
    const [carOpt, setCarOpt] = useState(null);
    const [fieldOpt, setFieldOpt] = useState('');
    const [carVerOpt, setVerOpt] = useState('');
    const [carVers, setCarVers] = useState('');
    const [banks, setBanks] = useState({});
    const [bankOpt, setBankOpt] = useState('');
    const [downPayRateOpt, setDownPayRate] = useState(0)
    const [loanTerm, setLoanTerm] = useState(0);
    const [dataToDownload, setDataDownload] = useState(null);
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

  
    const [schedule, setSchedule] = useState([]);
    const [loanDetails, setLoanDetails] = useState(null);
    const handlePostRequest = async () => {
      try {
        
    
        const response = await fetch(`http://localhost:4000/calculate/${carOpt}/${carVerOpt}/${bankOpt}/${downPayRateOpt}/${loanTerm}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status);
        }
        
        const data = await response.json();
        setDataDownload(data.schedule);
        console.log('Loan Calculation Response:', data);
    
        setLoanDetails({
          price: data.price,
          downPayment: data.downPayment,
          loanAmount: data.loanAmount,
        });
        setSchedule(data.schedule);
      } catch (error) {
        console.error('Error posting data:', error);
        alert('Có lỗi xảy ra trong quá trình tính toán!');
      }
    };
  
    const handleDownload = async() => {
      try {
        const response = await fetch('http://localhost:4000/downloadPriceCal', {
          method : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify(dataToDownload),
        })
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
      a.href = url;
      a.download = 'Bảng tính khoản vay.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
      }
    }

  return (
    <>
      <div className="container">
        <div className="form-selection">
          <SelectInput data={cars} name="Mẫu xe" onChange={(value) => setCarOpt(value)} isRanked />
          <SelectInput data={carVers} name="Phiên bản xe" onChange={(value) => setVerOpt(value)} isRanked />
          <SelectInput data={banks} name="Ngân hàng" onChange={(value) => setBankOpt(value)} isRanked />
          <div className="input-container">
            <div className="input-group">
              <input type="number" id="priceInput" className="custom-input" step={10} placeholder="Số tiền trả trước (%)" onChange={(e) => setDownPayRate(e.target.value)} />
            </div>
            <div className="input-group">
              <input type="number" id="downPayment" className="custom-input" step={1} placeholder="Thời hạn (năm)" onChange={(e) => setLoanTerm(e.target.value)} />
            </div>
          </div>
          </div>
        <button className="submit-button" onClick={handlePostRequest}>Xem lịch trả góp</button>
        {loanDetails && (
          <div className="loan-details">
            <h3>Chi tiết khoản vay:</h3>
            <p>Giá xe: {loanDetails.price.toLocaleString()} VNĐ</p>
            <p>Trả trước: {loanDetails.downPayment.toLocaleString()} VNĐ</p>
            <p>Khoản vay: {loanDetails.loanAmount.toLocaleString()} VNĐ</p>
          </div>
        )}


        {schedule.length > 0 && (
          <div className="payment-schedule">
            <h3>Lịch trả góp:</h3>
            <table>
              <thead>
                <tr>
                  <th>Kỳ hạn</th>
                  <th>Dư nợ đầu kỳ</th>
                  <th>Tiền gốc</th>
                  <th>Tiền lãi</th>
                  <th>Tổng tiền</th>
                  <th>Dư nợ cuối kỳ</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => (
                  <tr key={index}>
                    <td>{item.paymentPeriod}</td>
                    <td>{item.startingBalance.toLocaleString()} VNĐ</td>
                    <td>{item.principalPayment.toLocaleString()} VNĐ</td>
                    <td>{item.interestPayment.toLocaleString()} VNĐ</td>
                    <td>{item.totalPayment.toLocaleString()} VNĐ</td>
                    <td>{item.endingBalance.toLocaleString()} VNĐ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {schedule.length > 0 && (
          <button className="download-button" onClick={handleDownload}>Download Excel</button>
        )}
      </div>
    </>
  );
  
}

export default priceCalculate