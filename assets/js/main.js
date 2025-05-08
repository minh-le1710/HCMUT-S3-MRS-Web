document.addEventListener('DOMContentLoaded', function() {
  var loginBtn = document.getElementById('header-login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      window.location.href = 'login.html';
    });
  }
  var registerBtn = document.getElementById('header-register-btn');
  if (registerBtn) {
    registerBtn.addEventListener('click', function() {
      window.location.href = 'register.html';
    });
  }
  // Nav Giới thiệu
  var navAbouts = document.querySelectorAll('.nav__item');
  navAbouts.forEach(function(btn) {
    if (btn.textContent.trim() === 'Giới thiệu') {
      btn.addEventListener('click', function() {
        window.location.href = 'about.html';
      });
    }
    // Nav Đặt chỗ
    if (btn.textContent.trim() === 'Đặt chỗ') {
      btn.addEventListener('click', function() {
        window.location.href = 'booking.html';
      });
    }
    // Nav Chỗ của tôi
    if (btn.textContent.trim() === 'Chỗ của tôi') {
      btn.addEventListener('click', function() {
        window.location.href = 'my-bookings.html';
      });
    }
  });
});

// ========== THÔNG BÁO ĐẸP ========== //
// Toast Message Functionality
// Toast Message Functionality
function showMessage(formOrMsg, msg, type = 'error') {
  let msgBox = document.querySelector('.toast-message');
  if (!msgBox) {
    msgBox = document.createElement('div');
    msgBox.className = 'toast-message';
    document.body.appendChild(msgBox);
  }

  // Reset classes and styles
  msgBox.classList.remove('toast-message--visible', 'toast-message--success', 'toast-message--error');
  msgBox.style.display = 'flex';

  // Set content and type
  const icon = type === 'success' 
    ? '<span class="toast-icon toast-icon--success">✓</span>' 
    : '<span class="toast-icon toast-icon--error">⚠</span>';
  msgBox.innerHTML = `${icon}<span>${msg}</span>`;
  msgBox.className = `toast-message toast-message--${type}`;

  // Trigger animation
  setTimeout(() => {
    msgBox.classList.add('toast-message--visible');
  }, 10);

  // Auto-hide after 3 seconds
  setTimeout(() => {
    msgBox.classList.remove('toast-message--visible');
  }, 3000);

  setTimeout(() => {
    msgBox.style.display = 'none';
  }, 3300);
}

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}
function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
}
function clearCurrentUser() {
  localStorage.removeItem('currentUser');
}

// Đăng ký
if (document.querySelector('.register__form')) {
  document.querySelector('.register__form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const firstName = form.querySelector('#firstName').value.trim();
    const lastName = form.querySelector('#lastName').value.trim();
    const email = form.querySelector('#email').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const password = form.querySelector('#password').value;
    const confirmPassword = form.querySelector('#confirmPassword').value;
    // Validate
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      showMessage(form, 'Vui lòng điền đầy đủ thông tin!'); return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      showMessage(form, 'Email không hợp lệ!'); return;
    }
    if (!/^\d{9,11}$/.test(phone)) {
      showMessage(form, 'Số điện thoại không hợp lệ!'); return;
    }
    if (password.length < 6) {
      showMessage(form, 'Mật khẩu phải từ 6 ký tự!'); return;
    }
    if (password !== confirmPassword) {
      showMessage(form, 'Mật khẩu xác nhận không khớp!'); return;
    }
    let users = getUsers();
    if (users.some(u => u.email === email)) {
      showMessage(form, 'Email đã được đăng ký!'); return;
    }
    const newUser = { firstName, lastName, email, phone, password };
    users.push(newUser);
    setUsers(users);
    showMessage(form, 'Đăng ký thành công! Chuyển sang trang đăng nhập...', 'success');
    setTimeout(() => { window.location.href = 'login.html'; }, 1200);
  });
}

// ========== ĐĂNG NHẬP ========== //
if (document.querySelector('.login__form')) {
  document.querySelector('.login__form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const email = form.querySelector('#email').value.trim();
    const password = form.querySelector('#password').value;
    if (!email || !password) {
      showMessage(form, 'Vui lòng nhập email và mật khẩu!'); return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      showMessage(form, 'Email không hợp lệ!'); return;
    }
    let users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      showMessage(form, 'Email hoặc mật khẩu không đúng!'); return;
    }
    setCurrentUser(user);
    showMessage(form, 'Đăng nhập thành công! Chuyển về trang chủ...', 'success');
    setTimeout(() => {
      if (user.email === 'admin@gmail.com') {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'index.html';
      }
    }, 1200);
  });
}

