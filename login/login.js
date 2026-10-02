import { login } from '../js/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('usuarioLogado')) {
    window.location.href = '/dashboard/dashboard.html';
    return;
  }

  const loginCard = document.querySelector('.login-card');
  const formLogin = document.getElementById('form-login');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const erroContainer = document.getElementById('erro-container');
  const linkRecuperarSenha = document.getElementById('link-recuperar-senha');

  if (!loginCard || !formLogin || !emailInput || !senhaInput || !erroContainer) {
    return;
  }

  const limparFeedbackErro = () => {
    emailInput.classList.remove('input-erro');
    senhaInput.classList.remove('input-erro');
    erroContainer.hidden = true;
  };

  emailInput.addEventListener('input', limparFeedbackErro);
  senhaInput.addEventListener('input', limparFeedbackErro);

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    const autenticado = login(email, senha);

    if (autenticado) {
      window.location.href = '/dashboard/dashboard.html';
      return;
    }

    emailInput.classList.add('input-erro');
    senhaInput.classList.add('input-erro');
    erroContainer.textContent = 'E-mail ou senha incorretos.';
    erroContainer.hidden = false;

    loginCard.classList.remove('shake');
    void loginCard.offsetWidth;
    loginCard.classList.add('shake');
  });

  if (linkRecuperarSenha) {
    linkRecuperarSenha.addEventListener('click', (e) => {
      e.preventDefault();
      const emailDigitado = emailInput.value.trim();

      if (emailDigitado) {
        window.alert(`Instruções para recuperação de senha foram enviadas para ${emailDigitado}.`);
        return;
      }

      window.alert('Digite seu e-mail para receber as instruções de recuperação.');
    });
  }
});