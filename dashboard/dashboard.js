import { verificarAutenticacao } from '../js/auth.js';
import { listarCursos } from '../js/cursos.js';

document.addEventListener('DOMContentLoaded', () => {
  const usuario = verificarAutenticacao();

  if (!usuario) {
    return;
  }

  const userNameElem = document.getElementById('user-name');
  if (userNameElem) {
    userNameElem.textContent = usuario.nome;
  }

  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      sessionStorage.removeItem('usuarioLogado');
      window.location.href = '/login/login.html';
    });
  }

  const coursesGrid = document.getElementById('courses-grid');
  if (!coursesGrid) {
    return;
  }

  const cursos = listarCursos(usuario);
  if (!Array.isArray(cursos) || cursos.length === 0) {
    coursesGrid.innerHTML = '<div class="empty-state">Nenhum curso encontrado para este usuário.</div>';
    return;
  }

  coursesGrid.innerHTML = cursos.map(curso => `
    <article class="course-card">
      <div class="course-card-header"></div>
      <div class="course-card-body">
        <h2 class="course-title">${curso.nome}</h2>
        <p class="course-description">${curso.descricao || 'Curso em andamento.'}</p>
        <div class="course-dates">
          <div class="date-item">
            <span class="date-label">Data de Início:</span>
            <strong class="date-value">${curso.dataInicio || '--/--/----'}</strong>
          </div>
          <div class="date-item">
            <span class="date-label">Data de Fim:</span>
            <strong class="date-value">${curso.dataFim || '--/--/----'}</strong>
          </div>
        </div>
      </div>
      <div class="course-card-footer">
        <a href="#" class="btn-course">Acessar Curso</a>
      </div>
    </article>
  `).join('');
});