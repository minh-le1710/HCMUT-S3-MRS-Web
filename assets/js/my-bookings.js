document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('my-booking-container');
  const qrPopup = document.getElementById('qr-popup');
  const qrCanvas = document.getElementById('qr-canvas');
  const closeQrBtn = document.getElementById('close-qr-btn');

  // Lấy user hiện tại
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) {
    container.innerHTML = '<div style="color:#ef4444;font-weight:600;font-size:1.2rem;">Vui lòng đăng nhập để xem chỗ của bạn!</div>';
    return;
  }

  // Tìm tất cả chỗ đã đặt của user
  function getMyBookings() {
    const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo') || '{}');
    const myBookings = [];
    for (const key in bookingInfo) {
      if (bookingInfo[key].userId === user.email) {
        myBookings.push({ ...bookingInfo[key], _key: key });
      }
    }
    return myBookings;
  }

  function renderBookingList() {
    const myBookings = getMyBookings();
    if (!myBookings.length) {
      container.innerHTML = '<div style="color:#ef4444;font-weight:600;font-size:1.2rem;">Bạn chưa có chỗ nào được đặt!</div>';
      return;
    }
    container.innerHTML = myBookings.map((b, idx) => {
      const start = new Date(b.bookingTime);
      const end = new Date(start.getTime() + 4*60*60*1000);
      const format = d => d.toLocaleTimeString('vi-VN') + ' ' + d.toLocaleDateString('vi-VN');
      return `
        <div class="my-booking__container" style="margin-bottom:32px;">
          <div class="my-booking__title"><b>Chỗ của tôi</b><br><span class="my-booking__badge">Tầng ${b.floor} Ghế ${b.seat}</span></div>
          <h2 class="my-booking__heading">Thông tin Đặt chỗ</h2>
          <div class="my-booking__info">
            <div>Vị trí đặt chỗ: Tầng ${b.floor} - Ghế ${b.seat}</div>
            <div>Đặt chỗ vào lúc: ${format(start)}</div>
            <div>(Ghế sẽ hết hạn vào lúc ${format(end)})</div>
          </div>
          <div class="my-booking__desc">
            Quét mã QR để sử dụng khu tự học<br>
            Vui lòng thông báo với nhân viên thư viện hoặc nhấn vào "Hủy đặt chỗ"<br>
            nếu bạn không còn nhu cầu sử dụng khu tự học!
          </div>
          <div class="my-booking__actions">
            <button class="my-booking__btn my-booking__btn--qr" data-idx="${idx}" data-key="${b._key}">Quét QR</button>
            <button class="my-booking__btn my-booking__btn--cancel" data-idx="${idx}" data-key="${b._key}">Hủy đặt chỗ</button>
          </div>
          <div class="my-booking__msg" id="my-booking-msg-${idx}"></div>
        </div>
      `;
    }).join('');
    // Gán sự kiện cho các nút
    document.querySelectorAll('.my-booking__btn--qr').forEach(btn => {
      btn.onclick = function() {
        const idx = btn.getAttribute('data-idx');
        showQrPopup(myBookings[idx]);
      };
    });
    document.querySelectorAll('.my-booking__btn--cancel').forEach(btn => {
      btn.onclick = function() {
        const idx = btn.getAttribute('data-idx');
        cancelBooking(myBookings[idx], idx);
      };
    });
  }

  function showQrPopup(booking) {
    qrPopup.style.display = 'flex';
    // Encode dữ liệu booking thành base64 và URI
    const bookingData = {
      user: booking.userName,
      email: booking.userId,
      seat: booking.seat,
      floor: booking.floor,
      time: booking.time,
      bookingTime: booking.bookingTime
    };
    const json = JSON.stringify(bookingData);
    const base64 = btoa(encodeURIComponent(json));
    const url = `${window.location.origin}/confirm-booking.html?data=${base64}`;
    // Tạo mã QR là link tới trang xác nhận
    const qr = new QRious({
      element: qrCanvas,
      size: 220,
      value: url
    });
  }
  closeQrBtn.onclick = function() {
    qrPopup.style.display = 'none';
  };

  function cancelBooking(booking, idx) {
    // Xóa booking khỏi localStorage
    const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo') || '{}');
    if (booking._key && bookingInfo[booking._key]) {
      delete bookingInfo[booking._key];
      localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
      // Cập nhật trạng thái ghế về trống
      const floor = booking.floor;
      const seat = booking.seat;
      const seats = JSON.parse(localStorage.getItem(`bookingSeatsFloor${floor}`));
      seats[seat-1] = 0;
      localStorage.setItem(`bookingSeatsFloor${floor}`, JSON.stringify(seats));
      // Hiện thông báo thành công
      document.getElementById(`my-booking-msg-${idx}`).innerHTML = '<span style="color:#ef4444;">Hủy đặt chỗ thành công</span>';
      setTimeout(renderBookingList, 1200);
    }
  }

  renderBookingList();
}); 