import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown";
import { productData } from "../../static/data";
import Navbar from "./Navbar";
import styles from "../../styles/styles";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { backend_url } from "../../../server";
import Wishlist from "../Wishlist/Wishlist";
import Cart from "../cart/Cart";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 70);
    const handleResize = () => setIsMobile(window.innerWidth < 800);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
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
            <BiMenuAltLeft size={30} className="text-blue-600" onClick={() => setOpen(true)} />
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

          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-ful bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-ful bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
                  5
                </span>
              </div>
            </div>

            <div className={styles.noramlFlex}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      className="rounded-full w-[35px] h-[35px]"
                      src={`${backend_url}/${user.avatar}`}
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile color="rgb(255 255 255 /83%)" size={30} />
                  </Link>
                )}
              </div>
            </div>
            {openCart && <Cart setOpenCart={setOpenCart} />}
            {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
          </div>
        </div>
      </div>

      {/* Mobile Header Only on Small Screens */}
      {isMobile && (
        <div
          className={`$ {
            active ? "shadow-sm fixed top-[70px] left-0 right-0 z-40" : ""
          } w-full h-[60px] bg-[#fff] z-50 800px:hidden`}
        >
          <div className="w-full flex items-center justify-between">
            <div>
              <BiMenuAltLeft size={40} className="ml-4" onClick={() => setOpen(true)} />
            </div>

            <div>
              <Link to="/">
                <img
                  src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                  alt="Logo"
                  className="mt-3 cursor-pointer"
                />
              </Link>
            </div>

            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-ful bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
                5
              </span>
            </div>
          </div>

          {/* Header Sidebar */}
          {open && (
            <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
              <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
                <div className="w-full justify-between flex pr-3">
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
                      1
                    </span>
                  </div>
                  <RxCross1 size={30} className="ml-4 mt-5" onClick={() => setOpen(false)} />
                </div>

                {/* Mobile Search Bar */}
                <div className="my-8 w-[92%] m-auto h-[40px] relative">
                  <input
                    type="search"
                    placeholder="Search Product..."
                    className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {searchData && (
                    <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                      {searchData.map((i) => {
                        const Product_name = i.name.replace(/\s+/g, "-");
                        return (
                          <Link to={`/product/${Product_name}`} key={i.name}>
                            <div className="flex items-center">
                              <img
                                src={i.image_Url[0].url}
                                alt=""
                                className="w-[50px] mr-2"
                              />
                              <h5>{i.name}</h5>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
