/*
? SCSS styles

.tabs__content {
  display: none;

  &.active-tab {
    display: block;
  }
}

.tabs__btn {
  &.active-tab-btn {
    ? Example
    border-color: #f2f2f2;
  }
}
*/

export const tabs = () => {
  // All tab togglers
  const tabTogglers = document.querySelectorAll('[data-tab-target]');

  // If exist
  if (tabTogglers.length > 0) {
    tabTogglers.forEach((tabToggler) => {
      tabToggler.addEventListener('click', (e) => {
        e.preventDefault();

        // If active tab toggler was clicked nothing changes
        if (e.target.closest('.active-tab-btn')) {
          return;
        }

        // Remove classes from active tab and tab toggler
        document.querySelector('.active-tab').classList.remove('active-tab');
        document.querySelector('.active-tab-btn').classList.remove('active-tab-btn');

        // Find tab by data attribute
        const tab = document.querySelector(`#${tabToggler.dataset.tabTarget}`);

        // Add active classes
        tab.classList.add('active-tab');
        tabToggler.classList.add('active-tab-btn');
      });
    });
  }
};
