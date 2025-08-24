import { useEffect } from "react";
import "./App.css";
import {
  LoginPage,
  SignupPage,
  HomePage,
  ActivationPage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  CheckoutPage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
} from "./Routes.jsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Store from "./redux/store.js"; // default import matches the default export // ✅ named import
import { loadSeller, loadUser } from "./redux/actions/user.js"; // ✅ Correct
import ProtectedRoute from "./ProtectedRoute.jsx";
import { ShopHomePage } from "./ShopRoutes.js";
import SellerProtectedRoute from "./SellerProtectedRoute.jsx";
import {ShopDashboardPage,ShopCreateProduct, ShopAllProducts,ShopCreateEvents} from './routes/ShopRoutes.js'
function App() {
  //const navigate = useNavigate();

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        {/* shop routes */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />

        <Route path="/dashboard" element={
          <SellerProtectedRoute>
            <ShopDashboardPage/>
          </SellerProtectedRoute>
        }/>
         <Route path="/dashboard-create-product" element={
          <SellerProtectedRoute>
            <ShopCreateProduct/>
          </SellerProtectedRoute>
        }/>

         <Route path="/dashboard-products" element={
          <SellerProtectedRoute>
            <ShopAllProducts/>
          </SellerProtectedRoute>
        }/>
          <Route path="/dashboard-create-events" element={
          <SellerProtectedRoute>
            <ShopCreateEvents/>
          </SellerProtectedRoute>
        }/>

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
