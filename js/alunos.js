import { alunosIniciais } from '../dados/listagem-alunos.js';

export function obterAlunos() {
  const alunos = localStorage.getItem('alunos');
  if (!alunos) {
    localStorage.setItem('alunos', JSON.stringify(alunosIniciais));
    return alunosIniciais;
  }
  return JSON.parse(alunos);
}

export function salvarAluno(novoAluno) {
  const alunos = obterAlunos();
  alunos.push(novoAluno);
  localStorage.setItem('alunos', JSON.stringify(alunos));
}