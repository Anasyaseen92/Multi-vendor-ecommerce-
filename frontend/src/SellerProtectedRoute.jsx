import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);

  // While loading, show spinner or placeholder
  if (isLoading) {
    return <div>Loading...</div>; // you can use a spinner here
  }

  // After loading, check if seller exists
  if (!isSeller) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SellerProtectedRoute;
