import carVersion from "../models/CarVersion.js";
import InterestRate from "../models/InterestRate.js";

export const getPriceCal = async(carVerId, bankId, downPayRate, loanTerm)=>{
    try {
        const car = await carVersion.findOne({ _id: carVerId }).select('price');
        const bank = await InterestRate.findOne({_id: bankId}).select('Rate');

        const price = car.price;
        const rate = bank.Rate;

        const downPayment = (downPayRate / 100) * price; // Số tiền trả trước
        const loanAmount = price - downPayment;          // Số tiền vay
        const monthlyRate = rate / 12 / 100;       // Lãi suất hàng tháng
        const totalMonths = loanTerm * 12;              // Tổng số tháng vay

        let schedule = [];
        let remainingBalance = loanAmount;

        for (let month = 1; month <= totalMonths; month++) {
            const interestPayment = remainingBalance * monthlyRate; // Tiền trả lãi mỗi tháng
            const principalPayment = loanAmount / totalMonths;      // Tiền trả gốc mỗi tháng
            const totalPayment = interestPayment + principalPayment; // Tổng tiền trả mỗi tháng
            const endingBalance = remainingBalance - principalPayment; // Số dư cuối kỳ

            schedule.push({
                paymentPeriod: `Tháng ${month}`,
                startingBalance: parseFloat(remainingBalance.toFixed(2)),
                principalPayment: parseFloat(principalPayment.toFixed(2)),
                interestPayment: parseFloat(interestPayment.toFixed(2)),
                totalPayment: parseFloat(totalPayment.toFixed(2)),
                endingBalance: parseFloat(endingBalance.toFixed(2)),
            });

            remainingBalance = endingBalance;
        }

        // Trả về kết quả
        return {
            carVerId,
            bankId,
            price,
            downPayment,
            loanAmount,
            schedule,
        };
    } catch (error) {
        console.log(err.message);
        return null;
    }
}