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
  const tabs = document.querySelectorAll('.tabs');

  if (tabs.length > 0) {
    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        handleTab(tab, e);
      });
    });
  }

  function handleTab(tab, e) {
    e.preventDefault();

    if (e.target.closest('.active-tab-btn') || !e.target.closest('[data-tab-target]')) {
      return;
    }

    tab.querySelector('.active-tab-btn').classList.remove('active-tab-btn');
    tab.querySelector('.active-tab').classList.remove('active-tab');

    const tabToggler = e.target.closest('[data-tab-target]');
    const tabContent = tab.querySelector(`#${tabToggler.dataset.tabTarget}`);

    tabToggler.classList.add('active-tab-btn');
    tabContent.classList.add('active-tab');
  }
};
