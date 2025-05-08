import './ProfilePage.css';
import { Link } from 'react-router-dom';
import UserMenu from '../components/UserMenu';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  return (
    <>
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
        <div className="right-section">
          <UserMenu />
        </div>
      </header>

      <main className="profile-page">
        <h1>Thông tin cá nhân</h1>

        <div className="profile-card">
          <div className="profile-top">
            <img src="/avatar-icon.png" alt="Avatar" className="avatar-big" />
            <div>
              <h2>Test123</h2>
              <p className="email">test123@hcmut.edu.vn</p>
            </div>
            <button className="close-btn">✕</button>
            <span className="edit-icon">✎</span>
          </div>

          <div className="profile-info">
            <div className="info-row">
              <label>Name</label>
              <span>Anh</span>
            </div>
            <div className="info-row">
              <label>Email account</label>
              <span>test123@hcmut.edu.vn</span>
            </div>
            <div className="info-row">
              <label>Mobile number</label>
              <span>07787177390</span>
            </div>
            <div className="info-row">
              <label>Khoa</label>
              <span>Máy tính</span>
            </div>
          </div>

          <button className="btn-save">Save Change</button>
        </div>
      </main>
    </>
  );
}
