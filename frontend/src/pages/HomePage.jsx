import Header from "../components/Layout/Header";
import BestDeals from "../components/Route/BestDeals/BestDeals.jsx";
import Categories from "../components/Route/Categories/Categories.jsx";
import Hero from "../components/Route/Hero/Hero.jsx"

function HomePage() {
  return (
    <div className=" min-h-screen bg-slate-100">
      <Header activeHeading={1}/>
      <Hero/>
      <Categories/>
      <BestDeals/>
    </div>
  );
}

export default HomePage;
