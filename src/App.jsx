import './App.css';
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { SignIn } from './Pages/SignIn';
import Dashboard from './Pages/Dashboard';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import Home from './Pages/Home';
import logo from './Images/yevrolayn.png';
import { PiSignInBold } from "react-icons/pi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AddToCard } from './Pages/AddToCard';
import { FaBars } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { Sevimli } from './Pages/Sevimli';
import { BsTelephone } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { IoSearch } from "react-icons/io5";
import { FaArrowUp } from 'react-icons/fa';

function App() {
  const { currentUser } = useContext(AuthContext);
  const [showButton, setShowButton] = useState(false);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/signin' />;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleTel = () => {
    const confirmCall = window.confirm("Biz bilan bog'laning");
    if (confirmCall) {
      window.location.href = "tel:+998971287877";
    }
  };

  return (
    <>
      <header id='' className="text-white body-font bg-gray-800">
        <div className="bg-gray-800">
          <div className="w-[100%] mx-auto flex flex-wrap p-5 justify-between items-center">
            <div className='flex'>
              <div className='text-[28px] mr-5'>
                <FaBars />
              </div>
              <NavLink className="mr-5 font-bold text-[20px] hover:text-yellow-400" to="/">
                <img src={logo} alt="logo" className='max-w-40 mr-7' />
              </NavLink>
            </div>
            <div className="relative">
              <input
                type="text"
                className="px-4 py-2 rounded-full text-gray-700"
                placeholder="Search..."
              />
              <button className="absolute right-0 top-0 mt-2 mr-2 text-gray-700">
                <IoSearch className="h-5 w-5" />
              </button>
            </div>
            <div className='flex'>
              <BsTelephone className="mr-3 inline-block font-bold text-[25px] hover:text-yellow-400 text-center" onClick={handleTel} />
              <NavLink className="mr-3 inline-block font-bold text-[25px] hover:text-yellow-400 text-center" to="/sevimli">
                <FaRegHeart />
              </NavLink>
              <NavLink className="mr-3 inline-block font-bold text-[25px] hover:text-yellow-400" to="/savatcha">
                <MdOutlineShoppingCart />
              </NavLink>
              <NavLink className="mr-3  inline-block font-bold text-[25px] hover:text-yellow-400" to="/signin">
                <PiSignInBold />
              </NavLink>
              <NavLink className="mr-5 font-bold text-[25px] hover:text-yellow-400" to="/dashboard">
                <VscAccount />
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<SignIn />} path='/signin' />
        <Route element={<RequireAuth><Dashboard /></RequireAuth>} path='/dashboard' />
        <Route element={<AddToCard />} path='/savatcha' />
        <Route element={<Sevimli />} path='/sevimli' />
      </Routes>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700"
        >
          <a href="#navbar"><FaArrowUp /></a>
        </button>
      )}
       {/* <a href="#navbar"><FaArrowUp /></a> */}
    </>
  );
}

export default App;
