function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    showMessage(null, 'Đăng nhập thành công!', 'success');
    setTimeout(() => {
      if (user.email === 'admin@gmail.com') {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'index.html';
      }
    }, 1000);
  } else {
    showMessage('email', 'Email hoặc mật khẩu không đúng!', 'error');
  }
} 