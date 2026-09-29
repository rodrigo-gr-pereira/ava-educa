const currentPath = window.location.pathname;
const isRootPage = currentPath === '/' || currentPath.endsWith('/index.html');
const isProtectedPage = currentPath.includes('/dashboard/') || currentPath.includes('/cadastro-aluno/');

if (isRootPage) {
    window.location.href = '/login/login.html';
  
}

if (isProtectedPage && !sessionStorage.getItem('usuarioLogado')) {
    window.location.href = '/login/login.html';
}
