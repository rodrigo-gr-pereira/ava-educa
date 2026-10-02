import { cursosIniciais } from '../dados/listagem-cursos.js';

export function obterCursos() {
  const cursos = localStorage.getItem('cursos');
  if (!cursos) {
    localStorage.setItem('cursos', JSON.stringify(cursosIniciais));
    return cursosIniciais;
  }
  return JSON.parse(cursos);
}