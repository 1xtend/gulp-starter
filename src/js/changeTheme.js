// Import body and html
import { mainElems } from './app.js';

export const changeTheme = () => {
  window.addEventListener('load', windowLoad);

  function windowLoad() {
    // Html
    const saveUserTheme = localStorage.getItem('user-theme');

    // Default theme on PC
    let userTheme;
    if (window.matchMedia) {
      userTheme = window.matchMedia('(prefers-color-scheme: dark').matches ? 'dark' : 'light';
    }
    window.matchMedia('(prefers-color-scheme: dark').addEventListener('change', (e) => {
      !saveUserTheme ? changeTheme() : null;
    });

    // Change theme by clicking
    const themeToggler = document.querySelector('.theme-toggler__input');
    if (themeToggler) {
      themeToggler.addEventListener('click', () => {
        changeTheme(true);
      });
    }

    // Set theme class function
    function setThemeClass() {
      if (saveUserTheme) {
        mainElems.html.classList.add(saveUserTheme);
      } else {
        mainElems.html.classList.add(userTheme);
      }
    }
    setThemeClass();

    // Is toggler checked
    function setToggler() {
      if (saveUserTheme === 'dark') {
        themeToggler.checked = false;
      } else if (saveUserTheme === 'light') {
        themeToggler.checked = true;
      }
    }
    setToggler();

    // Change theme function
    function changeTheme(saveTheme = false) {
      let currentTheme = mainElems.html.classList.contains('light') ? 'light' : 'dark';
      let newTheme;

      if (currentTheme === 'light') {
        newTheme = 'dark';
      } else if (currentTheme === 'dark') {
        newTheme = 'light';
      }
      mainElems.html.classList.remove(currentTheme);
      mainElems.html.classList.add(newTheme);
      saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
    }
  }
};
