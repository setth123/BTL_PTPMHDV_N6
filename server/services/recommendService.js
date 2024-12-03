const axios = require("axios");

/**
 * Hàm lấy dữ liệu từ các API
 */
const fetchData = async () => {
  try {
    const [carVersionsResponse, ratesResponse] = await Promise.all([
      axios.get("http://localhost:3000/carVer"), // API lấy danh sách phiên bản xe
      axios.get("http://localhost:3000/rate"), // API lấy danh sách lãi suất
    ]);

    const carVersions = carVersionsResponse.data;
    const rates = ratesResponse.data;

    return { carVersions, rates };
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ API:", error);
    throw new Error("Không thể lấy dữ liệu từ API");
  }
};

/**
 * Hàm gợi ý xe dựa trên thông tin tài chính
 * @param {number} downPayment - Số tiền trả trước
 * @param {number} monthlyPayment - Số tiền có thể trả mỗi tháng
 * @returns {Array} - Danh sách gợi ý xe
 */
const getRecommendations = async (downPayment, monthlyPayment) => {
  const { carVersions, rates } = await fetchData();
  const recommendations = [];

  for (const carVersion of carVersions) {
    const carPrice = parseInt(carVersion.price); // Giá xe từ API
    const loanAmount = carPrice - downPayment; // Số tiền cần vay

    if (loanAmount <= 0) {
      // Nếu không cần vay thì xe này hợp lệ ngay
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
        return (bank.Rate < lowest.Rate) ? bank : lowest;
    });

    const lowestInterestRate = minRateBank.Rate;
    const monthlyRate = lowestInterestRate / 100 / 12; // Lãi suất hàng tháng của ngân hàng có lãi suất thấp nhất

    for (let years = 1; years <= 8; years++) {
        const term = years * 12; // Số tháng
        const monthlyInstallment =
        loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -term))); // Công thức tính M

        if (monthlyInstallment <= monthlyPayment) {
        recommendations.push({
            carName: carVersion.name,
            price: carPrice,
            bankName: minRateBank.name, // Tên ngân hàng có lãi suất thấp nhất
            interestRate: lowestInterestRate, // Lãi suất của ngân hàng
            term: years,
            monthlyPayment: monthlyInstallment.toFixed(2),
        });
        break; // Ngừng thử các kỳ hạn khác sau khi tìm được kỳ hạn phù hợp
        }
    }
}

return recommendations;
};

module.exports = { getRecommendations };