
import './QRCodePage.css';
import { Link } from 'react-router-dom';
import UserMenu from '../components/UserMenu';
import { useState } from 'react';

export default function QRCodePage() {
  const [scanSuccess, setScanSuccess] = useState(false);
  const handleScan = () => {
    setScanSuccess(true);
  };

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
            <Link to="/about" className="menu-btn">Giới thiệu</Link>
            <Link to="/booking" className="menu-btn">Đặt chỗ</Link>
            <Link to="/myseat" className="menu-btn">Chỗ của tôi</Link>
            <Link to="/qr" className="btn-qr">Quét QR</Link>
          </nav>
        </div>
        <div className="right-sectionss">
          <UserMenu />
        </div>
      </header>

      <main className="qr-main">
        <h1 className="qr-title">Thông tin Đặt chỗ</h1>
        <h3 className="qr-sub">(Scan mã QR để bắt đầu sử dụng)</h3>
        <div className="qr-code-wrapper">
          <img src="/qr-code-demo.png" alt="QR Code" className="qr-image" />
          {!scanSuccess && (
            <button className="qr-scan-btn" onClick={handleScan}>Scan QR Code</button>
          )}
          {scanSuccess && (
            <div className="qr-success-message">
              <p>Quét mã QR thành công!</p>
              <p>Bạn có thể sử dụng khu tự học</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
