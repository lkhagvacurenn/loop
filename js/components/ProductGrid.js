import { fetchProducts } from '../utils/api/api.js';
import { getFavStore } from '../utils/fav-utils.js';
import '../components/ProductCard.js';

class ProductGrid extends HTMLElement {
  static get observedAttributes() {
    return ['mode', 'filters'];
  }

  constructor() {
    super();
    this.mode = 'home';     
    this.filters = {};      
    this.products = [];     
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'mode') {
      this.mode = newValue;
      this.render();
    }
    if (name === 'filters') {
      try {
        this.filters = JSON.parse(newValue) || {};
        this.render();
      } catch (err) {
        console.error('Invalid filters JSON:', newValue);
      }
    }
  }

  async connectedCallback() {
    try {
      this.products = await fetchProducts();
      this.render();
    } catch (error) {
      console.error(' Failed to load products', error);
      this.innerHTML = '<p>⚡ Failed to load products.</p>';
    }
  }

  render() {
    this.innerHTML = '';
    const wrapper = document.createElement('ul');
    wrapper.className = 'product-content';

    let filteredProducts = [...this.products];

    // ✅ 1. status = 'available' байхыг шалгана
    filteredProducts = filteredProducts.filter(p => p.status === 'available');

    // ✅ 2. mode тусгай шүүлт
    if (this.mode === 'wishlist') {
      const favs = getFavStore();
      filteredProducts = filteredProducts.filter(p => favs.includes(p.id));
    } else if (this.mode === 'profile') {
      const currentUserId = 1; // TODO: Dynamic авах
      console.warn('profile mode: sellerId field байхгүй байна. Бүх барааг үзүүлж байна.');
    } else if (this.mode === 'home') {
      filteredProducts = filteredProducts.slice(0, 10);
    }

    // ✅ 3. filters attribute-оор нэмэлт шүүлт
    Object.keys(this.filters).forEach(key => {
      const value = this.filters[key];
      if (!value) return;

      if (key === 'minPrice') {
        filteredProducts = filteredProducts.filter(p => p.price >= Number(value));
      } else if (key === 'maxPrice') {
        filteredProducts = filteredProducts.filter(p => p.price <= Number(value));
      } else {
        filteredProducts = filteredProducts.filter(p => String(p[key]) === String(value));
      }
    });

    // ✅ 4. Products зурна
    if (filteredProducts.length === 0) {
      const empty = document.createElement('p');
      empty.textContent = ' Шалгуурт нийцсэн бараа олдсонгүй.';
      this.appendChild(empty);
      return;
    }

    filteredProducts.forEach(p => {
      const card = document.createElement('product-card');
      card.setAttribute('id', p.id);
      card.setAttribute('title', p.title);
      card.setAttribute('price', p.price);
      card.setAttribute('images', JSON.stringify(p.images));
      card.setAttribute('likes', p.likedCount);
      card.setAttribute('color', p.color || '');
    card.setAttribute('brand', p.brand || '');
    card.setAttribute('size', p.size || '');
    card.setAttribute('condition', p.condition || '');
    card.setAttribute('subcategory', p.subcategory || '');

      const favs = getFavStore();
      if (favs.includes(p.id)) {
        card.setAttribute('is-liked', '');
      }

      wrapper.appendChild(card);
    });

    this.appendChild(wrapper);
  }
}

customElements.define('product-grid', ProductGrid);
