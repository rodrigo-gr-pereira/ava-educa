document.addEventListener('DOMContentLoaded', () => {
    // 1. Controle de Sessão e Segurança
    const usuarioLogadoSessao = sessionStorage.getItem('usuarioLogado');
    const form = document.getElementById('formCadastroAluno');
    const cepInput = document.getElementById('cep');

    if (!usuarioLogadoSessao) {
        window.location.href = '/login/login.html';
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
            sessionStorage.removeItem('usuarioLogado');
            window.location.href = '/login/login.html';
        });
    }


     form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio imediato da página

        // Captura de todos os campos do formulário
        const nomeCompleto = document.getElementById('nomeCompleto').value.trim();
        const genero = document.getElementById('genero').value;
        const dataNascimentoInput = document.getElementById('dataNascimento').value; // Retorna YYYY-MM-DD
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value.trim();
        const cep = document.getElementById('cep').value;
        const logradouro = document.getElementById('logradouro').value.trim();
        const numero = document.getElementById('numero').value;
        const complemento = document.getElementById('complemento').value.trim();
        const bairro = document.getElementById('bairro').value.trim();
        const cidade = document.getElementById('cidade').value.trim();
        const estado = document.getElementById('estado').value.trim();

        // 1. Validação de Preenchimento Obrigatório Geral
        if (!nomeCompleto || !genero || !dataNascimentoInput || !cpf || !telefone || 
            !email || !cep || !logradouro || !numero || !bairro || !cidade || !estado) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // 2. Restrição de Limites para o Nome Completo (Mínimo 4 e Máximo 80)
        if (nomeCompleto.length < 4 || nomeCompleto.length > 80) {
            alert('O Nome Completo deve ter entre 4 e 80 caracteres.');
            return;
        }

        // 3. Validação de Data de Nascimento utilizando Moment.js
        // Cria o objeto moment a partir do input (formato padrão do input date é YYYY-MM-DD)
        const dataNascimento = moment(dataNascimentoInput, 'YYYY-MM-DD');
        const dataMinima = moment('01/01/1900', 'DD/MM/YYYY');
        const dataAtual = moment(); // Data e hora atual (2026)

        // Verifica se a data convertida é válida pelo Moment
        if (!dataNascimento.isValid()) {
            alert('Por favor, insira uma data de nascimento válida.');
            return;
        }

        // A data tem que ser maior que 01/01/1900
        if (!dataNascimento.isAfter(dataMinima)) {
            alert('A data de nascimento precisa ser maior que 01/01/1900.');
            return;
        }

        // A data tem que ser menor que a data atual
        if (!dataNascimento.isBefore(dataAtual, 'day')) {
            alert('A data de nascimento precisa ser menor que a data atual.');
            return;
        }

        // Se precisar exibir ou salvar no formato especificado 'DD/MM/YYYY':
        const dataFormatadaBR = dataNascimento.format('DD/MM/YYYY');
        console.log("Data validada com Moment no padrão BR:", dataFormatadaBR);

        // 4. Sucesso - Todas as condições cumpridas
        alert('Aluno cadastrado com sucesso!');
        form.reset(); // Limpa os campos após o salvamento
    });
});
