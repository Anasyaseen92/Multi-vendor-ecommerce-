import React from "react";
import styles from "../../styles/styles";
import EventCard from "./EventCard";

// ✅ Dummy data with Finish_Date added
const sampleEvent = {
  name: "Tech Code Fest 2025",
  description: "Join the biggest tech festival of the year.",
  images: [
    {
      url: "https://via.placeholder.com/400x250.png?text=Tech+Event"
    }
  ],
  originalPrice: 100,
  discountPrice: 60,
  start_Date: new Date().toISOString(),
  Finish_Date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toISOString() // ✅ 5 days from now
};

function Events() {
  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
      </div>

      <div className="w-full grid">
        {/* ✅ Pass both 'data' and 'active' props */}
        <EventCard data={sampleEvent} active={true} />
      </div>
    </div>
  );
}

export default Events;
