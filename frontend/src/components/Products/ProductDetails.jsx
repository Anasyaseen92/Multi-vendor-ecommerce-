import React, { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

function ProductDetails({ data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    setCount(count - 1);
  };
  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=afsaojfnauiwefnasfk");
  };
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[80%] 800px:w-[80%] min-h-screen`}>
          <div className="w-full py-5">
            {/* Updated flex layout with custom widths and gap */}
            <div
              className="w-full flex flex-col 800px:flex-row justify-between"
              style={{ gap: "6%" }}
            >
              {/* LEFT: Product Images (47%) */}
              <div className="w-full 800px:w-[47%]">
                <img
                  src={data?.image_Url?.[select]?.url}
                  alt=""
                  className="w-full max-h-[500px] object-contain mb-4"
                />
                <div className="w-full flex gap-3">
                  <div
                    className={`${
                      select === 0 ? "border-2 border-red-500" : ""
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url?.[0]?.url}
                      alt=""
                      className="h-[100px] object-contain"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border-2 border-red-500" : ""
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url?.[1]?.url}
                      alt=""
                      className="h-[100px] object-contain"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT: Name, Description (47%) */}
              <div className="w-full 800px:w-[47%] pt-5">
                <h1 className={`${styles.productTitle} mb-3`}>{data.name}</h1>
                <p className="mb-3">{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    ${data.discount_price}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
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
              </div>
              <div
                className={`${styles.button} mt-6 rounded h-11 flex items-center`}
              >
                <span className="text-white flex items-center">
                  Add to cart <AiOutlineShoppingCart />
                </span>
              </div>

              <div className="flex items-center pt-8">
                <img
                  src={data.shop.shop_avatar.url}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full mr-2"
                />
                <div className="pr-8">
                  <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                    {data.shop.name}
                  </h3>
                  <h5 className="pb-3 text-[15px]">
                    ({data.shop.ratings}) Ratings
                  </h5>
                </div>
                <div
                  className={`${styles.button} bg-[#6443d1] mt-4 rounded h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-white flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
}

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded ">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        {/* 2nd one */}

        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        {/* 3rd one */}

        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Experience comfort and style like never before with our
            premium-quality product, crafted to meet your everyday needs.
            Designed with attention to detail and built from durable materials,
            this item blends modern aesthetics with practical functionality.
            Whether you're shopping for yourself or looking for the perfect
            gift, it's a choice that combines value, performance, and elegance —
            all in one. Order now and elevate your lifestyle effortlessly!
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Upgrade your daily essentials with this high-quality product that
            delivers reliability, style, and performance. Perfect for any
            occasion, it's thoughtfully designed to offer maximum comfort and
            durability. Whether at home, work, or on the go, this item
            seamlessly fits into your lifestyle. Don’t miss out — add it to your
            cart today and experience the difference!
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Upgrade your daily essentials with this high-quality product that
            delivers reliability, style, and performance. Perfect for any
            occasion, it's thoughtfully designed to offer maximum comfort and
            durability. Whether at home, work, or on the go, this item
            seamlessly fits into your lifestyle. Don’t miss out — add it to your
            cart today and experience the difference!
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <div className="w-full justify-center min-h-[40vh] flex items-center ">
          <p>No Reviews yet!</p>
        </div>
      ) : null}
      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center">
              <img
                src={data?.shop?.shop_avatar?.url}
                className="w-[50px] h-[50px] rounded-full"
                alt=""
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">
                  [{data.shop.ratings}] Ratings
                </h5>
              </div>
            </div>

            <p className="pt-2">
              This product is sold by TechBazaar, a trusted seller known for
              delivering high-quality items and excellent customer service. With
              years of experience in the market, TechBazaar is committed to
              ensuring customer satisfaction through fast shipping, responsive
              support, and genuine products. Shop with confidence knowing you're
              buying from a verified and reputable source.
            </p>
          </div>

          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex:col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
              Joined on: <span className="font-[500]">6 August,2025</span>
              </h5>

              <h5 className="font-[600] pt-3">
              Total Products: <span className="font-[500]">1234</span>
              </h5>

              <h5 className="font-[600]">
              Total Reviews: <span className="font-[500]">10</span>
              </h5>

              <Link to="/">
                <div
                className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}>
                  <h4 className="text-white">
                   Visit Shop
                  </h4>
                </div>
              </Link>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetails;
