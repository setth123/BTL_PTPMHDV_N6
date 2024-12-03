import React, { useState } from "react";
import "./CarRcm.css";

const CarRecommendation = () => {
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          downPayment: parseInt(downPayment),
          monthlyPayment: parseInt(monthlyPayment),
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu từ server");
      }

      const data = await response.json();
      setRecommendedCars(data);
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
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

      {loading && <p>Đang tải...</p>}

      {error && <p className="error">{error}</p>}

      {recommendedCars.length > 0 && (
        <div className="car-suggestions">
          <h3>Các mẫu xe gợi ý:</h3>
          <ul>
            {recommendedCars.map((car, index) => (
              <li key={index}>{car.carName} - {car.monthlyPayment} VND/tháng</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CarRecommendation;
