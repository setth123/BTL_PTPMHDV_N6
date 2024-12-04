import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./CarDisplay.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarDisplay = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/car")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Cấu hình slider với nút tùy chỉnh
  const settings = {
    dots: true, // Hiển thị nút điều hướng dots
    infinite: true, // Vòng lặp slider
    speed: 500,
    slidesToShow: 3, // Hiển thị 3 xe cùng lúc
    slidesToScroll: 1, // Lướt qua 1 slide mỗi lần
    nextArrow: <NextArrow />, // Nút sang phải
    prevArrow: <PrevArrow />, // Nút sang trái
    responsive: [
      {
        breakpoint: 768, // Màn hình nhỏ
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024, // Màn hình trung bình
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="car-display-container">
      <Slider {...settings}>
        {cars.map((car) => (
          <div key={car._id} className="car-item">
            <div className="car-overlay">
              <img src={car.pictureURL} alt={car.name} className="car-image" />
              <div className="car-name-overlay">{car.name}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Nút sang phải
const NextArrow = ({ onClick }) => {
    return <div className="slider-arrow next" onClick={onClick}>→</div>;
  };
  
  const PrevArrow = ({ onClick }) => {
    return <div className="slider-arrow prev" onClick={onClick}>←</div>;
  };
export default CarDisplay;
