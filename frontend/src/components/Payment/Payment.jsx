import React, { useState } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import styles from "../../styles/styles";

const PaymentInfo = ({ orderData }) => {
  const [method, setMethod] = useState("card"); // default selected method

  return (
    <div className="w-full flex flex-col items-center py-6 px-3 sm:px-6">
      <div className="w-full lg:w-[85%] xl:w-[70%] flex flex-col md:flex-row gap-6">
        {/* Left Side: Payment Methods */}
        <div className="w-full md:w-[65%] bg-white rounded-md p-5 pb-8 shadow">
          {/* Debit/Credit Card */}
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
            <form className="w-full space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block pb-1 text-sm">Name On Card</label>
                  <input
                    placeholder="Your Name"
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

          {/* PayPal */}
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
            <h4 className="text-[16px] font-[600] text-[#000000b1]">
              Pay with PayPal
            </h4>
          </div>

          {method === "paypal" && (
            <div className="w-full flex justify-center py-3 border-b">
              <div className="w-full flex flex-col items-center border p-4 rounded-md bg-gray-50">
                <button
                  className="bg-yellow-400 text-black px-5 py-2 rounded-md font-semibold mb-2 text-sm"
                  onClick={() => alert("Dummy PayPal Order Created")}
                >
                  PayPal Dummy Button
                </button>
                <button
                  className="bg-green-500 text-white px-5 py-2 rounded-md font-semibold text-sm"
                  onClick={() => alert("Dummy Payment Approved")}
                >
                  Approve Payment
                </button>
              </div>
            </div>
          )}

          {/* Cash on Delivery */}
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
            <h4 className="text-[16px] font-[600] text-[#000000b1]">
              Cash on Delivery
            </h4>
          </div>

          {method === "cod" && (
            <div className="w-full flex justify-center">
              <input
                type="submit"
                value="Confirm COD"
                className={`${styles.button} !bg-[#f63b60] text-white h-[40px] px-6 rounded-md cursor-pointer text-[16px] font-[600]`}
              />
            </div>
          )}
        </div>

        {/* Right Side: Cart Data */}
        <div className="w-full md:w-[35%]">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

// ================= CART DATA =================
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

export default PaymentInfo;
