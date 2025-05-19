import { header } from './components/header.js';
import './components/navbar.js'; // navbar биш шүү!
import { footer } from './components/footer.js';
import { updateFavBadge } from './utils/fav-utils.js';
import router from './router.js';

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app") || document.body;

  const headerElement = document.createElement("header");
  headerElement.innerHTML = header();

  const navElement = document.createElement("category-navbar");

  const mainElement = document.createElement("main");
  mainElement.setAttribute("id", "main-content");

  const footerElement = document.createElement("footer");
  footerElement.innerHTML = footer();

  app.append(headerElement, navElement, mainElement, footerElement);
  
  updateFavBadge();

  // ✅ Load route on page load
  router();

  // ✅ Handle route changes when hash changes
  window.addEventListener('hashchange', router);
});
