import { getFavStore } from '../utils/fav-utils.js';
import { fetchProducts } from '../api//api.js'; // DummyJSON
import '../components/ProductCard.js'; 

async function renderWishlist() {
  const container = document.getElementById('wishlist-content');
  container.innerHTML = '<h2>My Wishlist</h2>';

  const favIds = getFavStore();
  if (favIds.length === 0) {
    container.innerHTML += '<p>You haven’t liked anything yet </p>';
    return;
  }

  const list = document.createElement('ul');
  list.className = 'product-content';

  const { products } = await fetchProducts(100); 

  const filtered = products.filter(p => favIds.includes(p.id));
  filtered.forEach(p => {
    const card = document.createElement('product-card');
    card.setAttribute('id', p.id);
    card.setAttribute('title', p.title);
    card.setAttribute('price', p.price);
    card.setAttribute('likes', p.likes || 0);
    card.setAttribute('images', JSON.stringify(p.images));
    list.appendChild(card);
  });

  container.appendChild(list);
}

document.addEventListener('DOMContentLoaded', renderWishlist);
