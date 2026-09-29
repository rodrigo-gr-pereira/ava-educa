document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogadoSessao = sessionStorage.getItem('usuarioLogado');
    const form = document.getElementById('formCadastroAluno');
    const cepInput = document.getElementById('cep');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const btnSair = document.getElementById('btnSair');

    if (!usuarioLogadoSessao) {
        window.location.href = '/login/login.html';
        return;
    }

    const usuario = JSON.parse(usuarioLogadoSessao);
    const headerUserName = document.getElementById('headerUserName');
    if (headerUserName && usuario.nome) {
      headerUserName.textContent = `Olá, ${usuario.nome}`;
    }

    if (btnSair) {
        btnSair.addEventListener('click', () => {
            sessionStorage.removeItem('usuarioLogado');
            window.location.href = '/login/login.html';
        });
    }

    if (!form) {
        return;
    }

    function mostrarFeedback(mensagem, tipo) {
        if (!feedbackMessage) return;
        feedbackMessage.textContent = mensagem;
        feedbackMessage.className = `feedback-banner ${tipo}`;
        feedbackMessage.style.display = 'block';

        if (tipo === 'success') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                feedbackMessage.style.display = 'none';
            }, 4000);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function limparCamposEndereco() {
        const logradouro = document.getElementById('logradouro');
        const bairro = document.getElementById('bairro');
        const cidade = document.getElementById('cidade');
        const estado = document.getElementById('estado');

        if (logradouro) logradouro.value = '';
        if (bairro) bairro.value = '';
        if (cidade) cidade.value = '';
        if (estado) estado.value = '';
    }

    function buscarEnderecoPeloCep(cepLimpo) {
        const logradouro = document.getElementById('logradouro');
        const bairro = document.getElementById('bairro');
        const cidade = document.getElementById('cidade');
        const estado = document.getElementById('estado');

        if (logradouro) logradouro.value = 'Buscando...';
        if (bairro) bairro.value = 'Buscando...';
        if (cidade) cidade.value = 'Buscando...';
        if (estado) estado.value = 'Buscando...';

        fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
            .then(response => {
                if (!response.ok) throw new Error('Falha na conexão com o servidor ViaCEP.');
                return response.json();
            })
            .then(dados => {
                if (!dados.erro) {
                    if (logradouro) logradouro.value = dados.logradouro || '';
                    if (bairro) bairro.value = dados.bairro || '';
                    if (cidade) cidade.value = dados.localidade || '';
                    if (estado) estado.value = dados.uf || '';

                    const numeroInput = document.getElementById('numero');
                    if (numeroInput) numeroInput.focus();
                } else {
                    limparCamposEndereco();
                    alert('Este CEP não foi encontrado na base de dados.');
                }
            })
            .catch(() => {
                limparCamposEndereco();
                alert('Não foi possível carregar os dados automáticos. Digite o endereço manualmente.');
            });
    }

    if (cepInput) {
        cepInput.addEventListener('input', () => {
            const cep = cepInput.value.replace(/\D/g, '');
            if (cep.length === 8) {
                buscarEnderecoPeloCep(cep);
            }
        });

        cepInput.addEventListener('blur', () => {
            const cep = cepInput.value.replace(/\D/g, '');
            if (cep.length > 0 && cep.length < 8) {
                alert('O CEP deve conter exatamente 8 números.');
                limparCamposEndereco();
            }
        });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nomeCompleto = document.getElementById('nomeCompleto').value.trim();
        const genero = document.getElementById('genero').value;
        const dataNascimentoInput = document.getElementById('dataNascimento').value;
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

        if (!nomeCompleto || !genero || !dataNascimentoInput || !cpf || !telefone || !email || !cep || !logradouro || !numero || !bairro || !cidade || !estado) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (nomeCompleto.length < 4 || nomeCompleto.length > 80) {
            alert('O Nome Completo deve ter entre 4 e 80 caracteres.');
            return;
        }

        const dataNascimento = moment(dataNascimentoInput, 'YYYY-MM-DD');
        const dataMinima = moment('01/01/1900', 'DD/MM/YYYY');
        const dataAtual = moment();

        if (!dataNascimento.isValid() || !dataNascimento.isAfter(dataMinima) || !dataNascimento.isBefore(dataAtual, 'day')) {
            mostrarFeedback('Erro: A data de nascimento informada é inválida ou fora dos limites permitidos.', 'error');
            return;
        }

               // Padrão de data tratado pelo Moment.js
        const dataFormatadaBR = dataNascimento.format('DD/MM/YYYY');

        // CORREÇÃO AQUI: Passando os parâmetros de forma direta e limpa para o construtor
        const novoAluno = new Aluno(
            nomeCompleto, 
            genero, 
            dataFormatadaBR, 
            cpf, 
            telefone, 
            email,
            cep, 
            logradouro, 
            numero, 
            complemento, 
            bairro, 
            cidade, // Corrigido (estava "city = cidade" e causava erro silencioso)
            estado
        );

        // Dispara a função assíncrona baseada em Promise
        cadastrarAluno(novoAluno)
            .then((mensagemSucesso) => {
                mostrarFeedback(`Sucesso! ${mensagemSucesso}`, 'success');
                form.reset(); // Limpa os campos do formulário para o próximo registro
            })
            .catch((mensagemErro) => {
                mostrarFeedback(`Erro: ${mensagemErro}`, 'error');
            });

    });
});
