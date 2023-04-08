export const burger = () => {
  const burger = document.querySelector('.burger');
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
  });
};