// ========== NAVBAR & DROPDOWN ========== //
function bindUserMenuDropdown() {
  const userMenu = document.getElementById('user-menu');
  if (userMenu) {
    const dropdown = userMenu.querySelector('.user-menu__dropdown');
    userMenu.onclick = function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    };
    document.addEventListener('click', function() {
      dropdown.classList.remove('show');
    });
    // My Profile
    const profileBtn = dropdown.querySelector('.user-menu__profile');
    if (profileBtn) profileBtn.onclick = function(e) {
      e.stopPropagation();
      window.location.href = 'profile.html';
    };
    // Logout
    const logoutBtn = dropdown.querySelector('.user-menu__logout');
    if (logoutBtn) logoutBtn.onclick = function(e) {
      e.stopPropagation();
      clearCurrentUser();
      window.location.href = 'index.html';
    };
  }
}

function updateNavbarForLogin() {
  const user = getCurrentUser();
  const nav = document.querySelector('.nav');
  const auth = document.querySelector('.auth');
  if (user && nav && auth) {
    // Thêm nav__item Quét QR nếu chưa có
    if (!nav.querySelector('.nav__item--qr')) {
      const qrBtn = document.createElement('button');
      qrBtn.className = 'nav__item nav__item--qr';
      qrBtn.textContent = 'Quét QR';
      nav.appendChild(qrBtn);
    }
    // Thay auth thành user dropdown
    auth.innerHTML = `
      <div class="user-menu" id="user-menu">
        <span class="user-menu__name">${user.firstName} ${user.lastName} <i class="fa fa-chevron-down"></i></span>
        <div class="user-menu__dropdown">
          <div class="user-menu__profile">My Profile</div>
          <div class="user-menu__logout" id="logout-btn">Log Out</div>
        </div>
      </div>
    `;
    bindUserMenuDropdown();
  }
}

// Luôn update navbar nếu có user và có .auth (mọi trang)
document.addEventListener('DOMContentLoaded', function() {
  if (getCurrentUser() && document.querySelector('.auth')) {
    updateNavbarForLogin();
  }
});

// ========== STYLE DROPDOWN & TOAST ========== //
const style = document.createElement('style');
style.innerHTML = `
.user-menu { position: relative; display: inline-block; cursor: pointer; }
.user-menu__name { color: #888; font-size: 1.15rem; font-weight: 600; padding: 8px 18px; border-radius: 18px; background: #fff; transition: background 0.2s; }
.user-menu__name:hover { background: #f2f7fb; }
.user-menu__dropdown { display: none; position: absolute; right: 0; top: 120%; background: #fff; min-width: 160px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border-radius: 10px; z-index: 100; padding: 16px 0; }
.user-menu__dropdown.show { display: block; }
.user-menu__profile, .user-menu__logout { padding: 10px 24px; font-size: 1rem; color: #222; cursor: pointer; }
.user-menu__profile:hover { background: #f2f7fb; }
.user-menu__logout { color: #1da1f2; font-weight: 600; }
.user-menu__logout:hover { background: #f2f7fb; color: #ff4d4f; }
.toast-message { position: fixed; left: 50%; bottom: 40px; transform: translateX(-50%); min-width: 220px; max-width: 90vw; padding: 16px 32px; border-radius: 8px; font-size: 1.1rem; font-weight: 600; text-align: center; z-index: 9999; box-shadow: 0 2px 8px rgba(0,0,0,0.08); opacity: 0; transition: opacity 0.4s; pointer-events: none; }
`;
document.head.appendChild(style);

// ========== CHUYỂN TRANG HEADER ========== //
document.addEventListener('DOMContentLoaded', function() {
  // Gán sự kiện cho tất cả nút Đăng nhập trên header
  var loginBtns = document.querySelectorAll('#header-login-btn');
  loginBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      window.location.href = 'login.html';
    });
  });

  // Gán sự kiện cho tất cả nút Đăng ký trên header
  var registerBtns = document.querySelectorAll('#header-register-btn');
  registerBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      window.location.href = 'register.html';
    });
  });
});

// Đảm bảo dropdown user-menu hoạt động ở mọi trang
if (document.getElementById('user-menu')) {
  bindUserMenuDropdown();
} 