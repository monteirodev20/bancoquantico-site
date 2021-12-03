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

  // Esta é a estratégia de correspondência.

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//  Componente com guias

tabsContainer.addEventListener('click', function (e) {
  const clicado = e.target.closest('.operations__tab');

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

// funcAnimação atribuindo valores com o .bind() tem quer ser usado em um evento
nav.addEventListener('mouseover', funcAnimacao.bind(0.5));

nav.addEventListener('mouseout', funcAnimacao.bind(1));

//////////////////////////////////////////
// Fixar o menu = navegação fixa

const header = document.querySelector('.header');
const navAltura = nav.getBoundingClientRect().height;
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
///////////////////////////////////////////////////////////////////////////////////////////////
