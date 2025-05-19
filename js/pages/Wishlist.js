export default function WishlistPage() {
  const container = document.createElement('section');
  container.className = 'main-container';
  container.innerHTML = `
    <h2>My Favorites</h2>
    <product-grid mode="wishlist"></product-grid>
  `;
  return container;
}
