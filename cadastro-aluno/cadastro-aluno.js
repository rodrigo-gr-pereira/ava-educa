import { verificarAutenticacao } from '../js/auth.js';
import { salvarAluno } from '../js/alunos.js';
import { Aluno } from '../js/Aluno.js';

document.addEventListener('DOMContentLoaded', () => {
  const usuario = verificarAutenticacao();

  if (!usuario) {
    return;
  }

  const userNameEl = document.getElementById('user-name');
  if (userNameEl) {
    userNameEl.textContent = usuario.nome;
  }

  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      sessionStorage.removeItem('usuarioLogado');
      window.location.href = '/login/login.html';
    });
  }

  const limparErros = () => {
    document.querySelectorAll('.error-msg').forEach(el => {
      el.textContent = '';
    });
    document.querySelectorAll('input, select').forEach(el => {
      el.classList.remove('input-error');
    });
  };

  const setError = (campoId, mensagem) => {
    const input = document.getElementById(campoId);
    const errorEl = document.getElementById(`err-${campoId}`);
    if (input) input.classList.add('input-error');
    if (errorEl) errorEl.textContent = mensagem;
  };

  const formatarDataInput = (valor) => {
    const digits = valor.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };

  const validarDataNascimento = (dataStr) => {
    const data = moment(dataStr, 'DD/MM/YYYY', true);
    if (!data.isValid()) {
      setError('dataNascimento', 'Data inválida. Use o formato DD/MM/YYYY.');
      return false;
    }

    const dataMinima = moment('01/01/1900', 'DD/MM/YYYY');
    const dataAtual = moment().startOf('day');

    if (!data.isAfter(dataMinima)) {
      setError('dataNascimento', 'A data deve ser maior que 01/01/1900.');
      return false;
    }

    if (!data.isBefore(dataAtual)) {
      setError('dataNascimento', 'A data deve ser menor que a data atual.');
      return false;
    }

    return true;
  };

  const setupInputMasks = () => {
    const numericFields = ['cpf', 'telefone', 'cep', 'numero'];
    numericFields.forEach(fieldId => {
      const input = document.getElementById(fieldId);
      if (input) {
        input.addEventListener('input', (event) => {
          event.target.value = event.target.value.replace(/\D/g, '');
        });
      }
    });

    const dataNascimentoInput = document.getElementById('dataNascimento');
    if (dataNascimentoInput) {
      dataNascimentoInput.addEventListener('input', (event) => {
        event.target.value = formatarDataInput(event.target.value);
      });
    }

    const estadoInput = document.getElementById('estado');
    if (estadoInput) {
      estadoInput.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase();
      });
    }
  };

  const validarFormulario = () => {
    limparErros();
    let valido = true;

    const nome = document.getElementById('nome').value.trim();
    if (!nome) {
      setError('nome', 'O nome completo é obrigatório.');
      valido = false;
    } else if (nome.length < 4 || nome.length > 80) {
      setError('nome', 'O nome deve conter entre 4 e 80 caracteres.');
      valido = false;
    }

    const genero = document.getElementById('genero').value;
    if (!genero) {
      setError('genero', 'Selecione um gênero.');
      valido = false;
    }

    const dataNascimento = document.getElementById('dataNascimento').value.trim();
    if (!dataNascimento) {
      setError('dataNascimento', 'A data de nascimento é obrigatória.');
      valido = false;
    } else if (!validarDataNascimento(dataNascimento)) {
      valido = false;
    }

    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    if (!cpf) {
      setError('cpf', 'O CPF é obrigatório.');
      valido = false;
    } else if (!/^\d{11}$/.test(cpf)) {
      setError('cpf', 'O CPF deve conter 11 números.');
      valido = false;
    }

    const telefone = document.getElementById('telefone').value.replace(/\D/g, '');
    if (!telefone) {
      setError('telefone', 'O telefone é obrigatório.');
      valido = false;
    } else if (!/^\d{8,11}$/.test(telefone)) {
      setError('telefone', 'Informe um telefone válido.');
      valido = false;
    }

    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('email', 'O e-mail é obrigatório.');
      valido = false;
    } else if (!emailRegex.test(email)) {
      setError('email', 'Informe um e-mail válido.');
      valido = false;
    }

    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (!cep) {
      setError('cep', 'O CEP é obrigatório.');
      valido = false;
    } else if (!/^\d{8}$/.test(cep)) {
      setError('cep', 'O CEP deve conter 8 números.');
      valido = false;
    }

    const logradouro = document.getElementById('logradouro').value.trim();
    if (!logradouro) {
      setError('logradouro', 'O logradouro é obrigatório.');
      valido = false;
    }

    const numero = document.getElementById('numero').value.trim();
    if (!numero) {
      setError('numero', 'O número é obrigatório.');
      valido = false;
    } else if (!/^\d+$/.test(numero)) {
      setError('numero', 'Use somente números no campo número.');
      valido = false;
    }

    const bairro = document.getElementById('bairro').value.trim();
    if (!bairro) {
      setError('bairro', 'O bairro é obrigatório.');
      valido = false;
    }

    const cidade = document.getElementById('cidade').value.trim();
    if (!cidade) {
      setError('cidade', 'A cidade é obrigatória.');
      valido = false;
    }

    const estado = document.getElementById('estado').value.trim();
    if (!estado) {
      setError('estado', 'O estado é obrigatório.');
      valido = false;
    } else if (!/^[A-Za-z]{2}$/.test(estado)) {
      setError('estado', 'Informe a UF com 2 letras.');
      valido = false;
    }

    return valido;
  };

  const cepInput = document.getElementById('cep');
  const logradouroInput = document.getElementById('logradouro');
  const bairroInput = document.getElementById('bairro');
  const cidadeInput = document.getElementById('cidade');
  const estadoInput = document.getElementById('estado');

  if (cepInput) {
    cepInput.addEventListener('input', async (event) => {
      const cep = event.target.value.replace(/\D/g, '').slice(0, 8);
      event.target.value = cep.length > 5 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep;

      if (cep.length !== 8) {
        if (logradouroInput) logradouroInput.value = '';
        if (bairroInput) bairroInput.value = '';
        if (cidadeInput) cidadeInput.value = '';
        if (estadoInput) estadoInput.value = '';
        return;
      }

      const cepErrorEl = document.getElementById('err-cep');
      if (cepErrorEl) {
        cepErrorEl.textContent = 'Buscando endereço...';
      }

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await response.json();

        if (dados.erro) {
          if (logradouroInput) logradouroInput.value = '';
          if (bairroInput) bairroInput.value = '';
          if (cidadeInput) cidadeInput.value = '';
          if (estadoInput) estadoInput.value = '';
          if (cepErrorEl) cepErrorEl.textContent = 'CEP não encontrado.';
          return;
        }

        if (logradouroInput) logradouroInput.value = dados.logradouro || '';
        if (bairroInput) bairroInput.value = dados.bairro || '';
        if (cidadeInput) cidadeInput.value = dados.localidade || '';
        if (estadoInput) estadoInput.value = dados.uf || '';

        if (cepErrorEl) cepErrorEl.textContent = '';
        const numeroInput = document.getElementById('numero');
        if (numeroInput) numeroInput.focus();
      } catch (error) {
        if (logradouroInput) logradouroInput.value = '';
        if (bairroInput) bairroInput.value = '';
        if (cidadeInput) cidadeInput.value = '';
        if (estadoInput) estadoInput.value = '';
        if (cepErrorEl) cepErrorEl.textContent = 'Erro ao buscar o CEP. Tente novamente.';
      }
    });
  }

  setupInputMasks();

  const formCadastro = document.getElementById('form-cadastro-aluno');

  if (!formCadastro) {
    return;
  }

  formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const novoAluno = new Aluno(
      Date.now(),
      document.getElementById('nome').value.trim(),
      document.getElementById('email').value.trim(),
      'Não informado'
    );

    novoAluno.genero = document.getElementById('genero').value;
    novoAluno.dataNascimento = document.getElementById('dataNascimento').value.trim();
    novoAluno.cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    novoAluno.telefone = document.getElementById('telefone').value.replace(/\D/g, '');
    novoAluno.endereco = {
      cep: document.getElementById('cep').value.replace(/\D/g, ''),
      logradouro: document.getElementById('logradouro').value.trim(),
      numero: document.getElementById('numero').value.trim(),
      complemento: document.getElementById('complemento').value.trim(),
      bairro: document.getElementById('bairro').value.trim(),
      cidade: document.getElementById('cidade').value.trim(),
      estado: document.getElementById('estado').value.trim().toUpperCase()
    };

    const cadastroRealizado = salvarAluno(novoAluno);

    if (!cadastroRealizado) {
      alert('Não foi possível cadastrar o aluno. Tente novamente.');
      return;
    }

    formCadastro.reset();
    limparErros();
    alert('Aluno cadastrado com sucesso!');
    window.location.href = '/dashboard/dashboard.html';
  });
});