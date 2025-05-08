import React, { useState } from 'react';
import './BookingPage.css';
import { Link, useNavigate } from 'react-router-dom';
import UserMenu from '../components/UserMenu';

const seatData = {
  'H1 - Tầng 1': [
    { id: 1, status: 'occupied' }, { id: 2, status: 'occupied' }, { id: 3, status: 'occupied' }, { id: 4, status: 'available' },
    { id: 5, status: 'available' }, { id: 6, status: 'available' }, { id: 7, status: 'occupied' }, { id: 8, status: 'occupied' },
    { id: 11, status: 'maintenance' }, { id: 12, status: 'occupied' }, { id: 13, status: 'maintenance' }, { id: 14, status: 'occupied' },
    { id: 15, status: 'occupied' }, { id: 16, status: 'occupied' }, { id: 17, status: 'maintenance' }, { id: 18, status: 'occupied' },
    { id: 19, status: 'occupied' },
    { id: 21, status: 'available' }, { id: 22, status: 'occupied' }, { id: 23, status: 'available' }, { id: 24, status: 'available' },
    { id: 25, status: 'available' }, { id: 26, status: 'available' }, { id: 27, status: 'available' }, { id: 28, status: 'occupied' },
    { id: 30, status: 'available' }, { id: 31, status: 'occupied' }, { id: 32, status: 'occupied' }, { id: 33, status: 'occupied' },
    { id: 34, status: 'occupied' }, { id: 35, status: 'available' }, { id: 36, status: 'available' },
  ],
  'H1 - Tầng 2': [
    { id: 1, status: 'available' }, { id: 2, status: 'available' }, { id: 3, status: 'occupied' }, { id: 4, status: 'available' },
    { id: 5, status: 'available' }, { id: 6, status: 'occupied' }, { id: 7, status: 'occupied' }, { id: 8, status: 'occupied' },
    { id: 11, status: 'available' }, { id: 12, status: 'occupied' }, { id: 13, status: 'available' }, { id: 14, status: 'occupied' },
    { id: 15, status: 'occupied' }, { id: 16, status: 'occupied' }, { id: 17, status: 'available' }, { id: 18, status: 'occupied' },
    { id: 19, status: 'occupied' },
    { id: 21, status: 'available' }, { id: 22, status: 'available' }, { id: 23, status: 'occupied' }, { id: 24, status: 'available' },
    { id: 25, status: 'available' }, { id: 26, status: 'maintenance' }, { id: 27, status: 'available' }, { id: 28, status: 'occupied' },
    { id: 30, status: 'available' }, { id: 31, status: 'occupied' }, { id: 32, status: 'occupied' }, { id: 33, status: 'occupied' },
    { id: 34, status: 'occupied' }, { id: 35, status: 'maintenance' }, { id: 36, status: 'occupied' },
  ]
};


export default function BookingPage() {
  const navigate = useNavigate();
  const [showFloors, setShowFloors] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState('H1 - Tầng 1');
  const [selectedSeat, setSelectedSeat] = useState('');
  const [bookingDuration, setBookingDuration] = useState('');
  const [bookingResult, setBookingResult] = useState(null);
  const [bookingTime, setBookingTime] = useState('');

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

      <div className="booking-container">
        <div className="floor-section">
          <div className="section-header" onClick={() => setShowFloors(!showFloors)}>
            <span className="dropdown-arrow">{showFloors ? '▲' : '▼'}</span>
            <h2>Chọn khu tự học</h2>
          </div>

          {showFloors && (
            <div className="floor-selector">
              <button
                className={selectedFloor === 'H1 - Tầng 1' ? 'active' : ''}
                onClick={() => setSelectedFloor('H1 - Tầng 1')}
              >
                H1 - Tầng 1
              </button>
              <button
                className={selectedFloor === 'H1 - Tầng 2' ? 'active' : ''}
                onClick={() => setSelectedFloor('H1 - Tầng 2')}
              >
                H1 - Tầng 2
              </button>
            </div>
          )}
        </div>

        <div className="booking-body">
          <div className="seat-map">
            {seatData[selectedFloor].map(seat => (
              <div key={seat.id} className={`seat ${seat.status}`}>
                {seat.id}
              </div>
            ))}
          </div>

          <div className="legend-form-container">
            <div className="legend">
              <p><span className="seat available"></span> Ghế còn trống</p>
              <p><span className="seat occupied"></span> Ghế đang có người ngồi</p>
              <p><span className="seat maintenance"></span> Ghế đang bảo trì hoặc bị hỏng</p>
            </div>
            {bookingResult === 'success' && (
              <div className="booking-result success">
                <p>Đặt chỗ thành công!</p>
                <p>Ghế của bạn là: {selectedFloor} - Ghế {selectedSeat}</p>
                <p>Thời điểm thuê: {bookingTime ? new Date(bookingTime).toLocaleString() : 'Chưa chọn'}</p>
                <p>Thời gian thuê: {bookingDuration} giờ</p>
              </div>
            )}

            {bookingResult === 'fail' && (
              <div className="booking-result fail">
                <p>Đặt chỗ thất bại</p>
                <p>Vui lòng kiểm tra lại</p>
              </div>
            )}

            <div className="booking-form">
              <input
                type="text"
                placeholder="Chọn ghế"
                value={selectedSeat}
                onChange={(e) => setSelectedSeat(e.target.value)}
              />
              <input
                type="datetime-local"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                placeholder="Thời điểm thuê"
              />
              <input
                type="text"
                placeholder="Thời gian thuê (giờ)"
                value={bookingDuration}
                onChange={(e) => setBookingDuration(e.target.value)}
              />
              <button
                onClick={() => {
                  const seatId = parseInt(selectedSeat);
                  const seatList = seatData[selectedFloor];
                  const foundSeat = seatList.find(seat => seat.id === seatId);

                  if (foundSeat && foundSeat.status === 'available') {
                    setBookingResult('success');
                  } else {
                    setBookingResult('fail');
                  }
                }}
              >
                Chọn
              </button>
            </div>


          </div>
        </div>

        <div className="room-group-title">Phòng họp nhóm:</div>
        <div className="room-group-container">
          <div className="room-block">
            <div className="room-seats">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="room-seat available"></div>
              ))}
            </div>
            <div className="room-label">Phòng 01</div>
          </div>

          <div className="room-block">
            <div className="room-seats">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="room-seat occupied"></div>
              ))}
            </div>
            <div className="room-label">Phòng 02<br />Máy lạnh<br />Máy chiếu</div>
          </div>

          <div className="room-block">
            <div className="room-seats">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="room-seat maintenance"></div>
              ))}
            </div>
            <div className="room-label">Phòng 03<br />Quạt<br />Bàn đôi</div>
          </div>
        </div>
      </div>
    </>
  );
}