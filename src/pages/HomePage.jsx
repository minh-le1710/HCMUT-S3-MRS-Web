import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-decor">
                <img src="/left-background.png" className="decor-left" alt="left-decor" />
                <img src="/right-background.png" className="decor-right" alt="right-decor" />
                <img src="/mid-background.png" className="decor-mid" alt="mid-decor" />
            </div>

            <header className="header">
                <div className="left-section">
                    {/* Khối logo */}
                    <Link to="/" className="logo-wrapper">
                        <img src="/logobachkhoa.png" className="logo" alt="BK Logo" />
                        <div className="logo-s3mrs">
                            <span className="smart-blue">S<sub>3</sub>-</span>
                            <span className="smart-dark">MRS</span>
                        </div>
                    </Link>


                    {/* Khối menu nằm bên cạnh */}
                    <nav className="menu">
                        <button className="menu-btn" onClick={() => navigate('/login')}>Giới thiệu</button>
                        <button className="menu-btn" onClick={() => navigate('/login')}>Đặt chỗ</button>
                        <button className="menu-btn" onClick={() => navigate('/login')}>Chỗ của tôi</button>
                    </nav>
                </div>

                <div className="right-section">
                    <Link to="/register">
                        <button className="btn">Đăng ký</button>
                    </Link>
                    <button className="btn" onClick={() => navigate('/login')}>Đăng nhập</button>
                </div>
            </header>


            <main className="home-main-content">
                <h1 className="main-title">
                    Hệ thống đặt chỗ và quản lý<br />
                    Không gian học tập thông minh tại <span className="blue">HCMUT</span>
                </h1>
                <h2 className="decor-line">
                    <span className="smart-blue">Smart</span>{' '}
                    <span className="smart-dark">Study Space Management</span>
                </h2>
            </main>
        </>
    );
}
