import express from 'express'; 
import downloadService from '../services/downloadService.js'; 

const router = express.Router();

router.post('/downloadPriceCal', (req, res) => {
    const data = req.body; // Nhận dữ liệu từ frontend

    // Kiểm tra dữ liệu nhận được
    if (!data || data.length === 0) {
        return res.status(400).json({ message: 'Dữ liệu không hợp lệ.' });
    }

    // Gọi service để tạo file Excel
    const filePath = downloadService.createExcelFile(data, 'installment_schedule.xlsx');

    // Gửi tệp file về phía frontend
    res.sendFile(filePath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi tải file.' });
        }
    });
});

export default router;
