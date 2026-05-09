// ============================================
// Portfolio Pessoal - JavaScript Principal
// Universidade - Trabalho Acadêmico
// Apenas JavaScript puro (vanilla JS), sem frameworks
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. MENU MOBILE (HAMBURGER)
  // ============================================
  // Controla a exibicao/ocultacao do menu de navegacao
  // em dispositivos moveis atraves do botao hamburger.

  const botaoMenu = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Alterna a classe "active" no menu ao clicar no botao hamburger
  botaoMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // ============================================
  // 2. NAVEGACAO COM SCROLL SUAVE
  // ============================================
  // Implementa a rolagem suave ate a secao correspondente
  // quando um link de navegacao e clicado.

  const linksNavegacao = document.querySelectorAll('.nav-links a');

  linksNavegacao.forEach((link) => {
    link.addEventListener('click', (evento) => {
      evento.preventDefault();

      // Obtem o alvo a partir do atributo href (ex: #sobre, #formacao)
      const idSecao = link.getAttribute('href');
      const secaoAlvo = document.querySelector(idSecao);

      if (secaoAlvo) {
        // Rola suavemente ate a secao alvo
        secaoAlvo.scrollIntoView({ behavior: 'smooth' });
      }

      // Fecha o menu mobile apos clicar em um link
      navLinks.classList.remove('active');
    });
  });

  // ============================================
  // 3. DESTAQUE DO LINK ATIVO NO MENU AO ROLAR
  // ============================================
  // Usa IntersectionObserver para detectar qual secao
  // esta visivel na viewport e destaca o link correspondente.

  const secoes = document.querySelectorAll('#sobre, #formacao, #portfolio, #contato');

  // Cria um observer que monitora quando as secoes entram na viewport
  const observerSecoes = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        // Remove a classe "active" de todos os links de navegacao
        linksNavegacao.forEach((link) => {
          link.classList.remove('active');
        });

        // Adiciona a classe "active" ao link correspondente a secao visivel
        const linkAtivo = document.querySelector(`.nav-links a[href="#${entrada.target.id}"]`);
        if (linkAtivo) {
          linkAtivo.classList.add('active');
        }
      }
    });
  }, {
    threshold: 0.3 // A secao e considerada visivel quando 30% dela esta na viewport
  });

  // Registra cada secao para observacao
  secoes.forEach((secao) => {
    observerSecoes.observe(secao);
  });

  // ============================================
  // 4. VALIDACAO DO FORMULARIO DE CONTATO
  // ============================================
  // Valida os campos do formulario antes do envio.
  // Exibe mensagens de erro para campos invalidos e
  // mensagem de sucesso quando todos os campos sao validos.

  const formulario = document.getElementById('contact-form');
  const campoNome = document.getElementById('name');
  const campoEmail = document.getElementById('email');
  const campoMensagem = document.getElementById('message');
  const mensagemSucesso = document.getElementById('success-message');

  // Padrao regex para validacao de e-mail
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Funcao auxiliar que exibe erro em um campo
  const mostrarErro = (campo) => {
    campo.classList.add('invalid');
    const mensagemErro = campo.nextElementSibling;
    if (mensagemErro && mensagemErro.classList.contains('error-message')) {
      mensagemErro.classList.add('visible');
    }
  };

  // Funcao auxiliar que remove o erro de um campo
  const removerErro = (campo) => {
    campo.classList.remove('invalid');
    const mensagemErro = campo.nextElementSibling;
    if (mensagemErro && mensagemErro.classList.contains('error-message')) {
      mensagemErro.classList.remove('visible');
    }
  };

  // Evento de envio do formulario
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let formularioValido = true;

    // Validacao do campo nome - nao pode estar vazio
    const nomeValor = campoNome.value.trim();
    if (nomeValor === '') {
      mostrarErro(campoNome);
      formularioValido = false;
    } else {
      removerErro(campoNome);
    }

    // Validacao do campo e-mail - nao pode estar vazio e deve ter formato valido
    const emailValor = campoEmail.value.trim();
    if (emailValor === '' || !regexEmail.test(emailValor)) {
      mostrarErro(campoEmail);
      formularioValido = false;
    } else {
      removerErro(campoEmail);
    }

    // Validacao do campo mensagem - nao pode estar vazia
    const mensagemValor = campoMensagem.value.trim();
    if (mensagemValor === '') {
      mostrarErro(campoMensagem);
      formularioValido = false;
    } else {
      removerErro(campoMensagem);
    }

    // Se todos os campos forem validos, exibe mensagem de sucesso e limpa o formulario
    if (formularioValido) {
      mensagemSucesso.classList.add('visible');

      // Limpa todos os campos do formulario
      formulario.reset();

      // Oculta a mensagem de sucesso apos 5 segundos
      setTimeout(() => {
        mensagemSucesso.classList.remove('visible');
      }, 5000);
    }
  });

  // ============================================
  // 5. REMOCAO DOS ESTILOS DE ERRO AO DIGITAR
  // ============================================
  // Remove os estilos de erro e oculta a mensagem de erro
  // assim que o usuario comeca a digitar no campo correspondente.

  const removerErroAoDigitar = (campo) => {
    campo.addEventListener('input', () => {
      removerErro(campo);
    });
  };

  // Aplica o listener de remocao de erro a cada campo do formulario
  removerErroAoDigitar(campoNome);
  removerErroAoDigitar(campoEmail);
  removerErroAoDigitar(campoMensagem);

});