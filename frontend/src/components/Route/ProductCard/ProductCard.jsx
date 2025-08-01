import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const productName = data.name.replace(/\s+/g, "-");

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <Link to={`/product/${productName}`}>
          <img
            src={data?.image_Url?.[0]?.url}
            className="w-full h-[170px] object-contain"
            alt={data.name}
          />
        </Link>

        <Link to="/">
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>

        <Link to={`/product/${productName}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
            {[1, 2, 3, 4].map((_, i) => (
              <AiFillStar key={i} className="mr-1 text-yellow-400" size={20} />
            ))}
            <AiOutlineStar className="text-yellow-400" size={20} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex gap-2">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.price === 0 ? data.price : data.discount_price}$
              </h5>
              {data.price > 0 && (
                <h4 className={`${styles.price}`}>{data.price}$</h4>
              )}
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data.total_sell} sold
            </span>
          </div>
        </Link>

        {/* Icons */}
        <div className="absolute right-2 top-5 flex flex-col gap-3">
          {/* Wishlist Icon */}
          <div className="bg-black/70 p-1 rounded-full shadow-md">
            {click ? (
              <AiFillHeart
                size={20}
                onClick={() => setClick(!click)}
                color="red"
                title="Remove from wishlist"
                className="cursor-pointer"
              />
            ) : (
              <AiOutlineHeart
                size={20}
                onClick={() => setClick(!click)}
                color="#fff"
                title="Add to wishlist"
                className="cursor-pointer"
              />
            )}
          </div>

          {/* Quick View Icon */}
          <div className="bg-black/70 p-1 rounded-full shadow-md">
            <AiOutlineEye
              size={20}
              onClick={() => setOpen(true)}
              color="#fff"
              title="Quick view"
              className="cursor-pointer"
            />
          </div>

          {/* Add to Cart Icon */}
          <div className="bg-black/70 p-1 rounded-full shadow-md">
            <AiOutlineShoppingCart
              size={22}
              onClick={() => setOpen(true)}
              color="#fff"
              title="Add to cart"
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Product Details Modal */}
        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
    </>
  );
};

export default ProductCard;
