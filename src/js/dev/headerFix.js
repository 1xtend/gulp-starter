import { mainVars } from '../app.js';

export const headerFix = () => {
  const header = document.querySelector('.header');
  let headerHeight = header.clientHeight;

  window.addEventListener('scroll', () => {
    if (window.scrollY > headerHeight) {
      header.classList.add('fixed');
      mainVars.body.style.paddingTop = headerHeight + 'px';
    } else {
      header.classList.remove('fixed');
      mainVars.body.style.paddingTop = 0;
    }
  });
};
