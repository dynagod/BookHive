import Banner from './Banner';
import { useRef } from "react";
import FeaturedCategories from './FeaturedCategories';
import HeroSection from './HeroSection';

const Home = () => {
  const containerRef = useRef(null);
  

  return (
     <div ref={containerRef} className='snap-y scroll-smooth snap-mandatory h-screen overflow-y-scroll relative'>
      <Banner />
      <HeroSection />
      <FeaturedCategories containerRef={containerRef} />
     </div>
  )
}

export default Home;