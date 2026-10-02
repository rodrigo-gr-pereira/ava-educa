// Dados simulados do usuário logado e seus respectivos cursos
const loggedInUser = {
  nome: "Ana Souza",
  cursos: [
    {
      id: "C101",
      nome: "Desenvolvimento Web Full Stack",
      dataInicio: "02/02/2026",
      dataFim: "30/11/2026",
      descricao: "Curso prático sobre criação de aplicações web modernas com HTML, CSS, JavaScript e Frameworks."
    },
    {
      id: "C102",
      nome: "Gestão de Bases de Dados Relacionais",
      dataInicio: "15/03/2026",
      dataFim: "15/07/2026",
      descricao: "Modelação, consultas SQL avançadas e otimização de desempenho em PostgreSQL e MySQL."
    },
    {
      id: "C103",
      nome: "Introdução à Inteligência Artificial",
      dataInicio: "01/08/2026",
      dataFim: "20/12/2026",
      descricao: "Fundamentos de Machine Learning, conceitos de IA generativa e aplicações práticas."
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  // Exibe o nome do usuário na Navbar
  const userNameElem = document.getElementById("user-name");
  if (userNameElem) {
    userNameElem.textContent = loggedInUser.nome;
  }

  // Renderiza os cards de curso no container
  const coursesGrid = document.getElementById("courses-grid");
  if (coursesGrid) {
    coursesGrid.innerHTML = loggedInUser.cursos.map(curso => `
      <article class="course-card">
        <div class="course-card-header"></div>
        <div class="course-card-body">
          <h2 class="course-title">${curso.nome}</h2>
          <p class="course-description">${curso.descricao}</p>
          
          <div class="course-dates">
            <div class="date-item">
              <span class="date-label">Data de Início:</span>
              <strong class="date-value">${curso.dataInicio}</strong>
            </div>
            <div class="date-item">
              <span class="date-label"> Data de Fim:</span>
              <strong class="date-value">${curso.dataFim}</strong>
            </div>
          </div>
        </div>
        <div class="course-card-footer">
          <a href="#" class="btn-course">Acessar Curso</a>
        </div>
      </article>
    `).join('');
  }
});