// login/login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const forgotPasswordLink = document.getElementById('forgot-password');

    // 1. Evento de Submit do Formulário (Disparado pelo Botão Entrar se os campos estiverem preenchidos)
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Oculta o erro anterior antes de uma nova tentativa
        errorMessage.classList.add('hidden');

        // Chama a função global definida em auth.js (RF08)
        const usuarioLogado = login(email, password);

        if (usuarioLogado) {
            // Sucesso: Salva na sessionStorage convertido para string JSON
            sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            
            // Redireciona para o Dashboard
            window.location.href = '../dashboard/dashboard.html';
        } else {
            // Falha: Exibe o feedback visual de erro
            errorMessage.classList.remove('hidden');
        }
    });

    // 2. Funcionalidade provisória de "Esqueceu sua senha"
    forgotPasswordLink.addEventListener('click', (event) => {
        event.preventDefault();
        window.alert('Esta funcionalidade está em construção.');
    });
});
