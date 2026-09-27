// js/cursos.js

/**
 * Retorna os cursos associados ao usuário logado.
 * @param {Object} usuario - O objeto do usuário recuperado da sessão.
 */
function listarCursos(usuario) {
    if (typeof cursos === 'undefined') {
        console.error("A listagem global de cursos não foi carregada.");
        return [];
    }
    
    // Filtra os cursos onde o usuarioId bate com o ID do usuário atual
    return cursos.filter(curso => curso.usuarioId === usuario.id);
}
