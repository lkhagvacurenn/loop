export default function CategoryCard({ image, alt, label, customTitle, link }) {
  const li = document.createElement('li');

  const article = document.createElement('article');
  article.className = 'category-card';

  const img = document.createElement('img');
  img.src = image;
  img.alt = alt;

  const h3 = document.createElement('h3');
  h3.textContent = customTitle || label; 

  article.append(img, h3);
  li.appendChild(article);

  article.addEventListener('click', () => {
    window.location.href = link;
  });

  return li;
}
