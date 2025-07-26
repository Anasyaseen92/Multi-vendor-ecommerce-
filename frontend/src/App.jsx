import { useEffect } from 'react';
import './App.css'
import {LoginPage , SignupPage,HomePage ,ActivationPage} from './Routes.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import Store from './redux/store.js'; // default import matches the default export // ✅ named import
import { loadUser } from './redux/actions/user.js'; // ✅ Correct




function App() {

  useEffect(()=>{
   Store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/> 
      <Route path='/login' element={<LoginPage/>}/> 
      <Route path='/sign-up' element={<SignupPage/>}/> 
      <Route path='/activation/:activation_token' element={<ActivationPage/>}/> 
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

export default App