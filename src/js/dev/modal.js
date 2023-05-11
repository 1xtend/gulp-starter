// Import body and html
import { mainVars } from '../app.js';
import { bodyLock, bodyUnLock } from './bodyLock.js';

export const modal = () => {
  // Active modal (for closing).
  let activeModal;
  let previousModal;

  // Event listeners on modal togglers.
  const modalTogglers = document.querySelectorAll('[data-open-modal]');

  let modalTogglersLength = modalTogglers.length;

  if (modalTogglersLength > 0) {
    modalTogglers.forEach((modalToggler) => {
      modalToggler.addEventListener('click', (e) => {
        // Find modal by data attribute.
        const modalId = e.target.closest('[data-open-modal]').dataset.openModal;
        const currentModal = document.querySelector(`[data-modal="${modalId}"]`);

        openModal(currentModal);

        e.preventDefault();
      });
    });
  }

  // Open modal.
  function openModal(currentModal) {
    previousModal = document.querySelector('.active-modal');

    // Close previous modal.
    if (previousModal) {
      closeModal(previousModal, false);
    } else {
      bodyLock();
    }

    currentModal.classList.add('active-modal');
    activeModal = currentModal;

    // Add event listeners to close modal by pressing Escape or clicking on backdrop.
    window.addEventListener('keyup', closeModalByEscape);
    currentModal.addEventListener('click', modalHandleClick);
  }

  // Close modal
  function closeModal(currentModal, doUnlock = true) {
    currentModal.classList.remove('active-modal');

    // Enable scroll if doUnlock = true.
    if (doUnlock) {
      setTimeout(() => {
        bodyUnLock();
      }, mainVars.transitionTime);
    }

    // Remove event listeners.
    window.removeEventListener('keyup', closeModalByEscape);
    currentModal.removeEventListener('click', modalHandleClick);

    activeModal = null;
  }

  // Close modal by pressing Escape.
  function closeModalByEscape(e) {
    if (e.code === 'Escape') {
      closeModal(activeModal);
    }
  }

  // Close modal by clicking on backdrop or close btn.
  function modalHandleClick(e) {
    if (!e.target.closest('[data-modal-body]') || e.target.closest('[data-modal-close]')) {
      e.preventDefault();
      closeModal(activeModal);
    }
  }
};
