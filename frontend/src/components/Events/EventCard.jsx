import CountDown from "./CountDown.jsx";
import styles from "../../styles/styles.js";

const EventCard = ({ active, data }) => {
  console.log("EventCard received data:", data); // ✅ For debugging

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="w-full p-4 bg-gray-100 text-center rounded-lg">
        <p>No event data found.</p>
      </div>
    );
  }

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2 mb-12`}
    >
      <div className="w-full mr-4 lg:w-[50%] m-auto">
        <img
  src="https://placehold.co/400x250?text=Tech+Event"
  alt="Event Banner"
  className="w-full h-[200px] object-cover"
/>

      </div>

      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data?.name || "No Name"}</h2>
        <p>{data?.description || "No Description"}</p>

        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice ? `${data.originalPrice}$` : ""}
            </h5>
            <h5 className="font-[bold] text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice ? `${data.discountPrice}$` : ""}
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>

        {data?.start_Date && <CountDown data={data} />}
      </div>
    </div>
  );
};

export default EventCard;
