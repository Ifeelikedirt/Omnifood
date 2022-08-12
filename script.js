'use strict';
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');
const mainNav = document.querySelector('.main-nav');
const hero = document.querySelector('.hero');
const allSections = document.querySelectorAll('.section');
/////////////////////////////////////////////
// NAV OPACITY //
/////////////////////////////////////////////
const hoverOpacity = function(e){
  if(e.target.classList.contains('main-nav-link')){
    const link = e.target;
    const siblings = link.closest('.main-nav').querySelectorAll('.main-nav-link');
    const logo = link.closest('.header').querySelector('.logo');
    siblings.forEach(mov=>{
      if(mov!=link){
        mov.style.opacity=this;
      }
    })
    logo.style.opacity=this;
  }
}
headerEl.addEventListener('mouseover', hoverOpacity.bind(0.5));
headerEl.addEventListener('mouseout', hoverOpacity.bind(1));
/////////////////////////////////////////////
//SMMOOTH SCROLLING
/////////////////////////////////////////////
mainNav.addEventListener('click', (e)=>{
    if(e.target.classList.contains("main-nav-link")){
      e.preventDefault();
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior: 'smooth'});
      if(headerEl.classList.contains('nav-open')) headerEl.classList.remove('nav-open');
    }
})

hero.addEventListener('click', (e)=>{
  if(e.target.classList.contains('btn')){
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
})

document.querySelector('.footer-logo').addEventListener('click', ()=>{
  window.scrollTo({
    top:0,
    behavior: "smooth"
  })
})
/////////////////////////////////////////////
// MOBILE NAVIGATION
/////////////////////////////////////////////
btnNavEl.addEventListener('click', ()=>{
  headerEl.classList.toggle("nav-open");
})
/////////////////////////////////////////////
// STICKY NAVIGATION
/////////////////////////////////////////////
const headerHeight = headerEl.getBoundingClientRect().height;
const stickyNav = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting) document.querySelector('body').classList.add('sticky');
  else document.querySelector('body').classList.remove('sticky');
}
const options = {
  root:null,
  threshold:0,
  rootMargin:`-${headerHeight}px`,
}
const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(hero);
/////////////////////////////////////////////
// REVEALING ITEMS
/////////////////////////////////////////////
const revealSection = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.15,
});

allSections.forEach(section=>{
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});
