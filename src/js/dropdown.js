// Import body and html
import { mainElems } from './app.js';

// Function that checks if the device has a touchscreen
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

export const dropdown = () => {
  if (isMobile.any()) {
    mainElems.body.classList.add('touch');

    touchDropdown();
  } else {
    mainElems.body.classList.add('mouse');
  }

  function touchDropdown() {
    // Find all dropdowns by data attribute
    const dropdowns = document.querySelectorAll('[data-dropdown]');

    // If exist
    if (dropdowns.length > 0) {
      dropdowns.forEach((dropdown) => {
        // Find arrow and list
        const arrow = dropdown.querySelector('.dropdown-arrow');
        const dropdownList = arrow.nextElementSibling;

        // Toggle is-active class for arrow and list
        arrow.addEventListener('click', (e) => {
          arrow.classList.toggle('is-active');
          dropdownList.classList.toggle('is-active');
        });
      });
    }
  }
};
