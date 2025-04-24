import CategoryGrid from './CategoryGrid.js';

export default async function PriceSlider() {
  const form = document.createElement('form');
  form.className = 'price-slider-container';

  const labels = document.createElement('article');
  labels.className = 'range-labels';
  labels.setAttribute('aria-hidden', 'true');

  const min = document.createElement('span');
  min.textContent = '10,000₮';

  const mid = document.createElement('span');
  mid.textContent = '10,000₮';
  mid.id = 'midPrice';

  const max = document.createElement('span');
  max.textContent = '500,000₮';

  labels.append(min, mid, max);

  const input = document.createElement('input');
  input.type = 'range';
  input.name = 'price';
  input.min = '10000';
  input.max = '500000';
  input.step = '5000';
  input.value = '10000';
  input.className = 'price-slider';

  form.append(labels, input);

  const viewMore = document.createElement('a');
  viewMore.textContent = 'View more';
  viewMore.className = 'view-more-link';

  // --- Initial Grid ---
  let currentPrice = parseInt(input.value);
  let grid = await CategoryGrid({ price: currentPrice });
  viewMore.href = `/search.html?price=${currentPrice}`;

  input.addEventListener('input', async () => {
    currentPrice = parseInt(input.value);
    mid.textContent = `${currentPrice.toLocaleString()}₮`;
    viewMore.href = `/search.html?price=${currentPrice}`;

    const newGrid = await CategoryGrid({ price: currentPrice });
    const oldGrid = grid;
    oldGrid.replaceWith(newGrid);
    grid = newGrid;
  });

  return { form, viewMore, grid };
}
