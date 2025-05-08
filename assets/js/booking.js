document.addEventListener('DOMContentLoaded', function() {
  // Khởi tạo trạng thái ghế nếu chưa có
  // 0: free, 1: busy, -1: broken
  const defaultSeatsFloor1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  defaultSeatsFloor1[5] = -1; // Ghế số 6 bị hỏng
  defaultSeatsFloor1[15] = -1; // Ghế số 16 bị hỏng
  const defaultSeatsFloor2 = Array(20).fill(0);

  if (!localStorage.getItem('bookingSeatsFloor1')) {
    localStorage.setItem('bookingSeatsFloor1', JSON.stringify(defaultSeatsFloor1));
  }
  if (!localStorage.getItem('bookingSeatsFloor2')) {
    localStorage.setItem('bookingSeatsFloor2', JSON.stringify(defaultSeatsFloor2));
  }
  if (!localStorage.getItem('bookingInfo')) {
    localStorage.setItem('bookingInfo', JSON.stringify({}));
  }

  let currentFloor = 1;
  // Danh sách số ghế thực tế (1-20 mỗi tầng)
  const seatNumbers = Array.from({length: 40}, (_, i) => i + 1);

  function renderSeats() {
    const seats = JSON.parse(localStorage.getItem(`bookingSeatsFloor${currentFloor}`));
    let countFree = 0, countBusy = 0, countBroken = 0;
    const seatsContainer = document.querySelector('.booking__seats');
    if (!seatsContainer) return;
    seatsContainer.innerHTML = '';
    // Render 4 hàng, mỗi hàng 5 ghế
    for (let row = 0; row < 4; row++) {
      const rowDiv = document.createElement('div'); 
      rowDiv.className = 'booking__row';
      for (let col = 0; col < 5; col++) {
        const idx = row * 5 + col;
        const seatIdx = (currentFloor - 1) * 20 + idx;
        if (idx >= 20) break;
        const seatNum = seatNumbers[(currentFloor-1)*20 + idx];
        const seatState = seats[idx];
        let seatClass = '', img = '';
        if (seatState === 0) {
          seatClass = 'booking__seat--free';
          img = '<img src="assets/images/Seat (2).png" alt="Free seat">';
          countFree++;
        } else if (seatState === 1) {
          seatClass = 'booking__seat--busy';
          img = '<img src="assets/images/Seat.png" alt="Busy seat">';
          countBusy++;
        } else {
          seatClass = 'booking__seat--broken';
          img = '<img src="assets/images/Seat (1).png" alt="Broken seat">';
          countBroken++;
        }
        const seatSpan = document.createElement('span');
        seatSpan.className = `booking__seat ${seatClass}`;
        seatSpan.innerHTML = img + `<span class="booking__seat-number">${seatNum}</span>`;
        rowDiv.appendChild(seatSpan);
      }
      seatsContainer.appendChild(rowDiv);
    }
    // Cập nhật số lượng vào legend
    const legend = document.querySelector('.booking__legend');
    if (legend) {
      legend.innerHTML = `
        <div>
            <span class="booking__seat booking__seat--free">
                <img src="assets/images/Seat (2).png" alt="Ghế trống">
                <span class="booking__seat-number">1</span>
            </span>
            Ghế còn trống (<b>${countFree}</b>)
        </div>
        <div>
            <span class="booking__seat booking__seat--busy">
                <img src="assets/images/Seat.png" alt="Ghế có người">
                <span class="booking__seat-number">2</span>
            </span>
            Ghế đang có người ngồi (<b>${countBusy}</b>)
        </div>
        <div>
            <span class="booking__seat booking__seat--broken">
                <img src="assets/images/Seat (1).png" alt="Ghế hỏng">
                <span class="booking__seat-number">3</span>
            </span>
            Ghế đang bảo trì hoặc bị hỏng (<b>${countBroken}</b>)
        </div>
      `;
    }
  }

  // Xử lý chuyển tầng
  document.querySelectorAll('.booking__floor').forEach((btn, idx) => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.booking__floor').forEach(b => b.classList.remove('booking__floor--active'));
      this.classList.add('booking__floor--active');
      currentFloor = idx + 1;
      renderSeats();
    });
  });

  renderSeats();

  // Đặt chỗ
  document.querySelector('.booking__form').onsubmit = function(e) {
    e.preventDefault();
    const seatInput = this.querySelector('.booking__input[placeholder="23"]');
    const timeInput = this.querySelector('.booking__input[placeholder="3 giờ"]');
    const seatNum = parseInt(seatInput.value.trim());
    const time = timeInput.value.trim();
    if (!seatNum || seatNum < 1 || seatNum > 40 || !time) {
      showMsg('Vui lòng kiểm tra lại số ghế và thời gian!');
      return;
    }
    const seats = JSON.parse(localStorage.getItem(`bookingSeatsFloor${currentFloor}`));
    const idx = seatNum - 1 - (currentFloor-1)*20;
    if (idx < 0 || idx >= 20) {
      showMsg('Số ghế không hợp lệ!');
      return;
    }
    if (seats[idx] !== 0) {
      showMsg('Ghế đã được đặt hoặc đang bảo trì!');
      return;
    }
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      showMsg('Vui lòng đăng nhập để đặt chỗ!');
      return;
    }
    // Đặt chỗ
    seats[idx] = 1;
    localStorage.setItem(`bookingSeatsFloor${currentFloor}`, JSON.stringify(seats));
    // Lưu thông tin người đặt cho QR
    const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo'));
    const bookingKey = `F${currentFloor}-S${seatNum}`;
    bookingInfo[bookingKey] = {
      userId: currentUser.email,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      time: time,
      floor: currentFloor,
      seat: seatNum,
      bookingTime: new Date().toISOString()
    };
    localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
    showMsg(`Đặt chỗ thành công! Ghế ${seatNum} tầng ${currentFloor}`,'success');
    renderSeats();
  };

  function showMsg(msg, type='error') {
    let msgBox = document.querySelector('.booking__msg');
    if (!msgBox) {
      msgBox = document.createElement('div');
      msgBox.className = 'booking__msg';
      document.querySelector('.booking__form').parentNode.insertBefore(msgBox, document.querySelector('.booking__form'));
    }
    msgBox.innerHTML = msg;
    msgBox.style.color = type==='success' ? '#22c55e' : '#ef4444';
    msgBox.style.fontWeight = '500';
    msgBox.style.margin = '18px 0 0 0';
    msgBox.style.fontSize = '1.1rem';
    msgBox.style.textAlign = 'left';
  }

  // Sửa phần phòng họp nhóm
  function renderRooms() {
    const rooms = [
      {status: 0, name: 'Phòng 01', desc: ''},
      {status: 1, name: 'Phòng 02', desc: 'Máy lạnh<br>Máy chiếu'},
      {status: -1, name: 'Phòng 03', desc: 'Quạt<br>Bàn đôi'}
    ];
    const roomImgs = {
      0: 'Seat (2).png',
      1: 'Seat.png',
      '-1': 'Seat (1).png'
    };
    const roomsList = document.querySelector('.booking__rooms-list');
    if (roomsList) {
      roomsList.innerHTML = rooms.map(r =>
        `<div class="booking__room">
          <span class="booking__seat"><img src="assets/images/${roomImgs[r.status]}" alt="room"></span> ${r.name}<br><span class="booking__room-desc">${r.desc}</span>
        </div>`
      ).join('');
    }
  }
  renderRooms();
}); 