// dashboard/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Controle de Sessão e Segurança
    const usuarioLogadoSessao = sessionStorage.getItem('usuarioLogado');

    if (!usuarioLogadoSessao) {
        window.location.href = '/login/login.html';
        return;
    }

    const usuario = JSON.parse(usuarioLogadoSessao);

    // 2. Injeta o nome do usuário no cabeçalho
    const headerUserName = document.getElementById('headerUserName');
    if (headerUserName && usuario.nome) {
        headerUserName.textContent = `Olá, ${usuario.nome}`;
    }

    // 3. Funcionalidade do Botão Sair (Movido para cima para garantir a execução)
    const btnSair = document.getElementById('btnSair');
    if (btnSair) {
        btnSair.addEventListener('click', (event) => {
            event.preventDefault();
            sessionStorage.removeItem('usuarioLogado');
            window.location.href = '/login/login.html';
        });
    }

    // 4. Renderização Dinâmica dos Cards de Cursos
    const cardsContainer = document.getElementById('cardsContainer');
    
    if (cardsContainer) {
        // Evita quebras se a função listarCursos não existir no escopo global
        if (typeof listarCursos === 'function') {
            const meusCursos = listarCursos(usuario);

            if (meusCursos.length === 0) {
                cardsContainer.innerHTML = `<div class="no-courses">Você não está atuando em nenhum curso no momento.</div>`;
            } else {
                meusCursos.forEach(curso => {
                    const cardHtml = `
                        <div class="course-card">
                            <h3 class="course-title">${curso.nome}</h3>
                            <div class="course-dates">
                                <div class="date-row"><strong>Início:</strong> ${formatarData(curso.dataInicio)}</div>
                                <div class="date-row"><strong>Fim:</strong> ${formatarData(curso.dataFim)}</div>
                            </div>
                        </div>
                    `;
                    cardsContainer.insertAdjacentHTML('beforeend', cardHtml);
                });
            }
        } else {
            console.error("Função listarCursos não foi encontrada. Verifique a importação do script js/cursos.js no HTML.");
        }
    }
});

/**
 * Corrige e converte data padrão ISO (AAAA-MM-DD) para padrão brasileiro (DD/MM/AAAA)
 */
function formatarData(dataString) {
    if (!dataString) return '--/--/----';
    const partes = dataString.split('-');
    if (partes.length !== 3) return dataString;
    // Retorna no formato DD/MM/AAAA corrigindo o bug anterior de duplicação de variáveis
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
