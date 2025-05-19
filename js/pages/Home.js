import HeroBox from "../components/heroBox.js";
import CategoryGrid from '../components/CategoryGrid.js';
import Slider from '../components/Slider.js';
import PriceSlider from '../components/PriceSlider.js';
import '../components/ProductGrid.js'; // <-- add this

export default async function HomePage() {
    const mainWrapper = document.createElement('div');
  
    // Hero section
    const herosection = document.createElement('section');
    herosection.className = 'hero-section';
    herosection.append(
      HeroBox({ image: '/assets/others/dress.png', alt: 'sell', label: 'Sell Now', action: '/form.html' }),
      HeroBox({ image: '/assets/others/top.png', alt: 'shop', label: 'Shop Now', action: '/index.html' })
    );
  
    // Main section
    const main = document.createElement('main');
    main.className = 'main-container';
  
          // Shop by Category section
          const categorySection = document.createElement('section');
          categorySection.id = 'shop-by-category';   
          const categoryTitle = document.createElement('h2');
          categoryTitle.textContent = 'Shop by Category';       
          const grid = await CategoryGrid();
          categorySection.append(categoryTitle, grid);
          //Shop by brand
          const brandSection = document.createElement('section');
          brandSection.id = 'shop-by-brand';
          const brandTitle = document.createElement('h2');
          brandTitle.textContent = 'Shop by Brand';
          const brandGrid = await Slider(); 
          brandSection.append(brandTitle, brandGrid);

          //Shop by price
          const priceSection = document.createElement('section');
          priceSection.id = 'shop-by-price';
          const priceTitle = document.createElement('h2');
          priceTitle.textContent = 'Shop by Price';
          const priceSlider = await PriceSlider();
          priceSection.append(priceTitle, priceSlider.form, priceSlider.viewMore, priceSlider.grid);
          //Populer this week section
          const populerSection = document.createElement('section');
          populerSection.id = 'populer-this-week';
          const popularTitle = document.createElement('h2');
          popularTitle.textContent = 'Popular This Week';
          const productGrid = document.createElement('product-grid');
          populerSection.append(popularTitle, productGrid);
        
    main.append(categorySection, brandSection,priceSection,populerSection);
    mainWrapper.append(herosection, main);
  
    return mainWrapper;
  }
  
  