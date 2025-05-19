import { BASE_URL, USE_MOCK_DATA } from './config.js';

// 1. Products авах
export async function fetchProducts(limit, skip) {
  const url = USE_MOCK_DATA 
    ? `${BASE_URL}/products.json`
    : `${BASE_URL}/products?limit=${limit}&skip=${skip}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  return await res.json();
}

// 2. Хайлт хийх
export async function searchProducts(query) {
  if (USE_MOCK_DATA) {
    const res = await fetch(`${BASE_URL}/products.json`);
    const products = await res.json();
    return products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
  } else {
    const res = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Search failed');
    return await res.json();
  }
}

// 3. Бүтээгдэхүүн авах (id-аар)
export async function getProductById(id) {
  if (USE_MOCK_DATA) {
    const res = await fetch(`${BASE_URL}/products.json`);
    const products = await res.json();
    return products.find(p => p.id === id);
  } else {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return await res.json();
  }
}

// 4. Hereglegchid taalagdsan eseh 

export async function fetchLikedProducts(id) {
  if (USE_MOCK_DATA) {
    const res = await fetch(`${BASE_URL}/user.json`);
    const user = await res.json();
    return user.favorites;
  } else {
    const res = await fetch(`${BASE_URL}/fav/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
    });
    if (!res.ok) throw new Error('Failed to check favorite status');
    return await res.json();
  }
}
