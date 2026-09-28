class Aluno {
    /**
     * Construtor da classe Aluno com todos os dados obrigatórios e opcionais.
     */
    constructor(nomeCompleto, genero, dataNascimento, cpf, telefone, email, cep, logradouro, numero, complemento, bairro, cidade, estado) {
        this.nomeCompleto = nomeCompleto;
        this.genero = genero;
        this.dataNascimento = dataNascimento; // Salva a data já formatada ou tratada
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        
        // Objeto embutido para estruturar o Endereço
        this.endereco = {
            cep: cep,
            logradouro: logradouro,
            numero: numero,
            complemento: complemento || "", // Garante string vazia se for opcional
            bairro: bairro,
            cidade: cidade,
            estado: estado
        };
        
        // Propriedade opcional para controle, como a data que o registro foi criado
        this.cadastradoEm = new Date();
    }
}
