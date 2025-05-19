import Btn from './buttons/btn.js';

export default function HeroBox({ image, alt, label, action }) {
  const figure = document.createElement('figure');
  figure.className = 'hero-box';

  const img = document.createElement('img');
  img.src = image;
  img.alt = alt;

  const caption = document.createElement('figcaption');
  caption.className = 'hero-btn';

  const button = Btn({ label, action });

  caption.appendChild(button);
  figure.append(img, caption);

  return figure;
}
