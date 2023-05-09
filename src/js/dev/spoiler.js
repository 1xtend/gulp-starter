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
  // All Spoiler Wrappers containing spoilers.
  const spoilerWrappers = document.querySelectorAll('[data-spoilers-wrapper]');

  let spoilerWrappersLength = spoilerWrappers.length;

  // Check if Spoiler Wrapper(s) exist.
  if (spoilerWrappersLength > 0) {
    // Show spoiler function.
    function showSpoiler(spoiler, spoilerContent, activeSpoiler) {
      // Check if activeSpoiler exist.
      if (activeSpoiler) {
        // Find content inside active spoiler.
        let activeSpoilerContent = activeSpoiler.querySelector('[data-spoiler-content]');

        // Close active spoiler.
        hideSpoiler(activeSpoiler, activeSpoilerContent);
      }

      // Show spoiler.
      spoiler.classList.add('spoiler-active');
      spoilerContent.style.maxHeight = `${spoilerContent.scrollHeight}px`;
    }

    // Hide spoiler function.
    function hideSpoiler(spoiler, spoilerContent) {
      // Hide spoiler.
      spoiler.classList.remove('spoiler-active');
      spoilerContent.style.maxHeight = 0;
      spoilerContent.removeAttribute('style');
    }

    spoilerWrappers.forEach((spoilerWrapper) => {
      // Add event listeners on Spoiler Wrappers.
      spoilerWrapper.addEventListener('click', (e) => {
        // Stop function if e.target is not equal to data-spoiler-toggler.
        if (!e.target.closest('[data-spoiler-toggler]')) {
          return;
        }

        // Find spoiler and spoiler content.
        const spoiler = e.target.closest('[data-spoiler]');
        const spoilerContent = e.target.nextElementSibling;

        if (!spoiler.classList.contains('spoiler-active')) {
          // Find active spoiler.
          let activeSpoiler = spoilerWrapper.querySelector('.spoiler-active');

          // Show spoiler.
          showSpoiler(spoiler, spoilerContent, activeSpoiler);
        } else {
          // Hide spoiler.
          hideSpoiler(spoiler, spoilerContent);
        }
      });
    });
  }
};
