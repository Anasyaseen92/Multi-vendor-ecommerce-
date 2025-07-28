import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown";
import { productData, categoriesData } from "../../static/data";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Header */}
      <div className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-[1200px] mx-auto h-[70px] flex items-center justify-between px-4">
          <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="Logo"
              className="h-10"
            />
          </Link>

          {/* Search Bar */}
          <div className="w-[50%] md:w-[60%] sm:w-[70%] hidden sm:block relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-4 border-2 border-blue-600 rounded-md text-black"
            />
            <AiOutlineSearch
              size={25}
              className="absolute right-2 top-2 cursor-pointer text-black"
            />
            {searchData.length > 0 && searchTerm && (
              <div className="absolute w-full bg-white rounded-md shadow-md mt-2 z-50 max-h-[200px] overflow-y-auto">
                {searchData.map((item, i) => (
                  <Link
                    to={`/product/${item.name.replace(/\s+/g, "-")}`}
                    key={i}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Become Seller */}
          <div className="hidden md:block bg-blue-600 px-4 py-2 rounded-md">
            <Link to="/seller">
              <span className="text-white flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="block md:hidden">
            <BiMenuAltLeft size={30} className="text-blue-600" />
          </div>
        </div>
      </div>

      <div className="h-[70px]" />

      {/* Second Header Section */}
      <div
        className={`transition-all duration-300 border ${
          active ? "shadow-sm fixed top-[70px] left-0 right-0 z-40" : ""
        } w-full bg-blue-600`}
      >
        <div className="max-w-[1200px] mx-auto flex justify-between items-center px-4 h-[60px]">
          <div className="relative w-[270px] h-[50px] bg-white shadow-sm rounded-md hidden md:flex items-center px-3">
            <BiMenuAltLeft size={25} className="text-gray-600" />
            <button
              className="h-full w-full flex justify-between items-center pl-9 bg-white font-sans text-[15px] font-[500] select-none"
              onClick={() => setDropDown(!dropDown)}
            >
              All Categories
              <IoIosArrowDown className="ml-2" />
            </button>

            {dropDown && <DropDown setDropDown={setDropDown} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
