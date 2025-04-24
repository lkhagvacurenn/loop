import HomePage from './pages/Home.js';
import Profile from './pages/Profile.js';

export default async function router() {
  const path = location.hash || '#/';
  const main = document.getElementById('main-content');
  main.innerHTML = '';

  switch (path) {
    case '#/':
    case '#/index':
      main.appendChild(await HomePage());
      break;
    case '#/profile':
      main.appendChild(Profile());
      break;
    default:
      main.innerHTML = '<h1>404 - Not Found</h1>';
  }
}
