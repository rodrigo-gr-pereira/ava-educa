export class Aluno {
  constructor(id, nome, email, curso, status = "Ativo") {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.curso = curso;
    this.status = status;
    this.dataCadastro = new Date().toISOString().split('T')[0];
  }
}