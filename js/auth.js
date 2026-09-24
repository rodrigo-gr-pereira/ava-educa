// js/auth.js
function login(usuario, senha) {
    // Exemplo de validação mockada (substitua pela sua listagem real de usuários se necessário)
    if (usuario === "admin@educa.com" && senha === "123456") {
        return {
            id: 1,
            nome: "Administrador",
            email: usuario,
            perfil: "coordenador"
        };
    }
    return null; // Retorna null se as credenciais estiverem incorretas
}
