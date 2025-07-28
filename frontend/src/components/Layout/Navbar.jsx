import { navItems } from "../../static/data";
import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/styles";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className={`${styles.normalFlex}`}>
      {navItems &&
        navItems.map((item, index) => {
          const isActive = location.pathname === item.url;

          return (
            <Link
              key={index}
              to={item.url}
              className={`px-6 font-[500] cursor-pointer ${
                isActive ? "text-[#17dd1f]" : "text-white"
              }`}
            >
              {item.title}
            </Link>
          );
        })}
    </div>
  );
};

export default Navbar;
