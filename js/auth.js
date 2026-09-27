/**
 * Valida as credenciais do usuário com base nos dados do sistema.
 * (Certifique-se de que listagem-usuarios.js declara a variável global correspondente)
 */
function login(usuario, senha) {
    // Caso sua listagem use uma variável global com outro nome, ajuste aqui (ex: listaUsuarios)
    if (typeof usuarios === 'undefined') {
        console.error("A lista de usuários não foi carregada corretamente.");
        return null;
    }

    // Busca o usuário correspondente ao e-mail e senha informados
    const usuarioEncontrado = usuarios.find(user => user.email === usuario && user.senha === senha);
    
    return usuarioEncontrado || null;
}
