import xlsx from 'xlsx';

function createExcelFile(data) {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Schedule');

    // Tạo buffer từ workbook
    const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    
    return buffer; // Trả về buffer thay vì lưu vào file
}

export default { createExcelFile };
