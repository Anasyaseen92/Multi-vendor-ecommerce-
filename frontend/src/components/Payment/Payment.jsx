import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { server } from "../../../server";
import axios from "axios";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [method, setMethod] = useState("card");
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  // Stripe payment handler
const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe or Elements not loaded yet.");
      return;
    }

    if (!orderData || !orderData.totalPrice) {
      toast.error("Order total price is invalid.");
      return;
    }

    try {
      console.log("Creating PaymentIntent on backend...");

      const amountInCents = Math.round(orderData.totalPrice * 100);
      console.log("Amount in cents:", amountInCents);

      const { data } = await axios.post(
        `${server}/payment/process`,
        { amount: amountInCents },
        { headers: { "Content-Type": "application/json" } }
      );

      const clientSecret = data.clientSecret;
      if (!clientSecret) {
        console.error("No clientSecret received from backend!");
        return;
      }

      console.log("Confirming payment with Stripe...");

      const cardElement = elements.getElement(CardNumberElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.name,
            email: user?.email,
          },
        },
      });

      if (result.error) {
        console.error("Payment error:", result.error);
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded! Creating order...");

        const order = {
          ...orderData,
          paymentInfo: {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          },
        };

        await axios.post(`${server}/order/create-order`, order, {
          headers: { "Content-Type": "application/json" },
        });

        navigate("/order/success");
        toast.success("Order successful!");

        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
      } else {
        console.warn("PaymentIntent not succeeded:", result.paymentIntent.status);
      }
    } catch (error) {
      console.error(
        "PaymentHandler catch error:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.error || error.message);
    }
  };

 const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };


  
  const paypalHandler = () => {
    alert("✅ Dummy PayPal Payment Approved");
  };

  // Dummy Cash on Delivery handler
  const cashOnDeliveryHandler = () => {
    alert("✅ Cash on Delivery Confirmed");
  };
   const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

    const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] lg:w-[85%] xl:w-[70%] block md:flex gap-6">
        {/* Left Side */}
        <div className="w-full md:w-[65%]">
          <PaymentInfo
            user={user}
            method={method}
            setMethod={setMethod}
            paymentHandler={paymentHandler}
            paypalHandler={paypalHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-[35%] mt-8 md:mt-0">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

// ================= Payment Info =================
const PaymentInfo = ({
  user,
  method,
  setMethod,
  paymentHandler,
  paypalHandler,
  cashOnDeliveryHandler,
}) => {
  return (
    <div className="w-full bg-white rounded-md p-5 shadow">
      {/* Card Option */}
      <div
        className="flex items-center w-full pb-4 border-b mb-3 cursor-pointer"
        onClick={() => setMethod("card")}
      >
        <input
          type="radio"
          name="payment"
          checked={method === "card"}
          onChange={() => setMethod("card")}
          className="mr-2"
        />
        <h4 className="text-[16px] font-[600] text-[#000000b1]">
          Pay with Debit/Credit Card
        </h4>
      </div>

      {method === "card" && (
        <form className="w-full space-y-3" onSubmit={paymentHandler}>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block pb-1 text-sm">Name On Card</label>
              <input
                required
                defaultValue={user?.name}
                className={`${styles.input} text-[#444]`}
              />
            </div>
            <div className="flex-1">
              <label className="block pb-1 text-sm">Exp Date</label>
              <CardExpiryElement
                className={`${styles.input}`}
                options={{
                  style: { base: { fontSize: "16px", color: "#444" } },
                }}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block pb-1 text-sm">Card Number</label>
              <CardNumberElement
                className={`${styles.input}`}
                options={{
                  style: { base: { fontSize: "16px", color: "#444" } },
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block pb-1 text-sm">CVV</label>
              <CardCvcElement
                className={`${styles.input}`}
                options={{
                  style: { base: { fontSize: "16px", color: "#444" } },
                }}
              />
            </div>
          </div>

          <input
            type="submit"
            value="Submit"
            className={`${styles.button} !bg-[#f63b60] text-white h-[40px] rounded-md cursor-pointer text-[16px] font-[600]`}
          />
        </form>
      )}

      {/* PayPal Option */}
      <div
        className="flex items-center w-full pb-4 border-b mb-3 cursor-pointer"
        onClick={() => setMethod("paypal")}
      >
        <input
          type="radio"
          name="payment"
          checked={method === "paypal"}
          onChange={() => setMethod("paypal")}
          className="mr-2"
        />
        <h4 className="text-[16px] font-[600] text-[#000000b1]">Pay with PayPal</h4>
      </div>

      {method === "paypal" && (
  <div className="w-full flex justify-center py-3 border-b">
    <div className="w-full flex flex-col items-center border p-4 rounded-md bg-gray-50">
      <input
        type="email"
        name="paypalEmail"
        placeholder="Enter your PayPal email"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  </div>
)}


      {/* COD Option */}
      <div
        className="flex items-center w-full pb-4 border-b mb-3 cursor-pointer"
        onClick={() => setMethod("cod")}
      >
        <input
          type="radio"
          name="payment"
          checked={method === "cod"}
          onChange={() => setMethod("cod")}
          className="mr-2"
        />
        <h4 className="text-[16px] font-[600] text-[#000000b1]">Cash on Delivery</h4>
      </div>

      {method === "cod" && (
        <div className="w-full flex justify-center">
          <button
            onClick={cashOnDeliveryHandler}
            className={`${styles.button} !bg-[#f63b60] text-white h-[40px] px-6 rounded-md cursor-pointer text-[16px] font-[600]`}
          >
            Confirm COD
          </button>
        </div>
      )}
    </div>
  );
};

// ================= Cart Data =================
const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-white rounded-md p-5 shadow-md flex flex-col gap-4">
      <div className="flex justify-between text-sm sm:text-base">
        <h3 className="text-gray-600">Subtotal:</h3>
        <h5 className="font-semibold">${orderData?.subTotalPrice}</h5>
      </div>

      <div className="flex justify-between text-sm sm:text-base">
        <h3 className="text-gray-600">Shipping:</h3>
        <h5 className="font-semibold">${shipping}</h5>
      </div>

      <div className="flex justify-between text-sm sm:text-base">
        <h3 className="text-gray-600">Discount:</h3>
        <h5 className="font-semibold">
          {orderData?.discountPrice ? "$" + orderData.discountPrice : "-"}
        </h5>
      </div>

      <div className="flex justify-between border-t pt-3 text-sm sm:text-base">
        <h3 className="font-semibold">Total:</h3>
        <h5 className="text-lg font-bold">${orderData?.totalPrice}</h5>
      </div>
    </div>
  );
};

export default Payment;
