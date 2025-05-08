import './AboutPage.css';
import { Link } from 'react-router-dom';
import UserMenu from '../components/UserMenu';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <>
      {/* Nền trang trí */}
      <div className="bg-decor">
        <img src="/left-background.png" className="decor-left" alt="left-decor" />
        <img src="/right-background.png" className="decor-right" alt="right-decor" />
      </div>

      {/* Header */}
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
        <div className="right-section">
          <UserMenu />
        </div>
      </header>

      {/* Nội dung */}
      <main className="about-main">
        <h2 className="about-title">
          <span className="smart-blue">Smart</span>{' '}
          <span className="smart-dark">Study Space Management</span>
        </h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Hệ thống Quản lý và Đặt chỗ Không gian Tự học Thông minh giúp sinh viên và giảng viên
              dễ dàng tìm kiếm, đặt chỗ và sử dụng không gian học tập hiệu quả. Với tính năng tra cứu
              theo thời gian thực, xác thực thông minh và tự động quản lý đặt chỗ, hệ thống tối ưu hóa
              cơ sở vật chất, mang lại trải nghiệm học tập thuận tiện và linh hoạt.
            </p>
          </div>
          <div className="about-image">
            <img src="/bk-image.png" alt="Bach Khoa" />
          </div>
        </div>
      </main>
    </>
  );
}
