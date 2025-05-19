const FAV_KEY = 'user-favs';

export function getFavStore() {
  const store = JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
  return store.map(Number);
}

export function updateFavStore(id, isLiked) {
  let store = getFavStore();

  if (isLiked) {
    if (!store.includes(id)) store.push(id);
  } else {
    store = store.filter(pid => pid !== id);
  }

  localStorage.setItem(FAV_KEY, JSON.stringify(store));
  updateFavBadge(); 
}

export function updateFavBadge() {
  const badge = document.getElementById('fav-icon-badge');
  if (!badge) return;

  const favs = getFavStore();
  const count = favs.length;
  console.log('✅ Badge Update:', count, 'items liked');


  if (count === 0) {
    badge.textContent = '';
    badge.style.display = 'none';
  } else {
    badge.textContent = count > 9 ? '10+' : count;
    badge.style.display = 'inline-block';
  }
}
