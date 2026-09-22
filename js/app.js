const currentPath = window.location.pathname;

// Se o usuário abrir a raiz ou o index.html principal, joga para a pasta login
if (currentPath.endsWith('index.html') && !currentPath.includes('/login/') || currentPath === '/') {
    window.location.href = 'login/index.html'; // Entra na pasta login
} 

// Altera a verificação para cobrir o arquivo dentro da pasta login
if (currentPath.includes('/login/')) {
    const loginForm = document.getElementById('loginForm');
    const feedbackErro = document.getElementById('feedbackErro');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = emailInput.value;
            const senha = passwordInput.value;

            feedbackErro.style.display = 'none';
            emailInput.classList.remove('input-error');
            passwordInput.classList.remove('input-error');

            // Função vinda do auth.js
            const usuarioLogado = login(email, senha);

            if (usuarioLogado) {
                sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
                // Redireciona para fora da pasta login e entra na pasta dashboard
                window.location.href = '../dashboard/index.html'; 
            } else {
                feedbackErro.style.display = 'block';
                emailInput.classList.add('input-error');
                passwordInput.classList.add('input-error');
            }
        });
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function (event) {
            event.preventDefault();
            window.alert('Esta funcionalidade está em construção.');
        });
    }
}
