import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function ProductDetails({ data }) {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(0);
    const navigate = useNavigate();

    const incrementCount = () =>{
        setCount(count+1);
    }
    const decrementCount = () =>{
        setCount(count-1);
    }
 const handleMessageSubmit = () => {
    navigate("/inbox?conversation=afsaojfnauiwefnasfk");
  };
    return (
        <div className="bg-white">
            {
                data ? (
                    <div className={`${styles.section} w-[80%] 800px:w-[80%] min-h-screen`}>
                        <div className="w-full py-5">
                            {/* Updated flex layout with custom widths and gap */}
                            <div className="w-full flex flex-col 800px:flex-row justify-between" style={{ gap: "6%" }}>
                                
                                {/* LEFT: Product Images (47%) */}
                                <div className="w-full 800px:w-[47%]">
                                    <img src={data?.image_Url?.[select]?.url} alt="" className="w-full max-h-[500px] object-contain mb-4" />
                                    <div className="w-full flex gap-3">
                                        <div className={`${select === 0 ? "border-2 border-red-500" : ""} cursor-pointer`}>
                                            <img
                                                src={data?.image_Url?.[0]?.url}
                                                alt=""
                                                className="h-[100px] object-contain"
                                                onClick={() => setSelect(0)}
                                            />
                                        </div>
                                        <div className={`${select === 1 ? "border-2 border-red-500" : ""} cursor-pointer`}>
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
                                    <h1 className={`${styles.productTitle} mb-3`}>
                                        {data.name}
                                    </h1>
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

                            </div>
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
}

export default ProductDetails;
