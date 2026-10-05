import { cursosIniciais } from '../dados/listagem-cursos.js';

/**
 * Retorna os cursos cadastrados/associados ao usuário informado.
 * @param {Object} usuario - Objeto do usuário logado na sessão
 * @returns {Array} Lista de cursos
 */
export function listarCursos(usuario) {
  // Busca lista de cursos do localStorage ou inicializa com o mock de dados
  const cursosSalvos = localStorage.getItem('cursos');
  const cursos = cursosSalvos ? JSON.parse(cursosSalvos) : cursosIniciais;

  if (!cursosSalvos) {
    localStorage.setItem('cursos', JSON.stringify(cursosIniciais));
  }

  // Se o mock de cursos já contiver filtro por usuário, pode filtrar aqui.
  // Caso contrário, retorna a lista de cursos ativos do usuário:
  return cursos;
}