import './LikeButton.js';

class ProductCard extends HTMLElement {
  static get observedAttributes() {
    return ['id', 'title', 'price', 'images', 'likes'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const id = Number(this.getAttribute('id'));
    const title = this.getAttribute('title');
    const price = Number(this.getAttribute('price'));
    const likes = Number(this.getAttribute('likes')) || 0;
    const images = JSON.parse(this.getAttribute('images') || '[]');

    // Clear previous content
    this.innerHTML = '';

    // Create elements
    const wrapper = document.createElement('article');
    wrapper.className = 'product-card';

    const img = document.createElement('img');
    img.className = 'product-img';
    img.src = images[0] || '';
    img.alt = 'Product Image';

    if (images.length > 1) {
      img.addEventListener('mouseenter', () => img.src = images[1]);
      img.addEventListener('mouseleave', () => img.src = images[0]);
    }

    const h3 = document.createElement('h3');
    h3.textContent = title;

    const h4 = document.createElement('h4');
    h4.textContent = `${price.toLocaleString()}₮`;

    const likeComponent = document.createElement('like-button');
    likeComponent.setAttribute('product-id', id);
    likeComponent.setAttribute('likes', likes);
    
    // Append all
    wrapper.append(img, h3, h4, likeComponent);
    this.appendChild(wrapper);
  }
}

customElements.define('product-card', ProductCard);
