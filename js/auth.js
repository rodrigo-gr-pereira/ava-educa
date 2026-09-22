// Função global simulando a validação descrita no RF08
function login(usuario, senha) {
    // Exemplo de credenciais válidas para teste
    if (usuario === "teste@email.com" && senha === "123456") {
        return {
            nome: "Usuário Teste",
            email: usuario,
            token: "abc123xyz"
        };
    }
    // Retorna null ou false caso os dados estejam incorretos
    return null; 
}
