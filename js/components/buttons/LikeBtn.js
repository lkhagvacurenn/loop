class LikeBtn extends HTMLElement {
    static get observedAttributes() {
      return ['is-liked'];
    }
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'is-liked' && oldValue !== newValue) {
        this.render();
      }
    }
  
    render() {
      const isActive = this.hasAttribute('is-liked');
  
      const svgHTML = isActive
        ? `
        <svg   fill="currentColor"  viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
        </svg>
        `
        : `
        <svg fill="currentColor"  viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
        </svg>
        `
;
  
      this.shadowRoot.innerHTML = `
        <style>
          .icon {
            cursor: pointer;
            display: inline-flex;
            transition: color 0.3s ease;
          }
          svg {
            width: 18px;
            height: 18px;
            fill: var(--primary-color);
          }
        </style>
        <div class="icon">${svgHTML}</div>
      `;
    }
  }
  
  customElements.define('like-btn', LikeBtn);
  