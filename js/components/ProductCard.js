import './buttons/LikeWrapper.js';

class ProductCard extends HTMLElement {
  static get observedAttributes() {
    return ['id', 'title', 'price', 'images', 'likes', 'is-liked'];
  }

  constructor() {
    super();
    this.render = this.render.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const id = Number(this.getAttribute('id'));
    const title = this.getAttribute('title');
    const price = Number(this.getAttribute('price'));
    const likes = Number(this.getAttribute('likes'));
    const isLiked = this.hasAttribute('is-liked');
    const images = JSON.parse(this.getAttribute('images') || '[]');

    this.innerHTML = '';

    const img = document.createElement('img');
    img.className = 'product-img';
    img.src = images[0] || '';
    img.alt = title;

    if (images.length > 1) {
      img.addEventListener('mouseenter', () => img.src = images[1]);
      img.addEventListener('mouseleave', () => img.src = images[0]);
    }

    const h3 = document.createElement('h3');
    h3.textContent = title;

    const h4 = document.createElement('h4');
    h4.textContent = `${price.toLocaleString()}₮`;

    const likeComponent = document.createElement('like-wrapper');
    likeComponent.setAttribute('product-id', id);
    likeComponent.setAttribute('likes', likes);

    if (isLiked) {
      likeComponent.setAttribute('is-liked', '');
    } else {
      likeComponent.removeAttribute('is-liked');
    }

    this.append(img, h3, h4, likeComponent);
  }
}

customElements.define('product-card', ProductCard);
