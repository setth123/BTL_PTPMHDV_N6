import React, { useState } from "react";
import "./CarRcm.css";

const CarRecommendation = () => {
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [recommendedCars, setRecommendedCars] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Giả sử có một hàm gợi ý xe dựa trên số tiền trả trước và trả hàng tháng
    const cars = getRecommendedCars(downPayment, monthlyPayment);
    setRecommendedCars(cars);
  };

  const getRecommendedCars = (downPayment, monthlyPayment) => {
    // Hàm gợi ý xe (mô phỏng dữ liệu)
    const cars = [
      { name: "VinFast Lux A2.0", price: 1000000 },
      { name: "VinFast VF e34", price: 800000 },
      { name: "VinFast VF 8", price: 1500000 },
    ];

    return cars.filter((car) => car.price <= downPayment + monthlyPayment * 12);
  };

  return (
    <div className="car-recommendation-container">
      <h2>Gợi ý mẫu xe phù hợp với tài chính của bạn</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="downPayment">Số tiền trả trước:</label>
          <input
            type="number"
            id="downPayment"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            placeholder="Nhập số tiền trả trước"
          />
        </div>
        <div className="input-field">
          <label htmlFor="monthlyPayment">Số tiền có thể trả mỗi tháng:</label>
          <input
            type="number"
            id="monthlyPayment"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(e.target.value)}
            placeholder="Nhập số tiền trả mỗi tháng"
          />
        </div>
        <button type="submit" className="submit-button">Gửi</button>
      </form>

      {recommendedCars.length > 0 && (
        <div className="car-suggestions">
          <h3>Các mẫu xe gợi ý:</h3>
          <ul>
            {recommendedCars.map((car, index) => (
              <li key={index}>{car.name} - {car.price} VND</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CarRecommendation;
