import CategoryCard from './CategoryCard.js';

export default async function CategoryGrid({price }={}) {
  const ul = document.createElement('ul');
  ul.className = 'category-grid';
  
  try {
    const response = await fetch('/js/data/categories.json');
    const categories = await response.json();
    categories.forEach(cat => {
      const title = price ? `${price.toLocaleString()}₮-н ${cat.label}` : cat.label;
      const link = price
        ? `/search.html?category=${cat.label.toLowerCase()}&price=${price}`
        : `/search.html?category=${cat.label.toLowerCase()}`;
  
      ul.appendChild(CategoryCard({
        image: cat.image,
        alt: cat.alt,
        label: cat.label,
        customTitle: title,
        link: link
      }));
    });

  } catch (err) {
    console.error('Failed to load categories:', err);
    ul.innerHTML = '<li>Error loading categories.</li>';
  }

  return ul;
}
