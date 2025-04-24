import { header } from './components/header.js';
import { footer } from './components/footer.js';
import router from './router.js';

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app") || document.body;

  const headerElement = document.createElement("header");
  headerElement.innerHTML = header();

  const mainElement = document.createElement("main");
  mainElement.setAttribute("id", "main-content");

  const footerElement = document.createElement("footer");
  footerElement.innerHTML = footer();

  app.appendChild(headerElement);
  app.appendChild(mainElement);
  app.appendChild(footerElement);

  // ✅ Load route on page load
  router();

  // ✅ Handle route changes when hash changes
  window.addEventListener('hashchange', router);
});
