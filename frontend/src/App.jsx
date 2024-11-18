import React from 'react'
import "./App.css";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./Pages/Home"
import Jobs from "./Pages/Jobs"
import Dashboard from "./Pages/Dashboard"
import PostApplication from "./Pages/PostApplication"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import NotFound from "./Pages/NotFound"
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
  <Router>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/jobs' element={<Jobs />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/post/application/:jobId' element={<PostApplication />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    <Footer />
    <ToastContainer position='top-right' theme='dark'/>
  </Router>
    </>
  )
}

export default App