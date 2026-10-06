import { cursosIniciais } from '../dados/listagem-cursos.js';

/**
 * Retorna os cursos cadastrados na listagem inicial.
 * @returns {Array} Lista de cursos
 */
export function listarCursos() {
  return cursosIniciais;
}