import SliderItem from './SliderItem.js';

export default async function Slider() {
  const article = document.createElement('article');
  article.className = 'slider';

  try {
    const response = await fetch('/js/data/brand.json');
    const brandData = await response.json();

    article.style.setProperty('--quantity', brandData.length);

    brandData.forEach((item, index) => {
      const sliderItem = SliderItem({
        image: item.logo,
        brand: item.brand,
        position: index + 1
      });

      article.appendChild(sliderItem);
    });

  } catch (err) {
    console.error('Failed to load brand.json:', err);
    article.innerHTML = '<p>Unable to load brands.</p>';
  }

  return article;
}
