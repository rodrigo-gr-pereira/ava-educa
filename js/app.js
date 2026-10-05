import { verificarAutenticacao, logout } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const user = verificarAutenticacao();
  const userNameEl = document.getElementById('user-name');
  if (userNameEl && user) {
    userNameEl.textContent = user.nome;
  }

  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', logout);
  }
});