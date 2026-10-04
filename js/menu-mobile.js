function configurarMenuMobile() {
  const botao = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu-lateral');

  if (!botao || !menu) {
    return;
  }

  const fecharMenu = () => {
    menu.classList.remove('is-open');
    botao.setAttribute('aria-expanded', 'false');
    botao.setAttribute('aria-label', 'Abrir menu');
  };

  botao.addEventListener('click', () => {
    const aberto = botao.getAttribute('aria-expanded') === 'true';
    menu.classList.toggle('is-open', !aberto);
    botao.setAttribute('aria-expanded', String(!aberto));
    botao.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
  });

  menu.addEventListener('click', (evento) => {
    if (evento.target instanceof Element && evento.target.closest('.sidebar-link')) {
      fecharMenu();
    }
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
      fecharMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      fecharMenu();
    }
  });

}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', configurarMenuMobile, { once: true });
} else {
  configurarMenuMobile();
}
