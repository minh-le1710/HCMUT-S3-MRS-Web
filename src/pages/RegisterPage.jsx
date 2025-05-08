import './RegisterPage.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);

  return (
    <>
      <div className="bg-decor">
        <img src="/left-background.png" className="decor-left" alt="left-decor" />
        <img src="/right-background.png" className="decor-right" alt="right-decor" />
      </div>

      <header className="header">
        <div className="left-section">
          <Link to="/" className="logo-wrapper">
            <img src="/logobachkhoa.png" className="logo" />
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
          <Link to="/login"><button className="btn">Đăng nhập</button></Link>
        </div>
      </header>

      <main className="register-container">
        <div className="register-form">
          <h1>Đăng ký</h1>
          <p className="sub-text">Chỉ một thao tác đơn giản, đặt chỗ ngay với HCMUT S3-MRS!!!</p>
          <form>
            <div className="name-fields">
              <div><label>Tên</label><input type="text" /></div>
              <div><label>Họ</label><input type="text" /></div>
            </div>

            <div className="contact-fields">
              <div><label>Email</label><input type="email" /></div>
              <div><label>Phone Number</label><input type="tel" /></div>
            </div>

            <label>Password</label>
            <div className="password-wrapper">
              <input type={showPassword ? 'text' : 'password'} />
              <img
                src={showPassword ? "/eye-open.png" : "/eye-closed.png"}
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon"
              />
            </div>

            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input type={showConfirmPassword ? 'text' : 'password'} />
              <img
                src={showConfirmPassword ? "/eye-open.png" : "/eye-closed.png"}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="eye-icon"
              />
            </div>

            {!registered ? (
              <button
                className="btn-register"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO

                  setRegistered(true);
                  setTimeout(() => {
                    navigate('/login');
                  }, 2000);
                }}
              >
                Tạo tài khoản
              </button>
            ) : (
              <div className="register-success">🎉 Đăng ký thành công! Đang chuyển hướng...</div>
            )}

          </form>
        </div>
        <div className="register-image">
          <img src="/bk-image.png" alt="Bach Khoa" />
        </div>
      </main>
    </>
  );
}
