const FAV_KEY = 'user-favs'; 

export function getFavStore() {
  return JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
}

export function updateFavStore(id, liked) {
  let store = getFavStore();

  if (liked) {
    if (!store.includes(id)) store.push(id);
  } else {
    store = store.filter(pid => pid !== id);
  }

  localStorage.setItem(FAV_KEY, JSON.stringify(store));
}


export function updateFavBadge() {
  const badge = document.getElementById('fav-icon-badge');
  if (!badge) return;

  const favs = JSON.parse(localStorage.getItem('user-favs') || '[]');
  const count = favs.length;

  if (count === 0) {
    badge.textContent = '';
    badge.style.display = 'none';
  } else if (count < 10) {
    badge.textContent = count;
    badge.style.display = 'inline-block';
  } else {
    badge.textContent = '10+';
    badge.style.display = 'inline-block';
  }
}


