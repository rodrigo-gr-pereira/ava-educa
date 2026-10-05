import { alunosIniciais } from '../dados/listagem-alunos.js';

const STORAGE_KEY = 'alunos';

function salvarAlunosNoStorage(alunos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alunos));
}

export function obterAlunos() {
  const alunosSalvos = localStorage.getItem(STORAGE_KEY);

  if (!alunosSalvos) {
    salvarAlunosNoStorage(alunosIniciais);
    return [...alunosIniciais];
  }

  try {
    const alunos = JSON.parse(alunosSalvos);

    if (!Array.isArray(alunos)) {
      throw new Error('Dados de alunos inválidos.');
    }

    return alunos;
  } catch (error) {
    console.error('Erro ao ler alunos do localStorage:', error);
    salvarAlunosNoStorage(alunosIniciais);
    return [...alunosIniciais];
  }
}

export function cadastrarAluno(aluno) {
  try {
    if (!aluno || typeof aluno !== 'object' || Array.isArray(aluno)) {
      throw new Error('Objeto aluno inválido.');
    }

    const alunos = obterAlunos();
    const alunoParaSalvar = { ...aluno };

    if (alunoParaSalvar.id === undefined || alunoParaSalvar.id === null || alunoParaSalvar.id === '') {
      alunoParaSalvar.id = Date.now();
    }

    alunos.push(alunoParaSalvar);
    salvarAlunosNoStorage(alunos);
    return true;
  } catch (error) {
    console.error('Falha ao cadastrar aluno:', error);
    return false;
  }
}

export function salvarAluno(novoAluno) {
  return cadastrarAluno(novoAluno);
}