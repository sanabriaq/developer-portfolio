/* 02 — interações: reveal, scroll spy e parallax */

document.getElementById('year').textContent = new Date().getFullYear(); /* Atualiza o ano no rodapé automaticamente */

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
const sections = ['home', 'services', 'projects', 'contact'] /* IDs das seções do site */
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
  '%c JP %c João Pedro · Full-Stack Developer ', /* Estilo do console */
  'background:#ff6a1a;color:#fff;font-weight:700;padding:4px 8px;border-radius:4px 0 0 4px;', /* Estilo do console */
  'background:#1c1c1e;color:#ff6a1a;padding:4px 8px;border-radius:0 4px 4px 0;' /* Estilo do console */
);
console.log('%cse chegou até aqui, manda email: sanabriajoaopedro15@gmail.com', 'color:#9a9a9e;font-size:12px;'); /* Mensagem de contato no console */
