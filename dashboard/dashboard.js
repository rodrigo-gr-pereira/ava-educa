document.addEventListener('DOMContentLoaded', () => {
    // 1. Controle de Sessão e Segurança
    const usuarioLogadoSessao = sessionStorage.getItem('usuarioLogado');

    if (!usuarioLogadoSessao) {
        window.location.href = '../login/login.html';
        return;
    }

    const usuario = JSON.parse(usuarioLogadoSessao);

    // 2. Injeta o nome do usuário no cabeçalho
    const headerUserName = document.getElementById('headerUserName');
    if (headerUserName && usuario.nome) {
        headerUserName.textContent = usuario.nome;
    }

    // 3. Funcionalidade do Botão Sair
    const btnSair = document.getElementById('btnSair');
    if (btnSair) {
        btnSair.addEventListener('click', () => {
            // Remove o usuário da sessionStorage
            sessionStorage.removeItem('usuarioLogado');
            
            // Redireciona de volta para a tela de login
            window.location.href = '../login/login.html';
        });
    }
});
