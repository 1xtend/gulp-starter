import { mainElems } from '../app.js';

let scrollPosition;
let bodyPadding = 0;

// All elements with position: fixed;
let fixedElems = document.querySelectorAll('.fixed');

let fixedElemsLength = fixedElems.length;

// Body lock function.
export const bodyLock = () => {
  // Stop function if body has class body-lock
  if (mainElems.body.classList.contains('body-lock')) {
    return;
  }

  // Save current position.
  scrollPosition = window.scrollY;
  // Changed scroll behavior (because can make bugs).
  mainElems.html.style.scrollBehavior = 'unset';

  // Save scrollbar width.
  bodyPadding = window.innerWidth - mainElems.body.offsetWidth + 'px';

  // Add scroll position.
  mainElems.body.style.top = `-${scrollPosition}px`;
  // Add padding right to body.
  mainElems.body.style.paddingRight = bodyPadding;

  // Check if fixed elements exist.
  if (fixedElemsLength > 0) {
    fixedElems.forEach((fixedElem) => {
      // Add padding right to fixed elements.
      fixedElem.style.paddingRight = bodyPadding;
    });
  }

  // Add body-lock class to body.
  mainElems.body.classList.add('body-lock');
};

// Body unlock function.
export const bodyUnLock = () => {
  // Stop function if body doesn't have class body-lock
  if (!mainElems.body.classList.contains('body-lock')) {
    return;
  }

  // Remove all changes.
  mainElems.body.classList.remove('body-lock');
  mainElems.body.style.top = '';
  mainElems.body.style.paddingRight = '';

  // Check if fixed elements exist.
  if (fixedElemsLength > 0) {
    fixedElems.forEach((fixedElem) => {
      // Remove padding right
      fixedElem.style.paddingRight = '';
    });
  }

  // Scroll to saved position
  window.scrollTo(0, scrollPosition);
  mainElems.html.style.scrollBehavior = '';
};
