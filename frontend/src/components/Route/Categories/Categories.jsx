import styles from "../../../styles/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Categories = () => {
  const navigate = useNavigate();
  const allProducts = useSelector((state) => state.products.allProducts);

  // Get unique categories from products
  const uniqueCategories = [...new Set(allProducts.map(p => p.category))];

  return (
    <div className={`${styles.section} bg-white p-6 rounded-lg mb-12`} id="categories">
      <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {uniqueCategories.map((cat, index) => (
          <div
            key={index}
            className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden border p-3 rounded"
            onClick={() => navigate(`/products?category=${cat}`)}
          >
            <h5 className="text-[18px] leading-[1.3]">{cat}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
