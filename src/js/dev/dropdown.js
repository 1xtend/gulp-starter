// Import body and html
import { mainVars } from '../app.js';

/*

EXAMPLE

<li class="dropdown">
  <a href="#" class="dropdown__link">link</a>
  <button type="button" class="dropdown__arrow dropdown-arrow"></button>
  <ul class="dropdown__list list-dropdown">
    <li class="list-dropdown__item">
      <a href="#" class="list-dropdown__link">link2</a>
    </li>
  </ul>
</li>

*/

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
    mainVars.body.classList.add('touch');

    touchDropdown();
  } else {
    mainVars.body.classList.add('mouse');
  }

  function touchDropdown() {
    // All Dropdown Wrappers containing dropdowns.
    const dropdownWrappers = document.querySelectorAll('[data-dropdowns-wrapper]');

    let dropdownWrappersLength = dropdownWrappers.length;

    // Check if Dropdown Wrapper(s) exist.
    if (dropdownWrappersLength > 0) {
      // Vars for active dropdown.
      let activeDropdown;
      let activeDropdownList;

      // Show List function.
      function showList(dropdown, dropdownList, dropdownWrapper) {
        // Active dropdown.
        activeDropdown = dropdownWrapper.querySelector('.active-dropdown');

        // Check if Active dropdown exist.
        if (activeDropdown) {
          // Hide Active dropdown.
          activeDropdownList = activeDropdown.querySelector('[data-dropdown-list]');
          hideList(activeDropdown, activeDropdownList);
        }

        // Show dropdown.
        dropdown.classList.add('active-dropdown');
        dropdownList.style.maxHeight = `${dropdownList.scrollHeight}px`;
      }

      // Hide dropdown function.
      function hideList(dropdown, dropdownList) {
        dropdown.classList.remove('active-dropdown');

        dropdownList.style.maxHeight = 0;
        dropdownList.removeAttribute('style');

        activeDropdown = null;
      }

      dropdownWrappers.forEach((dropdownWrapper) => {
        // Add event listeners on Dropdown Wrappers.
        dropdownWrapper.addEventListener('click', (e) => {
          // Stop function if e.target is not equal to data-dropdown-toggler.
          if (!e.target.closest('[data-dropdown-toggler]')) {
            return;
          }

          // Find dropdown and dropdown list.
          const dropdown = e.target.closest('[data-dropdown-item]');
          const dropdownList = e.target.nextElementSibling;

          if (!dropdown.classList.contains('active-dropdown')) {
            // Show dropdown
            showList(dropdown, dropdownList, dropdownWrapper);
          } else {
            // Hide dropdown
            hideList(dropdown, dropdownList);
          }
        });
      });
    }
  }
};
