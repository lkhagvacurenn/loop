const BASE_URL = 'https://dummyjson.com'; //bichihed hylbar bolnoo

// ✅ 1. Products awah (GET)
export async function fetchProducts(limit = 10, skip = 0) {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return await res.json();
}

// ✅ 2. Hailt hiih (GET)
export async function searchProducts(query) {
  const res = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Search failed');
  return await res.json();
}

// ✅ 3. Buteegdehuun awah (GET)
export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return await res.json();
}

// ✅ 4. Taalagdsand nemeh (POST)
export async function addToFac(userId, items) {
  const res = await fetch(`${BASE_URL}/fav/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      products: items,
    })
  });
  if (!res.ok) throw new Error('Failed to add to cart');
  return await res.json();
}
