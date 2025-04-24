import { fetchProducts } from '../api/api.js';
import '../components/ProductCard.js'; // <-- add this


class ProductGrid extends HTMLElement {
  async connectedCallback() {
    const wrapper = document.createElement('ul');
    wrapper.className = 'product-content';

    const data = await fetchProducts(10, 0); // default 10 products
    data.products.forEach(p => {
      const card = document.createElement('product-card');
      card.setAttribute('id', p.id);
      card.setAttribute('title', p.title);
      card.setAttribute('price', p.price);
      card.setAttribute('images', JSON.stringify(p.images));
      card.setAttribute('likes', p.likes || 0);
      wrapper.appendChild(card);
    });

    this.appendChild(wrapper);
  }
}

customElements.define('product-grid', ProductGrid);
