import './LoginPage.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

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
          <Link to="/" className="logo-wrapper">
            <img src="/logobachkhoa.png" className="logo" alt="BK Logo" />
            <div className="logo-s3mrs">
              <span className="smart-blue">S<sub>3</sub>-</span>
              <span className="smart-dark">MRS</span>
            </div>
          </Link>
          <nav className="menu">
            <button className="menu-btn" onClick={() => navigate('/login')}>Giới thiệu</button>
            <button className="menu-btn" onClick={() => navigate('/login')}>Đặt chỗ</button>
            <button className="menu-btn" onClick={() => navigate('/login')}>Chỗ của tôi</button>
          </nav>
        </div>
        <div className="right-section">
          <Link to="/register"><button className="btn">Đăng ký</button></Link>
          <button className="btn">Đăng nhập</button>
        </div>
      </header>

      {/* Nội dung trang đăng nhập */}
      <main className="login-container">
        <div className="login-form">
          <h1>Đăng nhập</h1>
          <form>
            <label>Email</label>
            <input type="email" placeholder="test123@hcmut.edu.vn" />
            <label>Password</label>
            <div className="password-wrapper" style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className="form-input"
              />
              <img
                src={showPassword ? "/eye-open.png" : "/eye-closed.png"}
                alt="toggle visibility"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer'
                }}
              />
            </div>

            <div className="options">
              <label><input type="checkbox" /> Nhớ mật khẩu</label>
              <a href="#" className="forgot">Quên mật khẩu</a>
            </div>
            {!loggedIn ? (
              <button
                className="btn-login"
                onClick={(e) => {
                  e.preventDefault();
                  setLoggedIn(true); // Hiện thông báo
                  setTimeout(() => {
                    navigate('/home'); // Chuyển trang sau 1.5 giây
                  }, 1500);
                }}
              >
                Đăng nhập
              </button>
            ) : (
              <div className="register-success">🎉 Đăng nhập thành công! Đang chuyển hướng...</div>
            )}
            <p className="register-text">
              Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
            </p>
          </form>
        </div>
        <div className="login-image">
          <img src="/bk-image.png" alt="Bach Khoa" />
        </div>
      </main>
    </>
  );
}
