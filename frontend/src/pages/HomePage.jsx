import Events from "../components/Events/Events.jsx";
import Header from "../components/Layout/Header";
import BestDeals from "../components/Route/BestDeals/BestDeals.jsx";
import Categories from "../components/Route/Categories/Categories.jsx";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct.jsx";
import Hero from "../components/Route/Hero/Hero.jsx"

function HomePage() {
  return (
    <div className=" min-h-screen bg-slate-100">
      <Header activeHeading={1}/>
      <Hero/>
      <Categories/>
      <BestDeals/>
      <Events/>
      <FeaturedProduct/>
    </div>
  );
}

export default HomePage;
