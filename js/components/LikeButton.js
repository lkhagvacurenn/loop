
import { getFavStore, updateFavStore, updateFavBadge } from '../utils/fav-utils.js';

class LikeButton extends HTMLElement {
  static get observedAttributes() {
    return ['product-id', 'likes'];
  }

  constructor() {
    super();
    this._likes = 0;
    this._productId = null;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name,  newValue) {
    if (name === 'likes') {
      this._likes = Number(newValue);
    }
    if (name === 'product-id') {
      this._productId = Number(newValue);
    }
    this.render();
  }

  render() {
    this.innerHTML = ''; // clear old content

    const likeCount = document.createElement('span');
    likeCount.className = 'like-count';
    likeCount.textContent = this._likes;

    const svgWrapper = document.createElement('div');
    svgWrapper.classList.add('fav-icon');

    const isLiked = getFavStore().includes(this._productId);
    if (isLiked) svgWrapper.classList.add('active');

    svgWrapper.innerHTML = `
      <svg fill="currentColor" viewBox="0 0 16 16">
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
      </svg>
    `;

    svgWrapper.addEventListener('click', () => {
      const liked = svgWrapper.classList.toggle('active');
      this._likes = liked ? this._likes + 1 : Math.max(this._likes - 1, 0);
      likeCount.textContent = this._likes;

      updateFavStore(this._productId, liked);
      if (!liked && window.location.pathname.includes('wishlist')) {
        this.closest('product-card')?.remove();
      }      
      updateFavBadge();
    });

    this.append(likeCount, svgWrapper);
  }
}

customElements.define('like-button', LikeButton);
