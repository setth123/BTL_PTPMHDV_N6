import xlsx from 'xlsx';

function createExcelFile(data) {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);

    // Thay đổi tiêu đề (cột đầu tiên) bằng tên mới
    const newHeader = ['Kỳ hạn', 'Dư nợ đầu kỳ', 'Tiền gốc', 'Tiền lãi', 'Tổng tiền', 'Dư nợ cuối kỳ'];
    newHeader.forEach((header, index) => {
        const cellAddress = xlsx.utils.encode_cell({ r: 0, c: index }); // Chỉ thay đổi hàng đầu tiên (hàng tiêu đề)
        worksheet[cellAddress].v = header; // Cập nhật giá trị của ô tiêu đề
    });

    xlsx.utils.book_append_sheet(workbook, worksheet, 'Schedule');

    // Tạo buffer từ workbook
    const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    
    return buffer; // Trả về buffer thay vì lưu vào file
}

export default { createExcelFile };
