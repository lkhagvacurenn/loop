export default function CategoryPage(params) {
  const container = document.createElement('section');
  container.className = 'main-container';

  // 🔥 sex query-г хөрвүүлж Монгол үг болгоно
  const sexMap = {
    men: 'Эрэгтэй',
    women: 'Эмэгтэй',
    kids: 'Хүүхдийн',
    others: 'Бусад',
  };

  const sexLabel = sexMap[params.sex] || 'Бүх'; 
  container.innerHTML = `
    <h2>${sexLabel} бэлэн бараа</h2>    
    <product-grid filters='{"sex":"women","category":"dress"}></product-grid>
  `;

  return container;
}
