import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="w-full fixed h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] md:w-[60%] h-[90vh] overflow-y-scroll md:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="w-full block md:flex">
              {/* Left Side - Image and Seller */}
              <div className="w-full md:w-[50%]">
                <img
                  src={data.image_Url?.[0]?.url || ""}
                  alt={data.name}
                  className="w-full object-contain"
                />
                <Link to={`/shop/preview/${data.shop._id}`} className="flex mt-4 items-center">
                  <img
                    src={data.shop.shop_avatar?.url || ""}
                    alt={data.shop.name}
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={styles.shop_name}>{data.shop.name}</h3>
                    <h5 className="pb-3 text-[15px]">({data.shop.ratings}) Ratings</h5>
                  </div>
                </Link>

                <div
                  className={`${styles.button} bg-[#000] mt-4 h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>

                <h5 className="text-[16px] text-[red] mt-5">
                  ({data.total_sell}) Sold out
                </h5>
              </div>

              {/* Right Side - Product Info */}
              <div className="w-full md:w-[50%] pt-5 px-[5px]">
                <h1 className={styles.productTitle}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="pt-3 flex">
                  <h4 className={styles.productDiscountPrice}>
                    {data.discount_price}$
                  </h4>
                  {data.price && (
                    <h3 className={styles.price}>
                      <del>{data.price}$</del>
                    </h3>
                  )}
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  {/* Quantity Buttons */}
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  {/* Wishlist Button */}
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color="red"
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color="#333"
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <div className={`${styles.button} mt-6 flex items-center h-11`}>
                  <span className="text-[#fff] flex items-center">
                    Add to Cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
