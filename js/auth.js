import { usuariosIniciais } from '../dados/listagem-usuarios.js';

export function login(usuario, senha) {
  const usuarioEncontrado = usuariosIniciais.find(
    u => u.email.toLowerCase() === String(usuario).trim().toLowerCase() && u.senha === String(senha)
  );

  if (usuarioEncontrado) {
    const { senha: _, ...dadosSessao } = usuarioEncontrado;
    sessionStorage.setItem('usuarioLogado', JSON.stringify(dadosSessao));
    return true;
  }

  return false;
}

export function verificarSessaoInicial() {
  const usuario = sessionStorage.getItem('usuarioLogado');
  if (usuario) {
    window.location.href = '/dashboard/dashboard.html';
    return;
  }

  window.location.href = '/login/login.html';
}

export function verificarAutenticacao() {
  const usuarioLogado = sessionStorage.getItem('usuarioLogado');

  if (!usuarioLogado) {
    window.location.href = '/login/login.html';
    return null;
  }

  try {
    return JSON.parse(usuarioLogado);
  } catch (error) {
    sessionStorage.removeItem('usuarioLogado');
    window.location.href = '/login/login.html';
    return null;
  }
}

export function logout() {
  sessionStorage.removeItem('usuarioLogado');
  window.location.href = '/login/login.html';
}