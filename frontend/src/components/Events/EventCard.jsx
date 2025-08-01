import React from "react";
//import styles from "../../../styles/styles.js";
import CountDown from "./CountDown.jsx";
import styles from "../../styles/styles.js";
//import { productData } from "../../static/data.jsx";

const EventCard = ({ active,data}) => {
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full mr-4 lg:w-[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" className="rounded-lg"/>
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data && data.name}</h2>
        <p>{data && data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice}$
            </h5>
            <h5 className="font-[bold] text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice}$
            </h5>
            
          </div>
         
        </div>
        <CountDown data= {data}/>
         <span className="pr-3 flex font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
      </div>
    </div>
  );
};

export default EventCard;