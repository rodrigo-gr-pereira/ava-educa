/**
 * Valida as credenciais do usuário com base nos dados do sistema.
 * Mantém compatibilidade com credenciais antigas de teste.
 */
function login(usuario, senha) {
    // Credenciais de teste antigas, mantidas para compatibilidade
if (usuario === "teste@email.com" && senha === "123456") {
    return {
        id: 0,
        nome: "Usuário Teste",
        email: usuario,
        perfil: "teste"
        };
}

if (typeof usuarios === 'undefined') {
    console.error("A lista de usuários não foi carregada corretamente.");
    return null;
    }

const usuarioEncontrado = usuarios.find(user => user.email === usuario && user.senha === senha);
return usuarioEncontrado || null;
}
