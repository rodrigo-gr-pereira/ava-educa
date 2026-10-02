import { verificarAutenticacao, logout } from '../js/auth.js';
import { obterAlunos } from '../js/alunos.js';
import { obterCursos } from '../js/cursos.js';

document.addEventListener('DOMContentLoaded', () => {
  const user = verificarAutenticacao();
  document.getElementById('user-name').textContent = user.nome;
  document.getElementById('btn-logout').addEventListener('click', logout);

  const alunos = obterAlunos();
  const cursos = obterCursos();

  document.getElementById('total-alunos').textContent = alunos.length;
  document.getElementById('total-cursos').textContent = cursos.length;

  const listaEl = document.getElementById('lista-alunos');
  listaEl.innerHTML = alunos.map(aluno => 
    `<li style="padding: 8px 0; border-bottom: 1px solid #eee;">
      <strong>${aluno.nome}</strong> - ${aluno.curso} (${aluno.email})
    </li>`
  ).join('');
});