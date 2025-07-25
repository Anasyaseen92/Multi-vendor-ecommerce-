import { useEffect } from 'react';
import './App.css'
import {LoginPage , SignupPage ,ActivationPage} from './Routes.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { server } from '../server.js';
import axios from "axios";


function App() {

  useEffect(()=>{
    axios.get(`${server}/user/getuser`, {withCredentials: true}).then((res)=>{
      toast.success(res.data.message);
    })
    .catch((err)=>{
      toast.error(err.response?.data?.message || "Error!");
    })
  }, []);
  return (
    <BrowserRouter>
    <Routes>
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