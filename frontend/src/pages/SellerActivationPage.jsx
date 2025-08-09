import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server.js";

function SellerActivationPage() {
  const { activation_token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // "success" | "error"

  useEffect(() => {
    if (!activation_token) {
      setStatus("error");
      setLoading(false);
      return;
    }

    const activateShop = async () => {
      try {
        const { data } = await axios.get(
          `${server}/shop/activation/${activation_token}`
        );
        setStatus("success");
        setTimeout(() => navigate("/shop-login"), 3000); // redirect after 3s
      } catch (error) {
        setStatus("error");
        setTimeout(() => navigate("/shop-login"), 3000);
      } finally {
        setLoading(false);
      }
    };

    activateShop();
  }, [activation_token, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        {loading && <p className="text-lg font-semibold">Activating shop...</p>}

        {!loading && status === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              🎉 Shop Successfully Created!
            </h2>
            <p className="text-gray-700">
              Your shop has been activated. Redirecting to login...
            </p>
          </>
        )}

        {!loading && status === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              ❌ Activation Link Expired or Invalid
            </h2>
            <p className="text-gray-700">
              Please request a new activation email.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default SellerActivationPage;
