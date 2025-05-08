import { useState } from 'react';
import './UserMenu.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    setLoading(true); // bắt đầu loading
    setTimeout(() => {
      // Xóa thông tin người dùng nếu có
      setLoading(false); // dừng loading
      navigate('/'); // điều hướng về trang chính
    }, 2000); // ⏳ chờ 2 giây
  };

  return (
    <div className="user-menu">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className="avatar-name" onClick={() => setOpen(!open)}>
        <img src="/avatar-icon.png" alt="Avatar" className="avatar" />
        <span className="username">Test 123</span>
        <svg
          className={`arrow-icon ${open ? 'rotate' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#999"
          viewBox="0 0 16 16"
        >
          <path fillRule="evenodd" d="M1.646 5.646a.5.5 0 0 1 .708 0L8 11.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
        </svg>
      </div>

      {open && (
        <div className="dropdown">
          <Link to="/profile">My Profile</Link>
          <li onClick={handleLogout} style={{ color: '#007bff', cursor: 'pointer' }}>
            Log Out
          </li>
        </div>
      )}
    </div>
  );
}
