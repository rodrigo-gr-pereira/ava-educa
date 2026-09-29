// Lista em memória para acumular os alunos cadastrados na sessão atual
const alunosCadastrados = [];

/**
 * Recebe uma instância da classe Aluno e realiza o salvamento no sistema.
 * @param {Aluno} aluno Objeto instanciado contendo todos os dados validados.
 */
function cadastrarAluno(aluno) {

return new Promise((resolve, reject) => {
try {
// Verifica se o array global ou o objeto de entrada falharam de alguma forma
if (typeof listagemAlunos === 'undefined' || !aluno) {
// Dispara o erro capturado pelo bloco catch
throw new Error("Dependências ou parâmetros ausentes.");
}

// Inserção do aluno no array disponível no arquivo listagem-alunos.js
listagemAlunos.push(aluno);

// Atualiza a sessionStorage para manter o histórico caso a página mude ou atualize
sessionStorage.setItem('listagemAlunosAtualizada', JSON.stringify(listagemAlunos));
console.log("Sucesso: Aluno injetado no array 'listagemAlunos' ->", listagemAlunos);
        
// RETORNA UMA PROMISE RESOLVE COM A MENSAGEM EXIGIDA
resolve("Aluno cadastrado com sucesso!");
} catch (error) {
console.error("Falha na operação de inserção:", error);
            
  // CASO HAJA ALGUM ERRO, RETORNA UMA PROMISE REJECT COM A MENSAGEM EXIGIDA
 reject("Erro ao cadastrar o aluno");
    }
});
}
    
