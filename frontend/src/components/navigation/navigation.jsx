import './navigation.css';
import { Link } from 'react-router-dom';
const Navigation = () => {
    return (
        <div className='navbar'>
<<<<<<< HEAD
            <Link to="/s" className="nav-item">Tính giá trả góp</Link>
            <Link to="/a" className="nav-item">So sánh xe</Link>
            <Link to="/d" className="nav-item">So sánh ngân hàng</Link>
            <Link to="/carChart" className="nav-item">Biểu đồ thông tin xe</Link>
            <Link to="/bankChart" className="nav-item">Biểu đồ thông tin ngân hàng</Link>
=======
            <a href="#home" className="nav-item">Tính giá trả góp</a>
            <a href="/recommendation" className="nav-item">So sánh</a>
            <a href="/chart" className="nav-item">Biểu đồ thông tin xe</a>
            <a href="#contact" className="nav-item">Biểu đồ thông tin ngân hàng</a>
>>>>>>> e355b03131dec9e3a6621ae5e89c1d7c90d2b3e6
        </div>
    )
}

export default Navigation;