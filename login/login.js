document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const errorMessage = document.getElementById('errorMessage');
    const linkEsqueceuSenha = document.getElementById('linkEsqueceuSenha');

    // Manipula o envio do formulário de login
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita o recarregamento da página

        const email = emailInput.value.trim();
        const senha = senhaInput.value;

        // O HTML 'required' já garante o preenchimento, mas a chamada inicia aqui
        const usuarioLogado = login(email, senha);

        if (usuarioLogado) {
            // Oculta mensagem de erro caso estivesse visível
            errorMessage.classList.add('hidden');
            
            // Salva os dados do usuário na sessionStorage como string JSON
            sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            
            // Redireciona para a página de Dashboard
            window.location.href = '../dashboard/dashboard.html';
        } else {
            // Exibe o feedback visual de dados inválidos
            errorMessage.classList.remove('hidden');
        }
    });

    // Alerta para a funcionalidade em construção de "Esqueceu sua senha"
    linkEsqueceuSenha.addEventListener('click', (event) => {
        event.preventDefault();
        window.alert("Esta funcionalidade está em construção.");
    });
});
