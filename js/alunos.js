// Lista em memória para acumular os alunos cadastrados na sessão atual
const alunosCadastrados = [];

/**
 * Recebe uma instância da classe Aluno e realiza o salvamento no sistema.
 * @param {Aluno} aluno Objeto instanciado contendo todos os dados validados.
 */
function cadastrarAluno(aluno) {
    if (!aluno || !(aluno instanceof Aluno)) {
        console.error("Erro: O dado fornecido não é uma instância válida da classe Aluno.");
        return false;
    }

    // Armazena o objeto na lista simulada
    alunosCadastrados.push(aluno);
    
    // Opcional: Atualiza também a sessionStorage para manter os dados mesmo atualizando a página
    sessionStorage.setItem('alunosPersistidos', JSON.stringify(alunosCadastrados));

    console.log("Módulo alunos.js -> Novo aluno registrado com sucesso:", aluno);
    return true;
}
