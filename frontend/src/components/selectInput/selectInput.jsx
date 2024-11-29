import { useState } from "react";
import './selectInput.css'
const SelectInput = ({data=["a","b","c"]}) => {
    const [isOpen,setIsOpen]=useState(false);
    const [options,setOptions]=useState(data)
    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Đổi trạng thái khi click
    };

    return (
        <div className="dropdown-container">
            <div
                className={`dropdown ${isOpen ? "open" : ""}`} // Thêm class 'open' khi dropdown mở
                onClick={toggleDropdown}
            >
                <span className="dropdown-text"></span>
                <span className="arrow">{isOpen ? "▲" : "▼"}</span> {/* Hiển thị mũi tên */}
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    {options.map((option,index)=>(
                        <div key={index} className="menu-item">
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SelectInput;