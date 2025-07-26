import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "../../styles/styles";
import { productData } from "../../static/data";


const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filtered);
  };

  return (
    <div className={`${styles.section}`}>
      <div className="hidden md:h-[50px] md:my-[20px] md:flex items-center justify-between">
        <div>
          <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="logo"
            />
          </Link>
        </div>

        {/* Search bar */}
        <div className="w-[50%] relative">
          <input
            type="text"
            placeholder="Search Product..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
          />
          <AiOutlineSearch
            size={30}
            className="absolute right-2 top-1.5 cursor-pointer"
          />
          {searchData.length > 0 && searchTerm && (
            <div className="absolute min-h-[30vh] bg-slate-50 shadow-md z-30 p-4 w-full max-h-[300px] overflow-y-auto">
              {searchData.map((i, index) => {
                const Product_name = i.name.replace(/\s+/g, "-");

                return (
                  <Link to={`/product/${Product_name}`} key={index}>
                    <div className="w-full flex items-start py-3">
                      <img
                        src={`${backend_url}/${i.images[0]}`}
                        alt={i.name}
                        className="w-[40px] h-[40px] mr-2 object-cover"
                      />
                      <h1>{i.name}</h1>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
