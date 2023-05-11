// Import body and html.
import { bodyLock, bodyUnLock } from './bodyLock.js';

/*

EXAMPLE

<button type="button" class="burger">
  <span></span>
</button>

*/

// Burger.
export const burger = () => {
  // Find a burger.
  const burger = document.querySelector('.burger');

  // If burger exists.
  if (burger) {
    const navbar = document.querySelector('.navbar');

    // Event listener on a burger.
    burger.addEventListener('click', (e) => {
      // If burger has is-active class hide menu, else show menu.
      if (!burger.classList.contains('is-active')) {
        addClasses();
        bodyLock();
      } else {
        removeClasses();
        bodyUnLock();
      }
    });

    // Add classes function.
    function addClasses() {
      burger.classList.add('is-active');
      navbar.classList.add('is-active');
      navbar.addEventListener('click', handleNavbarClick);
    }

    // Remove classes function.
    function removeClasses() {
      burger.classList.remove('is-active');
      navbar.classList.remove('is-active');
      navbar.removeEventListener('click', handleNavbarClick);
    }

    // Close menu by click on navbar link function.
    function handleNavbarClick(e) {
      if (e.target.closest('.navbar__link')) {
        // Don't unlock body if e.target is a btn that open modal.
        if (!e.target.closest('[data-open-modal]')) {
          bodyUnLock();
        }

        // Remove classes.
        removeClasses();
      }
    }
  }
};
