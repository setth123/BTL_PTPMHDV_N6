import './navigation.css';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
    return (
        <div className='navbar'>
            <a href="#home" className="nav-item">Tính giá trả góp</a>
            <a href="#about" className="nav-item">So sánh</a>
            <a href="/" className="nav-item">Biểu đồ thông tin xe</a>
            <a href="#contact" className="nav-item">Biểu đồ thông tin ngân hàng</a>
        </div>
    )
}

export default Navigation;