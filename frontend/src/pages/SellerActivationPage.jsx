import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../server";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [status, setStatus] = useState("loading"); 
  // "loading" | "success" | "error"

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const res = await axios.post(`${server}/seller/activation`, {
          activation_token, // send in body like Postman
        });

        if (res.data && res.data.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    };

    if (activation_token) {
      sendRequest();
    } else {
      setStatus("error");
    }
  }, [activation_token]);

  if (status === "loading") {
    return <p>Activating your account...</p>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {status === "success" ? (
        <p>Your account has been created successfully!</p>
      ) : (
        <p>Your token is expired or invalid!</p>
      )}
    </div>
  );
};

export default SellerActivationPage;
