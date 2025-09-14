import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { City, Country } from "country-state-city";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

   const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shipping,
      discountPrice,
      shippingAddress,
      user,
    }

      const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

    const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);


    const handleSubmit = () =>{
      e.preventDefault();
    }
  return (
    <div className="w-full flex flex-col items-center py-6 px-3 sm:px-6">
      <div className="w-full lg:w-[85%] xl:w-[70%] flex flex-col md:flex-row gap-6">
        {/* Shipping Info */}
        <div className="w-full md:w-[65%]">
          <ShippingInfo
            country={country}
            city={city}
            address1={address1}
            address2={address2}
            zipCode={zipCode}
            setCountry={setCountry}
            setCity={setCity}
            setAddress1={setAddress1}
            setAddress2={setAddress2}
            setZipCode={setZipCode}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            user={user}
          />
        </div>

        {/* Cart Data */}
        <div className="w-full md:w-[35%]">
          <CartData
      handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>
      </div>

      {/* Payment Button */}
      <div className={`${styles.button} w-[180px] md:w-[260px] mt-8`}>
        <h5 className="text-white text-center">Go to Payment</h5>
      </div>
    </div>
  );
};

// ================= SHIPPING INFO =================
const ShippingInfo = ({
 
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,

}) => {
  return (
    <div className="w-full bg-white p-5 rounded-md shadow-md">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>

      <form className="mt-4 space-y-4">
        {/* Name + Email */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm">Full Name</label>
            <input
            value={user && user.name}
              type="text"
              placeholder="Enter your name"
              className={`${styles.input} w-full`}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm">Email</label>
            <input
             value={user && user.email}
              type="email"
              placeholder="Enter your email"
              className={`${styles.input} w-full`}
            />
          </div>
        </div>

        {/* Phone + Zip */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm">Phone Number</label>
            <input
            value={user && user.phoneNumber}
              type="number"
              placeholder="Enter phone number"
              className={`${styles.input} w-full`}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="12345"
              className={`${styles.input} w-full`}
            />
          </div>
        </div>

        {/* Country + City */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm">Country</label>
            <select
              className="w-full border h-[40px] rounded-md px-2"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Choose your country</option>
              {Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm">City</label>
            <select
              className="w-full border h-[40px] rounded-md px-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Choose your city</option>
              {City.getCitiesOfCountry(country).map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Address1 + Address2 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm">Address 1</label>
            <input
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Street address"
              className={`${styles.input} w-full`}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm">Address 2</label>
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Apartment, suite, etc."
              className={`${styles.input} w-full`}
            />
          </div>
        </div>
      </form>
       {/* Saved addresses toggle */}
      <h5
        className="text-[15px] text-blue-600 cursor-pointer mt-2"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose from saved address
      </h5>

      {userInfo && (
        <div className="mt-3 space-y-2">
          {user.addresses.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="saved-address"
                value={item.addressType}
                onChange={() => {
                  setCountry(item.country);
                  setCity(item.city);
                  setAddress1(item.address1);
                  setAddress2(item.address2);
                  setZipCode(item.zipCode);
                }}
              />
              <span>{item.addressType}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// ================= CART DATA =================
const CartData = ({
  handleSubmit,
  subTotalPrice,
  shipping,
  discountPercentage,
  totalPrice,
  couponCode,
  setCouponCode,
}) => {
  return (
    <div className="w-full bg-white rounded-md p-5 shadow-md flex flex-col gap-4">
      <div className="flex justify-between text-sm sm:text-base">
        <h3 className="text-gray-600">Subtotal:</h3>
        <h5 className="font-semibold">${subTotalPrice}</h5>
      </div>

      <div className="flex justify-between text-sm sm:text-base">
        <h3 className="text-gray-600">Shipping:</h3>
        <h5 className="font-semibold">${shipping}</h5>
      </div>

      <div className="flex justify-between text-sm sm:text-base">
        <h3 className="text-gray-600">Discount:</h3>
        <h5 className="font-semibold"> - {discountPercentage ? "$" + discountPercentage.toString() : null}</h5>
      </div>

      <div className="flex justify-between border-t pt-3 text-sm sm:text-base">
        <h3 className="font-semibold">Total:</h3>
        <h5 className="text-lg font-bold">${totalPrice}</h5>
      </div>

      {/* Coupon form */}
      <form className="flex flex-col sm:flex-row gap-3 mt-2">
        <input
          type="text"
          className={`${styles.input} flex-1 h-[40px]`}
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          type="submit"
          className="h-[40px] px-4 bg-[#f63b60] text-white rounded-md hover:bg-[#d53050]"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default CheckOut;
