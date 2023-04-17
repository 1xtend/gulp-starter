/*
Button example

<button type="button" data-modal="modal_1">Open</button>
*/

export const modal = () => {
  // Vars
  const html = document.documentElement;
  const body = document.body;

  const modalTogglers = document.querySelectorAll('[data-modal]');
  const lockPadding = document.querySelectorAll('lock-padding');

  const transitionValue = 300;

  // Is required to save scroll position
  let scrollPosition = 0;

  // Is required for locking body
  let unlock = true;

  // Is required for closing modal by Escape
  let isModalActive = false;

  // Event listeners on elements with data-modal attribute
  if (modalTogglers.length > 0) {
    modalTogglers.forEach((modalToggler) => {
      modalToggler.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = modalToggler.dataset.modal;
        const currentModal = document.querySelector(`#${targetId}`);

        modalOpen(currentModal);

        saveScroll();
      });
    });
  }

  // Close modal by click on element with close-modal class
  const modalCloseBtns = document.querySelectorAll('.close-modal');
  if (modalCloseBtns.length > 0) {
    modalCloseBtns.forEach((closeBtn) => {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();

        modalClose(closeBtn.closest('.modal'));
      });
    });
  }

  // Open modal
  function modalOpen(currentModal) {
    if (currentModal && unlock) {
      const modalActive = document.querySelector('.modal.is-active');
      isModalActive = true;

      if (modalActive) {
        modalClose(modalActive, false);
      } else {
        bodyLock();
      }

      currentModal.classList.add('is-active');
      currentModal.addEventListener('click', (e) => {
        if (!e.target.closest('.modal__content')) {
          modalClose(e.target.closest('.modal'));
        }
      });
    }
  }

  // Close modal
  function modalClose(modalActive, doUnlock = true) {
    if (unlock) {
      modalActive.classList.remove('is-active');
      isModalActive = false;

      if (doUnlock) {
        bodyUnLock();
        resetScroll();
      }
    }
  }

  // Lock body on desktop and mobile devices
  function bodyLock() {
    const lockPaddingValue =
      window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
      lockPadding.forEach((lockElem) => {
        lockElem.style.paddingRight = lockPaddingValue;
      });
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('is-locked');

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, transitionValue);
  }

  // Unlock body on desktop and mobile devices
  function bodyUnLock() {
    setTimeout(() => {
      if (lockPadding.length > 0) {
        lockPadding.forEach((lockElem) => {
          lockElem.style.paddingRight = '0px';
        });
      }

      body.style.paddingRight = '0px';
      body.classList.remove('is-locked');
    }, transitionValue);

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, transitionValue);
  }

  // Save element position
  function saveScroll() {
    scrollPosition = window.pageYOffset;
    html.style.position = 'fixed';
    html.style.top = -scrollPosition + 'px';
  }

  // Scroll to saved position and reset saved value
  function resetScroll() {
    setTimeout(() => {
      html.style.top = '';
      html.style.position = 'relative';
      window.scrollTo(0, scrollPosition);
    }, transitionValue);
  }

  // Close modal by clicking on Escape key
  document.addEventListener('keyup', (e) => {
    if (e.code === 'Escape' && isModalActive) {
      const modalActive = document.querySelector('.modal.is-active');
      modalClose(modalActive);
    }
  });
};
