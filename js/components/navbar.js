class CategoryNavbar extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const filters = await this.loadFilters();
    this.render(filters);
  }

  async loadFilters() {
    const res = await fetch('/js/data/filters.json');
    if (!res.ok) throw new Error('Failed to load filters.json');
    return await res.json();
  }

  render(filters) {
    const nav = document.createElement('nav');
    nav.className = 'header-cat-nav';

    const ul = document.createElement('ul');
    ul.className = 'cat-list';

    const sexList = filters.sex;
    const categories = filters.categories;

    sexList.forEach((sex, index) => {
      const sexKey = ['men', 'women', 'kids','others'][index];

      const li = document.createElement('li');
      li.className = 'cat-item';

      const link = document.createElement('a');
      link.href = `#/category?sex=${sexKey}`;
      link.textContent = sex;

      const dropdown = document.createElement('ul');
      dropdown.className = 'dropdown';

      categories[sexKey].forEach(category => {
        const categoryItem = document.createElement('li');
        const categoryLink = document.createElement('a');
        categoryLink.href = `#/category?sex=${sexKey}&category=${encodeURIComponent(category)}`;
        categoryLink.textContent = category;
        categoryItem.appendChild(categoryLink);
        dropdown.appendChild(categoryItem);
      });

      li.appendChild(link);
      li.appendChild(dropdown);
      ul.appendChild(li);
    });

    nav.appendChild(ul);
    this.appendChild(nav);
  }
}

customElements.define('category-navbar', CategoryNavbar);
