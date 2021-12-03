'use strict';
// SELECIONAR ELEMENTOS

// USADO em: Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// USADO em: BOTÃO ROLAGEM SUAVE
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// nav
const nav = document.querySelector('.nav');

// s: 2
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////
// BOTÃO ROLAGEM SUAVE

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Posição scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Rolagem (scrolling)
  // Forma antiga
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // Forma antiga

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth', // essa propriedade chama-se comportamento
  // });

  // Forma Moderna
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////////////
// Navegação da Página

// Antigo
// document.querySelectorAll('.nav__link').forEach(function (elem) {
//   elem.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Moderno
// 1: Adicionamos o ouvinte de evento a um elemento pai comum de todos os elementos nos quais estamos interessados.

// 2: Determine qual elemento originou o evento.

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('Link');

  // Esta é a estratégia de correspondência.

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//  Componente com guias

tabsContainer.addEventListener('click', function (e) {
  const clicado = e.target.closest('.operations__tab');
  // console.log(clicado);

  // Cláusula de guarda
  // nada for clicado, queremos terminar imediatamente esta função.
  if (!clicado) return;

  // Remover classes ativadas
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  // active tab
  clicado.classList.add('operations__tab--active');

  // Ativar a area de conteúdo

  document
    .querySelector(`.operations__content--${clicado.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Animação de feed de menu
const funcAnimacao = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// func que a funcAnimação atribuindo valores com o .bind() tem quer ser usado em um evento
nav.addEventListener('mouseover', funcAnimacao.bind(0.5));

nav.addEventListener('mouseout', funcAnimacao.bind(1));

//////////////////////////////////////////
// // Fixar o menu = navegação fixa

// const coordInicias = section1.getBoundingClientRect();

// console.log(coordInicias);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (window.scrollY > coordInicias.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// const obsVolta = function (entradas, observador) {
//   entradas.forEach(entrada => {
//     console.log(entrada);
//   });
// };

// const obsOpcoes = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observador = new IntersectionObserver(obsVolta, obsOpcoes);
// observador.observe(section1);

const header = document.querySelector('.header');

const navAltura = nav.getBoundingClientRect().height;
// console.log(navAltura);

const stickyNav = function (entradas) {
  const [entrada] = entradas;
  // console.log(entrada);

  if (!entrada.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navAltura}px`,
});

headerObserver.observe(header);

// Revelar secções
const todasSections = document.querySelectorAll('.section');

const revelaSection = function (entradas, observador) {
  const [entrada] = entradas;
  // console.log(entrada);

  if (!entrada.isIntersecting) return;
  entrada.target.classList.remove('section--hidden');
  observador.unobserve(entrada.target);
};

const sectionObserver = new IntersectionObserver(revelaSection, {
  root: null,
  threshold: 0.15,
});
todasSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Imagens de carregamento lento = é realmente ótimo para desempenho.
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entradas, observador) {
  const [entrada] = entradas;
  // console.log(entrada);

  if (!entrada.isIntersecting) return;

  // substituir o atributo src pelo dados-src
  entrada.target.src = entrada.target.dataset.src;

  entrada.target.addEventListener('load', function () {
    entrada.target.classList.remove('lazy-img');
  });

  observador.unobserve(entrada.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//  Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';

  //  Adicionando pontos
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}" ></button>`
      );
    });
  };

  // Funções
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
    );
  };

  // Proximo slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide == 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // inicial
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Manipuladores de eventos
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  // curSlide = 1:  -100%, 0%, 100%, 200%

  //  Usar teclas dereita e esquerda.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      curSlide = e.target.dataset.slide;
      // const { slide } = e.target.dataset;
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
// Selecionar bem o documento inteiro, de qualquer página

// para esses elementos especiais, não precisamos nem mesmo escrever nenhum seletor
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');

// selecionar multiplos elemento
const todaseção = document.querySelectorAll('.section');

console.log(todaseção);

// E aqui passamos apenas o próprio nome do ID sem o seletor.

document.getElementById('#section--1');
const todosBotões = document.getElementsByTagName('button');
console.log(todosBotões);

console.log(document.getElementsByClassName('btn'));

// Criando e insserindo elementos
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'Usamos cookies para melhorar a funcionalidade e análises.';
message.innerHTML =
  'Usamos cookies para melhorar a funcionalidade e análises. <button class="btn btn--close-cookie">Aceitar!</button></button>';
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

//  Excluir elementos

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message);
  });

//////////////////////////////////////////////

// Styles, Attributes and Classes

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.backgroundColor);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Atributos
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Logo minimalista e lindo';

// isso não é padrão e é por isso que não funciona.
console.log(logo.designer);

console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//  Atributos de dados
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('s', 'm');
logo.classList.remove('s', 'm');
logo.classList.toggle('s', 'm');
logo.classList.contains('s', 'm'); // Não inclui


// Tipos de eventos e manipuladores de eventos
// Um evento é basicamente um sinal que é gerado por um certo nó DOM e um sinal significa que algo aconteceu, por exemplo, um clique em algum lugar ou o movimento do mouse, ou o usuário acionando o modo de tela inteira e realmente qualquer coisa importante, que acontece em nossa página, gera um evento.

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Muito bom! você esta lendo o titúlo.');
  // remover evento
  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

//  Este é outro padrão de remoção do EventListener

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('addEventListener: Muito bom! você esta lendo o titúlo.');
// };

/////////////////////////////////////////////////////////////////////////////////////////

// Os eventos JavaScript têm uma propriedade muito importante. Eles têm uma fase chamada de captura e uma fase de borbulhamento.

// Propagação de evntos na prática

// rgb(255, 255, 255)
const numIntleatorio = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const corAleatoria = () =>
  `rgb(${numIntleatorio(0, 255)}, ${numIntleatorio(0, 255)}, ${numIntleatorio(
    0,
    255
  )})`;
console.log(corAleatoria(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = corAleatoria();
  console.log('LINK', e.target);

  // Parar com a propagação
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = corAleatoria();
  console.log('CONTEINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = corAleatoria();
  console.log('NAV', e.target, e.currentTarget);
});

// ATRAVECIA DOM

const h1 = document.querySelector('h1');

// Descendo para baixo: Filho
console.log(h1.querySelectorAll('.highlight'));

console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'blue';

// Indo para cima: Pais
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// Indo para o lado: irmãos
// em JavaScript, só podemos acessar irmãos diretos. Basicamente, apenas o anterior e o próximo.

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
