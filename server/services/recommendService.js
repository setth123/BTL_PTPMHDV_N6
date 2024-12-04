import axios from "axios";

/**
 * Service lấy dữ liệu từ các API
 */
export const fetchCarData = async () => {
  try {
    const carVersionsResponse = await axios.get("http://localhost:3000/carVer");
    console.log("Fetched car data:", carVersionsResponse.data);
    return carVersionsResponse.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu carVer:", error);
    throw new Error("Không thể lấy dữ liệu carVer");
  }
};

export const fetchRateData = async () => {
  try {
    const ratesResponse = await axios.get("http://localhost:3000/rate");
    console.log("Fetched rate data:", ratesResponse.data);
    return ratesResponse.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu rate:", error);
    throw new Error("Không thể lấy dữ liệu rate");
  }
};


export const getRecommendations = async (downPayment, monthlyPayment) => {
  try {
    if (typeof downPayment !== 'number' || typeof monthlyPayment !== 'number') {
      throw new Error('Invalid input: downPayment and monthlyPayment must be numbers');
    }
    
    const [carVersions, rates] = await Promise.all([
      fetchCarData(), 
      fetchRateData()
      ]).catch(error => {
      console.error('Promise.all error:', error);
      throw error;
    });
    
    // Additional data validation
    if (!carVersions || !rates || carVersions.length === 0 || rates.length === 0) {
     throw new Error('No car versions or rates data available');
    }

    for (const carVersion of carVersions) {
      const carPrice = parseInt(carVersion.price); // Giá xe từ API
      const loanAmount = carPrice - downPayment; // Số tiền cần vay

      if (loanAmount <= 0) {
        recommendations.push({
          carName: carVersion.name,
          price: carPrice,
          term: 0,
          monthlyPayment: 0,
        });
        continue;
      }

      // Tìm ngân hàng có lãi suất thấp nhất
      const minRateBank = rates.reduce((lowest, bank) => {
        return bank.Rate < lowest.Rate ? bank : lowest;
      });

      const lowestInterestRate = minRateBank.Rate;
      const monthlyRate = lowestInterestRate / 100 / 12; // Lãi suất hàng tháng

      for (let years = 1; years <= 8; years++) {
        const term = years * 12; // Số tháng
        const monthlyInstallment =
          loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -term)));

        if (monthlyInstallment <= monthlyPayment) {
          recommendations.push({
            carName: carVersion.name,
            price: carPrice,
            bankName: minRateBank.name,
            interestRate: lowestInterestRate,
            term: years,
            monthlyPayment: monthlyInstallment.toFixed(2),
          });
          break; // Dừng khi tìm được kỳ hạn phù hợp
        }
      }
    }

    return recommendations;
  } catch (error) {
      console.error('Detailed error in getRecommendations:', {
      message: error.message,
      stack: error.stack,
      downPayment,
      monthlyPayment
      });
      throw error;
    }
};