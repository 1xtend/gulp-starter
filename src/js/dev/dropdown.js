// Import body and html
import { mainElems } from '../app.js';

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
    const dropdowns = document.querySelectorAll('.dropdown');

    let activeDropdown;
    let activeDropdownList;

    if (dropdowns.length > 0) {
      dropdowns.forEach((dropdown) => {
        const dropdownArrow = dropdown.querySelector('.dropdown-arrow');

        dropdownArrow.addEventListener('click', (e) => {
          const showDropdown = document.querySelector('.show-dropdown');

          toggleDropdown(dropdown);

          if (showDropdown && showDropdown !== dropdown) {
            toggleDropdown(showDropdown);
          }
        });
      });
    }

    function toggleDropdown(dropdown) {
      const dropdownList = dropdown.querySelector('.dropdown__list');

      if (dropdown.classList.contains('show-dropdown')) {
        dropdownList.removeAttribute('style');
        dropdown.classList.remove('show-dropdown');

        window.removeEventListener('click', windowClose);

        activeDropdown = null;
      } else {
        dropdownList.style.height = dropdownList.scrollHeight + 'px';
        dropdown.classList.add('show-dropdown');
        activeDropdown = document.querySelector('.show-dropdown');

        window.addEventListener('click', windowClose);
      }
    }

    function windowClose(e) {
      if (!e.target.closest('.dropdown-arrow')) {
        activeDropdown.classList.remove('show-dropdown');
        activeDropdownList.removeAttribute('style');
        window.removeEventListener('click', windowClose);
      }
    }
  }
};
