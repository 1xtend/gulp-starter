/*

! EXAMPLE

HTML

<div class="block__spoiler spoiler-block" data-spoiler>
  <button class="spoiler-block__toggler" type="button" data-spoiler-toggler>
    Open spoiler
  </button>
  <div class="spoiler-block__content" data-spoiler-content>
    <div class="spoiler-block__wrapper">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias optio repudiandae
      perferendis.
    </div>
  </div>
</div>

CSS

.spoiler {
  overflow: hidden;

  &.spoiler-active &__content {
    visibility: visible;
    opacity: 1;
  }

  &.spoiler-active &__toggler::after {
    transform: rotate(-135deg);
  }

  &__wrapper {
    padding: rem(15);
  }

  &__content {
    max-height: 0;
    opacity: 0;
    visibility: hidden;

    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }
}

*/

export const spoiler = () => {
  const spoilers = document.querySelectorAll('[data-spoiler]');

  if (spoilers.length > 0) {
    spoilers.forEach((spoiler) => {
      spoiler.addEventListener('click', (e) => {
        if (!e.target.closest('[data-spoiler-toggler]')) {
          return;
        }

        const spoilerContent = spoiler.querySelector('[data-spoiler-content]');

        if (!spoiler.classList.contains('spoiler-active')) {
          const activeSpoiler = document.querySelector('.spoiler-active');

          if (activeSpoiler) {
            activeSpoiler.classList.remove('spoiler-active');

            const activeSpoilerContent = activeSpoiler.querySelector('[data-spoiler-content]');
            activeSpoilerContent.style.maxHeight = 0;
            activeSpoilerContent.removeAttribute('style');
          }

          spoiler.classList.add('spoiler-active');
          spoilerContent.style.maxHeight = spoilerContent.scrollHeight + 'px';
        } else {
          spoiler.classList.remove('spoiler-active');
          spoilerContent.style.maxHeight = 0;
          spoilerContent.removeAttribute('style');
        }
      });
    });
  }
};
