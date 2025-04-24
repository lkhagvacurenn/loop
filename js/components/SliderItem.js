export default function SliderItem({ image, brand,  position }) {
    const figure = document.createElement('figure');
    figure.className = 'item';
    figure.style.setProperty('--position', position);
  
    const img = document.createElement('img');
    img.src = image;
    img.alt = brand || '';
  
    figure.appendChild(img);

    figure.addEventListener('click', () => {
        const query = encodeURIComponent(brand.toLowerCase());
        window.location.href = `/search.html?q=${query}`;
    }
    );
  
    return figure;
  }
  