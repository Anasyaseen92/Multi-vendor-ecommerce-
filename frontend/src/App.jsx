import { useEffect } from 'react';
import './App.css'
import {LoginPage , SignupPage,HomePage ,ActivationPage, ProductsPage,BestSellingPage, EventsPage,FAQPage,ProductDetailsPage,ProfilePage} from './Routes.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import Store from './redux/store.js'; // default import matches the default export // ✅ named import
import { loadUser } from './redux/actions/user.js'; // ✅ Correct
import { useSelector } from 'react-redux';




function App() {
  const { loading} = useSelector((state) => state.user);

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
      <Route path='/products' element={<ProductsPage/>}/>
      <Route path='/product/:name' element={<ProductDetailsPage/>}/>
      <Route path='/best-selling' element={<BestSellingPage/>}/>
      <Route path='/events' element={<EventsPage/>}/>
      <Route path='/faq' element={<FAQPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
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