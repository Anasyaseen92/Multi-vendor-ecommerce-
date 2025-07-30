import React, { useEffect, useState } from "react";
import axios from "axios";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!data?.Finish_Date) return;

    const countDownDate = new Date(data.Finish_Date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setExpired(true);
        deleteEvent(); // optional: only if you want to delete event on expiry
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data?.Finish_Date]);

  const deleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v2/event/delete-shop-event/${data?._id}`);
      console.log("Event deleted on expiration");
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (!data?.Finish_Date) return <p className="text-red-500">Missing Finish_Date!</p>;

  return (
    <div className="text-lg font-semibold text-gray-700">
      {expired ? (
        <span className="text-red-500">⏰ Time's up!</span>
      ) : (
        <span>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      )}
    </div>
  );
};

export default CountDown;
