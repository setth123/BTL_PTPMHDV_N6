import { useState,useEffect } from "react";
import './selectInput.css'
const SelectInput = ({data,name,onChange}) => {
    const [isOpen,setIsOpen]=useState(false);
    const [options,setOptions]=useState([]);
    const [selectedValue, setSelectedValue] = useState([]);
    const [selectedName,setSelectedName]=useState(null);
    useEffect(() => {
        if (data && typeof data === 'object') {
            setOptions(Object.entries(data));  
        }
    }, [data]);  
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Đổi trạng thái khi click
    };

    const handleSelect = (key) => {
        setSelectedValue(key.value.id);
        setSelectedName(key.value.name);
        setIsOpen(false); // Đóng dropdown sau khi chọn
        if (onChange) {
            onChange(key.value.id); // Gọi hàm onChange nếu có, truyền giá trị đã chọn
        }
    };

    return (
        <div className="dropdown-container">
            <div
                className={`dropdown ${isOpen ? "open" : ""}`} // Thêm class 'open' khi dropdown mở
                onClick={toggleDropdown}
            >
                <span className="dropdown-text">{selectedName ? selectedName : name}</span>
                <span className="arrow">{isOpen ? "▲" : "▼"}</span> {/* Hiển thị mũi tên */}
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    {options.map(([key,value])=>(
                        <div key={key} className="menu-item" onClick={() => handleSelect({key,value})}>
                            {value.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SelectInput;