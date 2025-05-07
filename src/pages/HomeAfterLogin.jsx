import { Link } from 'react-router-dom';
import './HomeAfterLogin.css';
import UserMenu from '../components/UserMenu';
import { useNavigate } from 'react-router-dom';

export default function HomeAfterLogin() {
  const navigate = useNavigate();
  return (
    <>
      {/* Nền trang trí */}
      <div className="bg-decor">
        <img src="/left-background.png" className="decor-left" alt="left-decor" />
        <img src="/right-background.png" className="decor-right" alt="right-decor" />
      </div>

      <header className="header">
        <div className="left-section">
          <Link to="/home" className="logo-wrapper">
            <img src="/logobachkhoa.png" className="logo" alt="BK Logo" />
            <div className="logo-s3mrs">
              <span className="smart-blue">S<sub>3</sub>-</span>
              <span className="smart-dark">MRS</span>
            </div>
          </Link>
          <nav className="menu">
            <button className="menu-btn" onClick={() => navigate('/about')}>Giới thiệu</button>
            <button className="menu-btn" onClick={() => navigate('/booking')}>Đặt chỗ</button>
            <button className="menu-btn" onClick={() => navigate('/myseat')}>Chỗ của tôi</button>
            <button className="menu-btn" onClick={() => navigate('/qr')}>Quét QR</button>
          </nav>
        </div>
        <div className="right-sectio">
          <UserMenu />
        </div>
      </header>

      <main className="main-content">
        <h1>
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
