import './MySeatPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UserMenu from '../components/UserMenu';

export default function MySeatPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState('H1-1: Ghế 23');
  const seats = ['H1-1: Ghế 23', 'H1-2: Ghế 1'];
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectSeat = (seat) => {
    setSelectedSeat(seat);
    setIsDropdownOpen(false);
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
            <button className="menu-btn" onClick={() => window.location.href = '/about'}>Giới thiệu</button>
            <button className="menu-btn" onClick={() => window.location.href = '/booking'}>Đặt chỗ</button>
            <button className="menu-btn" onClick={() => window.location.href = '/myseat'}>Chỗ của tôi</button>
            <button className="menu-btn" onClick={() => navigate('/qr')}>Quét QR</button>
          </nav>
        </div>
        <div className="right-sections">
          <UserMenu />
        </div>
      </header>

      <main className="myseat-container">
        <div className="seat-dropdown">
          <span className="dropdown-toggle" onClick={toggleDropdown}>
            <span className={`custom-arrow ${isDropdownOpen ? 'open' : ''}`}></span>
            Chỗ của tôi
          </span>
          {isDropdownOpen && (
            <div className="seat-options">
              {seats.map((seat, index) => (
                <div
                  key={index}
                  className={`seat-option ${selectedSeat === seat ? 'active' : ''}`}
                  onClick={() => handleSelectSeat(seat)}
                >
                  {seat}
                </div>
              ))}
            </div>
          )}
        </div>

        <h1 className="title">Thông tin Đặt chỗ</h1>

        <div className="booking-info">
          <p><strong>Vị trí đặt chỗ:</strong> H1 - Tầng 1 - Ghế 23</p>
          <p><strong>Đặt chỗ vào lúc:</strong> 09:02:03 12/03/2024</p>
          <p><strong>(Ghế sẽ hết hạn vào lúc:</strong> 12:59:59 12/03/2024)</p>
        </div>

        <div className="notice">
          <p>Quét mã QR để sử dụng khu tự học</p>
          <p>Vui lòng thông báo với nhân viên thư viện hoặc nhấn vào “Hủy đặt chỗ”</p>
          <p>nếu bạn không còn nhu cầu sử dụng khu tự học!</p>
        </div>

        {!cancelSuccess && (
          <div className="action-buttons">
            <button className="menu-btn" onClick={() => navigate('/qr')}>Quét QR</button>
            <button className="btn-cancel" onClick={() => setCancelSuccess(true)}>
              Hủy đặt chỗ
            </button>
          </div>
        )}

        {cancelSuccess && (
          <p className="cancel-message">Hủy đặt chỗ thành công</p>
        )}
      </main>
    </>
  );
}
