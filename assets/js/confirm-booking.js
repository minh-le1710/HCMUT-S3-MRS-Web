// confirm-booking.js

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('confirm-booking-container');

  // Lấy dữ liệu từ query string
  function getBookingData() {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    if (!data) return null;
    try {
      // Giải mã base64 và parse JSON
      const json = decodeURIComponent(atob(data));
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }

  const booking = getBookingData();
  if (!booking) {
    container.innerHTML = '<div style="color:#ef4444;font-weight:600;font-size:1.2rem;">Không tìm thấy thông tin đặt chỗ!</div>';
    return;
  }

  // Hiển thị thông tin và nút xác nhận
  function renderView(confirmed = false) {
    if (confirmed) {
      // Xóa dữ liệu booking khỏi localStorage nếu có
      try {
        const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo') || '{}');
        // Tìm key phù hợp
        let foundKey = null;
        for (const key in bookingInfo) {
          if (
            bookingInfo[key].userId === booking.email &&
            bookingInfo[key].seat == booking.seat &&
            bookingInfo[key].floor == booking.floor
          ) {
            foundKey = key;
            break;
          }
        }
        if (foundKey) {
          delete bookingInfo[foundKey];
          localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
          // Cập nhật trạng thái ghế về trống
          const seats = JSON.parse(localStorage.getItem(`bookingSeatsFloor${booking.floor}`));
          seats[booking.seat-1] = 0;
          localStorage.setItem(`bookingSeatsFloor${booking.floor}`, JSON.stringify(seats));
        }
      } catch (e) {}
      container.innerHTML = `<div style="color:#22c55e;font-size:1.5rem;text-align:center;margin-top:60px;font-weight:600;">\u2714 Quét mã QR thành công!<br>Bạn có thể sử dụng khu tự học</div>`;
      return;
    }
    const start = new Date(booking.bookingTime);
    const end = new Date(start.getTime() + 4*60*60*1000);
    const format = d => d.toLocaleTimeString('vi-VN') + ' ' + d.toLocaleDateString('vi-VN');
    container.innerHTML = `
      <h2 class="confirm-booking__heading">Xác nhận sử dụng chỗ</h2>
      <div class="confirm-booking__info">
        <div><b>Vị trí:</b> Tầng ${booking.floor} - Ghế ${booking.seat}</div>
        <div><b>Người đặt:</b> ${booking.user} (${booking.email})</div>
        <div><b>Thời gian đặt:</b> ${format(start)}</div>
        <div><b>Hết hạn:</b> ${format(end)}</div>
      </div>
      <button class="confirm-booking__btn" id="confirm-btn">Xác nhận sử dụng</button>
    `;
    document.getElementById('confirm-btn').onclick = function() {
      renderView(true);
    };
  }

  renderView();
}); 