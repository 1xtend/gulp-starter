export const tabs = () => {
  // All Tab Wrappers which containing tabs.
  const tabWrappers = document.querySelectorAll('[data-tab-wrapper]');

  let tabWrappersLength = tabWrappers.length;

  // Check if Tab Wrapper(s) exist.
  if (tabWrappersLength > 0) {
    // Function that finds Tab Content by data attribute and returns it.
    function findTabContent(targetId, tabWrapper) {
      return tabWrapper.querySelector(`[data-tab-content="${targetId}"]`);
    }

    // Show Tab function.
    function showTab(tabToggler, tabContent, tabWrapper) {
      // Find Active Tab.
      let activeTab = tabWrapper.querySelector('.active-tab-toggler');

      // Check if Active Tab exists.
      if (activeTab) {
        // Find Active Tab Content.
        const activeTabContent = findTabContent(activeTab.dataset.showTab, tabWrapper);

        // Hide Active Tab.
        hideTab(activeTab, activeTabContent);
      }

      // Show Tab.
      tabToggler.classList.add('active-tab-toggler');
      tabContent.classList.add('active-tab-content');
    }

    // Hide Tab function.
    function hideTab(tabToggler, tabContent) {
      tabToggler.classList.remove('active-tab-toggler');
      tabContent.classList.remove('active-tab-content');
    }

    tabWrappers.forEach((tabWrapper) => {
      // Add event listeners on Tabs Wrappers.
      tabWrapper.addEventListener('click', (e) => {
        // Stop default action.
        e.preventDefault();

        // Stop function if e.target is not equal to data-show-tab or .active-tab-toggler.
        if (!e.target.closest('[data-show-tab]') || e.target.closest('.active-tab-toggler')) {
          return;
        }

        // Find Tab Toggler and Tab Content
        const tabToggler = e.target.closest('[data-show-tab]');
        const tabContentId = tabToggler.dataset.showTab;
        const tabContent = findTabContent(tabContentId, tabWrapper);

        // Show Tab
        showTab(tabToggler, tabContent, tabWrapper);
      });
    });
  }
};
