import { useEffect } from 'react';
import './App.css'
import {LoginPage , SignupPage,HomePage ,ActivationPage, ProductsPage,BestSellingPage, EventsPage,FAQPage,ProductDetailsPage,ProfilePage, CheckoutPage,ShopCreatePage,SellerActivationPage} from './Routes.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import Store from './redux/store.js'; // default import matches the default export // ✅ named import
import { loadUser } from './redux/actions/user.js'; // ✅ Correct
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute.jsx';



function App() {
  const { loading, isAuthenticated} = useSelector((state) => state.user);

  useEffect(()=>{
   Store.dispatch(loadUser());
  }, []);
  return (
   <>
   {
    loading ? (null):(
       <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/> 
      <Route path='/login' element={<LoginPage/>}/> 
      <Route path='/sign-up' element={<SignupPage/>}/> 
      <Route path='/activation/:activation_token' element={<ActivationPage/>}/> 
      <Route path='/seller/activation/:activation_token' element={<SellerActivationPage/>}/> 
      <Route path='/products' element={<ProductsPage/>}/>
      <Route path='/product/:name' element={<ProductDetailsPage/>}/>
      <Route path='/best-selling' element={<BestSellingPage/>}/>
      <Route path='/events' element={<EventsPage/>}/>
      <Route path='/faq' element={<FAQPage/>}/>
      <Route path='/checkout' element={<ProtectedRoute>
        <CheckoutPage/>
      </ProtectedRoute>}/>
     
      <Route path='/shop-create' element={<ShopCreatePage/>}/>

      <Route path='/profile' element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <ProfilePage/>
        </ProtectedRoute>
      }/>
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
    )
   }
   </>
  )
}

export default App