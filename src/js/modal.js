// Import body and html
import { mainElems } from './app.js';

// Button example
// <button type="button" data-modal="myModal">Open</button>

export const modal = () => {
  // Elements with lock-padding class (with position: fixed)
  const lockPaddingElems = document.querySelectorAll('.lock-padding');

  // Save scroll postition
  let scrollPosition = 0;

  // Change padding-right while modal is opened
  let bodyPadding = 0;

  // Active modal (for closing)
  let activeModal;

  // Modal transition
  const transitionTimeout = 300;

  // Event listeners on modal togglers
  const modalTogglers = document.querySelectorAll('[data-modal]');
  if (modalTogglers.length > 0) {
    modalTogglers.forEach((modalToggler) => {
      modalToggler.addEventListener('click', (e) => {
        // Find modal by data attribute
        const modalId = e.target.closest('[data-modal]').dataset.modal;
        const currentModal = document.querySelector(`#${modalId}`);

        openModal(currentModal);

        e.preventDefault();
      });
    });
  }

  // Event listeners on modal close buttons
  const modalCloseBtns = document.querySelectorAll('.close-modal');
  if (modalCloseBtns.length > 0) {
    modalCloseBtns.forEach((closeBtn) => {
      closeBtn.addEventListener('click', (e) => {
        // Close modal by pressing close-modal button
        if (e.target.closest('.close-modal')) {
          closeModal(e.target.closest('.modal'));
        }

        e.preventDefault();
      });
    });
  }

  // Open modal
  function openModal(currentModal) {
    const previousModal = document.querySelector('.modal.is-active');

    // Close previous modal
    if (previousModal) {
      closeModal(previousModal, false);
    } else {
      disableScroll();
    }

    currentModal.classList.add('is-active');

    activeModal = currentModal;

    // Add event listeners to close modal by pressing Escape or clicking on backdrop
    window.addEventListener('keyup', closeModalByEscape);
    currentModal.addEventListener('click', closeModalByBackdrop);
  }

  // Close modal
  function closeModal(currentModal, doUnlock = true) {
    currentModal.classList.remove('is-active');

    // Enable scroll if doUnlock = true
    if (doUnlock) {
      enableScroll();
    }

    // Remove event listeners
    window.removeEventListener('keyup', closeModalByEscape);
    currentModal.removeEventListener('click', closeModalByBackdrop);

    activeModal = null;
  }

  // Close modal be clicking on backdrop
  function closeModalByBackdrop(e) {
    if (!e.target.closest('.modal__body')) {
      closeModal(activeModal);
    }
  }

  // Close modal by pressing Escape
  function closeModalByEscape(e) {
    if (e.code === 'Escape') {
      closeModal(activeModal);
    }
  }

  // Disable scroll
  function disableScroll() {
    // Save scrollTop
    scrollPosition = window.scrollY;
    mainElems.body.style.top = `-${scrollPosition}px`;
    mainElems.html.style.scrollBehavior = 'unset';

    // Add padding-right instead of scrollbar
    bodyPadding = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    mainElems.body.style.paddingRight = bodyPadding;

    // Add padding-right to lock-padding elements
    if (lockPaddingElems.length > 0) {
      lockPaddingElems.forEach((lockElem) => {
        lockElem.style.paddingRight = bodyPadding;
      });
    }

    // Lock body
    mainElems.body.classList.add('modal-lock');
  }

  // Enable scroll
  function enableScroll() {
    // Added timeout because of the transition
    setTimeout(() => {
      // Unlock body
      mainElems.body.classList.remove('modal-lock');
      mainElems.body.style.top = '';

      // Scroll to saved value
      window.scrollTo(0, scrollPosition);

      // Remove padding-right to lock-padding elements
      if (lockPaddingElems.length > 0) {
        lockPaddingElems.forEach((lockElem) => {
          lockElem.style.paddingRight = '';
        });
      }

      mainElems.html.style.scrollBehavior = '';
      mainElems.body.style.paddingRight = '';
    }, transitionTimeout);
  }
};
