import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomeAfterLogin from './pages/HomeAfterLogin';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import BookingPage from './pages/BookingPage';
import MySeatPage from './pages/MySeatPage';
import QRCodePage from './pages/QRCodePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomeAfterLogin />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/myseat" element={<MySeatPage />} />
      <Route path="/qr" element={<QRCodePage />} />
    </Routes>
  );
}

export default App;
