import { mainVars } from '../app.js';

/*

EXAMPLE

<a href="#" data-scroll="about">About</a>

*/

export const anchorScroll = () => {
  // Find all anchor links.
  const anchors = document.querySelectorAll('[data-scroll]');

  // If anchor links exist.
  if (anchors.length > 0) {
    // If header is fixed.
    const fixedHeader = document.querySelector('.header.fixed');
    const framesCount = 20;

    // Px from top to element.
    let scrollValue = 0;

    anchors.forEach((link) => {
      // Event listeners on anchor links.
      link.addEventListener('click', (e) => {
        e.preventDefault();

        // Element to scroll to.
        let scrollElem = document.querySelector(`#${link.dataset.scroll}`);

        // If burger has is-active class add timeout to give time burger to close menu.
        if (document.querySelector('.burger').classList.contains('is-active')) {
          const scrollTimeout = setTimeout(() => {
            handleScroll(scrollElem);

            clearTimeout(scrollTimeout);
          }, mainVars.transitionTime);
        } else {
          handleScroll(scrollElem);
        }
      });
    });

    function handleScroll(scrollElem) {
      // Count px from top to element.
      scrollValue = scrollElem.getBoundingClientRect().top + window.scrollY;

      // If header is fixed, count its height.
      if (fixedHeader) {
        let fixValue = scrollValue - fixedHeader.offsetHeight;
        scroll(fixValue);
      } else {
        scroll(scrollValue);
      }
    }

    function scroll(scrollValue) {
      const scroller = setInterval(() => {
        // Count how much to scroll for 1 cycle.
        let scrollBy = scrollValue / framesCount;

        // if the number of pixels for scrolling in 1 cycle is more than the distance to the element and the bottom of the page has not been reached.
        if (
          scrollBy > window.scrollY - scrollValue &&
          window.innerHeight + window.scrollY < mainVars.body.offsetHeight
        ) {
          // Then scroll by the number of pixels that corresponds to one measure.
          window.scrollBy(0, scrollBy);
        } else {
          // Otherwise, we get to the element and exit the interval.
          window.scrollTo({
            top: scrollValue,
            behavior: 'smooth',
          });
          clearInterval(scroller);
        }
      }, mainVars.transitionTime / framesCount);
    }
  }
};
