document.addEventListener('DOMContentLoaded', function() {
  // Kiểm tra quyền admin
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser || currentUser.email !== 'admin@gmail.com') {
    document.body.innerHTML = '<div style="color:#ef4444;font-weight:600;font-size:1.3rem;text-align:center;margin-top:60px;">Chỉ quản trị viên mới được truy cập trang này!</div>';
    return;
  }

  const container = document.getElementById('admin-booking-container');

  function getAllBookings() {
    const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo') || '{}');
    // Trả về mảng các booking kèm key
    return Object.keys(bookingInfo).map(key => ({...bookingInfo[key], _key: key}));
  }

  function renderBookingList() {
    const bookings = getAllBookings();
    if (!bookings.length) {
      container.innerHTML = '<div style="color:#ef4444;font-weight:600;font-size:1.2rem;">Không có tài khoản nào đang đặt chỗ!</div>';
      return;
    }
    container.innerHTML = `
      <h2 class="admin-booking__title">Danh sách tài khoản đang đặt chỗ</h2>
      <div class="admin-booking__search">
        <input type="text" class="admin-booking__input" placeholder="Tìm kiếm theo tên hoặc email...">
        <select class="admin-booking__select">
          <option value="">Tất cả tầng</option>
          <option value="1">Tầng 1</option>
          <option value="2">Tầng 2</option>
        </select>
      </div>
      <div class="admin-booking__list">
        ${bookings.map((b, idx) => {
          const start = new Date(b.bookingTime);
          const end = new Date(start.getTime() + 4*60*60*1000);
          const format = d => d.toLocaleTimeString('vi-VN') + ' ' + d.toLocaleDateString('vi-VN');
          return `
            <div class="admin-booking__item" data-floor="${b.floor}">
              <div class="admin-booking__info">
                <div><b>Người đặt:</b> ${b.userName} (${b.userId})</div>
                <div><b>Vị trí:</b> Tầng ${b.floor} - Ghế ${b.seat}</div>
                <div><b>Thời gian đặt:</b> ${format(start)}</div>
                <div><b>Hết hạn:</b> ${format(end)}</div>
              </div>
              <button class="admin-booking__btn admin-booking__btn--remove" data-idx="${idx}" data-key="${b._key}"><i class="fa fa-trash"></i> Xóa đặt chỗ</button>
            </div>
          `;
        }).join('')}
      </div>
    `;
    // Gán sự kiện xóa
    document.querySelectorAll('.admin-booking__btn--remove').forEach(btn => {
      btn.onclick = function() {
        const idx = btn.getAttribute('data-idx');
        removeBooking(bookings[idx], idx);
      };
    });
    // Gán sự kiện tìm kiếm và lọc
    const searchInput = document.querySelector('.admin-booking__input');
    const floorSelect = document.querySelector('.admin-booking__select');
    searchInput.addEventListener('input', filterBookings);
    floorSelect.addEventListener('change', filterBookings);
  }

  function filterBookings() {
    const searchInput = document.querySelector('.admin-booking__input');
    const floorSelect = document.querySelector('.admin-booking__select');
    const searchTerm = searchInput.value.toLowerCase();
    const floorFilter = floorSelect.value;
    const items = document.querySelectorAll('.admin-booking__item');
    items.forEach(item => {
      const userName = item.querySelector('.admin-booking__info').textContent.toLowerCase();
      const floor = item.getAttribute('data-floor');
      const matchesSearch = userName.includes(searchTerm);
      const matchesFloor = !floorFilter || floor === floorFilter;
      item.style.display = matchesSearch && matchesFloor ? 'flex' : 'none';
    });
  }

  function removeBooking(booking, idx) {
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
      showMessage(null, 'Đã xóa đặt chỗ thành công!', 'success');
      setTimeout(renderBookingList, 1000);
    }
  }

  renderBookingList();
}); 