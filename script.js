const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const modal = document.querySelector('#loginModal');
document.querySelector('#loginOpen').addEventListener('click', () => modal.showModal());
document.querySelector('#loginClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });

const toast = document.querySelector('#toast');
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

document.querySelector('#loginForm').addEventListener('submit', event => {
  event.preventDefault();
  const username = new FormData(event.target).get('username');
  localStorage.setItem('lop9a-user', username);
  document.querySelector('#loginStatus').textContent = `Đăng nhập thành công. Xin chào ${username}!`;
  setTimeout(() => { modal.close(); showToast(`Chào mừng ${username} trở lại với 9A!`); }, 700);
});

document.querySelector('#contactForm').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#formStatus').textContent = 'Cảm ơn bạn! Lời nhắn đã được ghi nhận trong bản demo.';
  event.target.reset();
  showToast('Đã gửi lời nhắn thành công!');
});

document.querySelector('#year').textContent = new Date().getFullYear();
