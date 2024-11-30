import { useState,useEffect } from "react";
import './selectInput.css'
const SelectInput = ({data,name,onChange}) => {
    const [isOpen,setIsOpen]=useState(false);
    const [options,setOptions]=useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    useEffect(() => {
        if (data && Array.isArray(data)) {
            setOptions(data);  
        }
    }, [data]);  
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Đổi trạng thái khi click
    };

    const handleSelect = (value) => {
        setSelectedValue(value);
        setIsOpen(false); // Đóng dropdown sau khi chọn
        if (onChange) {
            onChange(value); // Gọi hàm onChange nếu có, truyền giá trị đã chọn
        }
    };

    return (
        <div className="dropdown-container">
            <div
                className={`dropdown ${isOpen ? "open" : ""}`} // Thêm class 'open' khi dropdown mở
                onClick={toggleDropdown}
            >
                <span className="dropdown-text">{selectedValue ? selectedValue : name}</span>
                <span className="arrow">{isOpen ? "▲" : "▼"}</span> {/* Hiển thị mũi tên */}
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    {options.map((option,index)=>(
                        <div key={index} className="menu-item" onClick={() => handleSelect(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SelectInput;