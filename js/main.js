// Portfolio - JavaScript puro (vanilla JS), sem frameworks

document.addEventListener('DOMContentLoaded', () => {

  // Menu mobile (hamburger)
  const botaoMenu = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  botaoMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Scroll suave ao clicar nos links de navegacao
  const linksNavegacao = document.querySelectorAll('.nav-links a');

  linksNavegacao.forEach((link) => {
    link.addEventListener('click', (evento) => {
      evento.preventDefault();
      const secaoAlvo = document.querySelector(link.getAttribute('href'));
      if (secaoAlvo) {
        secaoAlvo.scrollIntoView({ behavior: 'smooth' });
      }
      navLinks.classList.remove('active');
    });
  });

  // Destaque do link ativo no menu ao rolar
  const secoes = document.querySelectorAll('#sobre, #formacao, #portfolio, #contato');

  const observerSecoes = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        linksNavegacao.forEach((link) => link.classList.remove('active'));
        const linkAtivo = document.querySelector(`.nav-links a[href="#${entrada.target.id}"]`);
        if (linkAtivo) linkAtivo.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  secoes.forEach((secao) => observerSecoes.observe(secao));

  // Validacao do formulario de contato
  const formulario = document.getElementById('contact-form');
  const campoNome = document.getElementById('name');
  const campoEmail = document.getElementById('email');
  const campoMensagem = document.getElementById('message');
  const mensagemSucesso = document.getElementById('success-message');
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const mostrarErro = (campo) => {
    campo.classList.add('invalid');
    const msg = campo.nextElementSibling;
    if (msg && msg.classList.contains('error-message')) msg.classList.add('visible');
  };

  const removerErro = (campo) => {
    campo.classList.remove('invalid');
    const msg = campo.nextElementSibling;
    if (msg && msg.classList.contains('error-message')) msg.classList.remove('visible');
  };

  // Limpa erro ao digitar
  [campoNome, campoEmail, campoMensagem].forEach((campo) => {
    campo.addEventListener('input', () => removerErro(campo));
  });

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let valido = true;

    if (campoNome.value.trim() === '') { mostrarErro(campoNome); valido = false; }
    else { removerErro(campoNome); }

    const email = campoEmail.value.trim();
    if (email === '' || !regexEmail.test(email)) { mostrarErro(campoEmail); valido = false; }
    else { removerErro(campoEmail); }

    if (campoMensagem.value.trim() === '') { mostrarErro(campoMensagem); valido = false; }
    else { removerErro(campoMensagem); }

    if (valido) {
      mensagemSucesso.classList.add('visible');
      formulario.reset();
      setTimeout(() => mensagemSucesso.classList.remove('visible'), 5000);
    }
  });

});