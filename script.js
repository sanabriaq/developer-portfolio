/* 02 — interações: contadores, reveal e scroll spy */

document.getElementById('year').textContent = new Date().getFullYear(); /* Atualiza o ano no rodapé automaticamente */

/* CONTADORES animados */
const counters = document.querySelectorAll('[data-count]'); /* Seleciona todos os elementos que possuem o atributo data-count */
const countObs = new IntersectionObserver((entries) => { /* Callback do IntersectionObserver */
  entries.forEach(e => { /* Itera sobre todas as entradas observadas */
    if (!e.isIntersecting) return; // Se o elemento não está visível, não faz nada
    const el = e.target; // Elemento que contém o contador
    const target = parseInt(el.dataset.count, 10); // Valor final do contador
    const suffixEl = el.querySelector('.plus'); // Elemento que contém o sufixo (se houver)
    const suffix = suffixEl ? suffixEl.outerHTML : ''; // Sufixo a ser adicionado ao final do número
    const duration = 1400; // Duração da animação em milissegundos
    const start = performance.now(); // Momento em que a animação começa
    function step(now) { // Função que atualiza o contador a cada frame
      const t = Math.min((now - start) / duration, 1); // Progresso da animação (0 a 1)
      const eased = 1 - Math.pow(1 - t, 3); // Função de easing (cubic ease-out)
      el.innerHTML = Math.floor(eased * target) + suffix; // Atualiza o conteúdo do elemento com o valor atual do contador e o sufixo
      if (t < 1) requestAnimationFrame(step); // Se a animação não terminou, solicita o próximo frame
      else el.innerHTML = target + suffix; // Garante que o valor final seja exatamente o alvo
    }
    requestAnimationFrame(step); // Inicia a animação
    countObs.unobserve(el); // Para de observar o elemento após a animação terminar
  });
}, { threshold: 0.4 }); /* Ajuste o threshold conforme necessário */
counters.forEach(c => countObs.observe(c)); /* Observa cada contador para iniciar a animação quando ele entrar na viewport */

/* REVEAL ao scroll */
const reveals = document.querySelectorAll('.services, .projects, .contact, .service, .card'); /* Seleciona todos os elementos que devem ter o efeito de reveal */
reveals.forEach(el => el.classList.add('reveal')); /* Adiciona a classe 'reveal' a todos os elementos selecionados para aplicar o estilo inicial de invisibilidade */
const revealObs = new IntersectionObserver((entries) => { /* Callback do IntersectionObserver */
  entries.forEach(e => { /* Itera sobre todas as entradas observadas */
    if (e.isIntersecting) { /* Se o elemento está visível na viewport */
      e.target.classList.add('in'); /* Adiciona a classe 'in' para ativar a animação de reveal */
      revealObs.unobserve(e.target); /* Para de observar o elemento após a animação terminar */
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }); /* Ajuste o threshold e o rootMargin conforme necessário */
reveals.forEach(el => revealObs.observe(el)); /* Observa cada elemento para iniciar a animação de reveal quando ele entrar na viewport */

/*  SCROLL SPY (nav .active acompanha a seção)  */
const sections = ['home', 'services', 'about', 'projects', 'contact'] /* IDs das seções do site */
  .map(id => document.getElementById(id)) /* Seleciona as seções pelo ID */
  .filter(Boolean); /* Filtra apenas as seções que existem no DOM */
const navLinks = document.querySelectorAll('.nav a'); /* Seleciona todos os links de navegação */

const spyObs = new IntersectionObserver((entries) => { /* Callback do IntersectionObserver */
  entries.forEach(e => { /* Itera sobre todas as seções observadas */
    if (e.isIntersecting) { /* Se a seção está visível na viewport */
      const id = e.target.id; /* Obtém o ID da seção visível */
      navLinks.forEach(a => { /* Itera sobre todos os links de navegação */
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`); /* Adiciona a classe 'active' ao link correspondente à seção visível */
      });
    }
  });
}, { threshold: 0.35 }); /* Ajuste o threshold conforme necessário */
sections.forEach(s => spyObs.observe(s)); /*  fim do scroll spy  */

/*  PARALLAX leve na foto  */
const photo = document.querySelector('.photo-wrap'); // apenas em dispositivos com mouse
const backdrop = document.querySelector('.photo-backdrop'); // apenas em dispositivos com mouse
if (photo && window.matchMedia('(pointer: fine)').matches) { // apenas em dispositivos com mouse
  document.addEventListener('mousemove', (e) => { // apenas em dispositivos com mouse
    const x = (e.clientX / window.innerWidth - 0.5) * 14; // ajuste da intensidade do efeito
    const y = (e.clientY / window.innerHeight - 0.5) * 14; // ajuste da intensidade do efeito
    photo.style.transform = `translate(${x}px, ${y}px)`; // efeito leve na foto
    if (backdrop) backdrop.style.transform = `translate(${x * -0.5}px, ${y * -0.5}px)`; // efeito inverso no backdrop
  });
}

/* Easter egg no console */
console.log( /* Mensagem de boas-vindas no console */
  '%c JP %c João Pedro · Front-End Developer ', /* Estilo do console */
  'background:#ff6a1a;color:#fff;font-weight:700;padding:4px 8px;border-radius:4px 0 0 4px;', /* Estilo do console */
  'background:#1c1c1e;color:#ff6a1a;padding:4px 8px;border-radius:0 4px 4px 0;' /* Estilo do console */
);
console.log('%cse chegou até aqui, manda email: seu-email@exemplo.com', 'color:#9a9a9e;font-size:12px;'); /* Mensagem de contato no console */
