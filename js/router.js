import HomePage from './pages/Home.js';
import WishlistPage from './pages/Wishlist.js';
import ProfilePage from './pages/Profile.js';
import CategoryPage from './pages/Category.js'; // ➡️ CategoryPage импортлоно

export default async function router() {
  const fullHash = location.hash || '#/';
  const [path, queryString] = fullHash.split('?');

  const main = document.getElementById('main-content');
  main.innerHTML = '';

  const queryParams = parseQueryString(queryString);

  switch (path) {
    case '#/':
      main.appendChild(await HomePage());
      break;
    case '#/wishlist':
      main.appendChild(await WishlistPage());
      break;
    case '#/profile':
      main.appendChild(await ProfilePage());
      break;
    case '#/category':
      main.appendChild(await CategoryPage(queryParams)); 
      break;
    default:
      main.innerHTML = '<h2>404 - Page Not Found</h2>';
  }
}

function parseQueryString(queryString) {
  const params = {};
  if (!queryString) return params;

  queryString.split('&').forEach(param => {
    const [key, value] = param.split('=');
    params[key] = decodeURIComponent(value);
  });

  return params;
}
