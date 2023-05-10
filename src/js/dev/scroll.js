import { mainElems } from '../app.js';

/*

EXAMPLE

<a href="#" data-scroll="about">About</a>

*/

export const anchorScroll = () => {
  const anchors = document.querySelectorAll('[data-scroll]');
  const fixedHeader = document.querySelector('.header.fixed');
  console.log(fixedHeader);

  let anchorsLength = anchors.length;

  if (anchorsLength > 0) {
    anchors.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const scrollElem = document.querySelector(`#${link.dataset.scroll}`);

        if (!scrollElem) {
          return;
        }

        let scrollValue = scrollElem.getBoundingClientRect().top + window.scrollY;

        if (fixedHeader) {
          let fixedValue = scrollValue - fixedHeader.offsetHeight;
          scroll(fixedValue);
        } else {
          scroll(scrollValue);
        }
      });
    });

    function scroll(scrollValue, animationTime = 300, framesCount = 20) {
      const scroller = setInterval(() => {
        let scrollBy = scrollValue / framesCount;

        if (
          scrollBy > window.scrollY - scrollValue &&
          window.innerHeight + window.scrollY < mainElems.body.offsetHeight
        ) {
          window.scrollBy(0, scrollBy);
        } else {
          window.scrollTo({
            top: scrollValue,
            behavior: 'smooth',
          });
          clearInterval(scroller);
        }
      }, animationTime / framesCount);
    }
  }
};
