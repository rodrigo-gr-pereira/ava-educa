import { verificarAutenticacao } from '../js/auth.js';
import { obterCursos } from '../js/cursos.js';
import { salvarAluno } from '../js/alunos.js';
import { Aluno } from '../js/Aluno.js';

document.addEventListener('DOMContentLoaded', () => {
  verificarAutenticacao();

  const selectCurso = document.getElementById('curso');
  const cursos = obterCursos();

  cursos.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.titulo;
    opt.textContent = c.titulo;
    selectCurso.appendChild(opt);
  });

  document.getElementById('form-cadastro').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const curso = document.getElementById('curso').value;

    const novoAluno = new Aluno(Date.now(), nome, email, curso);
    salvarAluno(novoAluno);

    alert('Aluno cadastrado com sucesso!');
    window.location.href = '../dashboard/dashboard.html';
  });
});