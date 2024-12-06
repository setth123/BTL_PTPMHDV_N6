import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';

function createExcelFile(data, fileName) {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Schedule');

    // Đảm bảo thư mục uploads tồn tại
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
    }

    // Lưu file tại thư mục uploads
    const filePath = path.join(uploadsDir, fileName);
    xlsx.writeFile(workbook, filePath);

    return filePath; // Trả về đường dẫn file đã tạo
}

export default { createExcelFile };
