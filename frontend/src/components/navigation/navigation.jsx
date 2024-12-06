import './navigation.css';
import { Link } from 'react-router-dom';
const Navigation = () => {
    return (
        <div className='navbar'>
            <Link to="/calculate" className="nav-item">Tính giá trả góp</Link>
            <Link to="/a" className="nav-item">So sánh xe</Link>
            <Link to="/d" className="nav-item">So sánh ngân hàng</Link>
            <Link to="/carChart" className="nav-item">Biểu đồ thông tin xe</Link>
            <Link to="/bankChart" className="nav-item">Biểu đồ thông tin ngân hàng</Link>
        </div>
    )
}

export default Navigation;