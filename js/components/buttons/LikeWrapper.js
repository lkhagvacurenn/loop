import { getFavStore, updateFavStore } from '../../utils/fav-utils.js';
import './LikeBtn.js';

class LikeWrapper extends HTMLElement {
  static get observedAttributes() {
    return ['product-id', 'likes', 'is-liked'];
  }

  constructor() {
    super();
    this._likes = 0;
    this._productId = null;
    this._isLiked = false;

    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {

    this.initializeState();
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'likes':
        this._likes = Number(newValue);
        break;
      case 'product-id':
        this._productId = Number(newValue);
        break;
      case 'is-liked':
        this._isLiked = this.hasAttribute('is-liked');
        break;
    }
    this.render();
  }

  initializeState() {
    if (!this._productId) {
      this._productId = Number(this.getAttribute('product-id'));
    }

    // Initialize likes from attributes
    const attrLikes = Number(this.getAttribute('likes'));

    // Get liked products from local storage
    const favs = getFavStore();
    const locallyLiked = favs.includes(this._productId);

    this._isLiked = locallyLiked;

    // Only increment local count if the attribute likes didn't include this user's like
    if (locallyLiked && !this.hasAttribute('is-liked')) {
      this._likes = attrLikes + 1;
    } else {
      this._likes = attrLikes;
    }

    // Synchronize attribute
    if (this._isLiked) {
      this.setAttribute('is-liked', '');
    } else {
      this.removeAttribute('is-liked');
    }
  }

  handleClick() {

  
    this._isLiked = !this._isLiked;

    if (this._isLiked) {
      this._likes += 1;
      this.setAttribute('is-liked', '');
    } else {
      this._likes = Math.max(0, this._likes - 1);
      this.removeAttribute('is-liked');
    }

    updateFavStore(this._productId, this._isLiked);
    // Re-render after state update
    this.render();
  }

  render() {
    this.innerHTML = '';

    const likeCount = document.createElement('span');
    likeCount.className = 'like-count';
    likeCount.textContent = this._likes;

    const likeBtn = document.createElement('like-btn');

    if (this._isLiked) {
      likeBtn.setAttribute('is-liked', '');
    } else {
      likeBtn.removeAttribute('is-liked');
    }

    likeBtn.addEventListener('click', this.handleClick);

    this.append(likeCount, likeBtn);
  }
}

customElements.define('like-wrapper', LikeWrapper);
