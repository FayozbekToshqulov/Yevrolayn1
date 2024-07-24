import './App.css';
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { SignIn } from './Pages/SignIn';
import Dashboard from './Pages/Dashboard';
import AddToCard from './Pages/AddToCard';
import { useContext, useState, useEffect, Fragment } from 'react';
import { AuthContext } from './context/AuthContext';
import Home from './Pages/Home';
import logo from './Images/yevrolayn.png';
import { PiSignInBold } from "react-icons/pi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { Sevimli } from './Pages/Sevimli';
import { BsTelephone } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { IoCloseSharp } from "react-icons/io5";
import { ProtectRouteAdmin } from './protectedRoutes/ProtectRouteAdmin';
import { IoIosLogOut } from "react-icons/io";



function App() {
  const { currentUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(0)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/signin' />;
  };

  const handleTel = () => {
    const confirmCall = window.confirm("Biz bilan bog'laning");
    if (confirmCall) {
      window.location.href = "tel:+998883276060";
    }
  };

  const toggleMenu = () => {
    setShow(!show);
    const root = document.getElementsByTagName("html")[0];
    root.style.overflowY = show ? "auto" : "hidden";
  };
  let user = localStorage.getItem('users')

  const logOut = () => {
    localStorage.removeItem('users');
    window.location.reload();
    <Navigate to={'/'} />
  };


  return (
    <>
      <header className="text-white body-font bg-gray-800">
        <div className="bg-gray-800 fixed w-full z-50">
          <div className="w-full mx-auto flex flex-wrap p-5 justify-between items-center">
            <div className='flex'>
              <div className='text-[28px]  mr-5'>
                <FaBars onClick={toggleMenu} />
              </div>
              <NavLink className="mr-5 font-bold text-[20px] hover:text-yellow-400" to="/">
                <img src={logo} alt="logo" className='max-w-40 mr-7' />
              </NavLink>
            </div>
            <div className='flex sm: '>
              <BsTelephone className="mr-3 inline-block font-bold text-[25px] ease-in duration-300  hover:text-yellow-400 text-center" onClick={handleTel} />
              <NavLink className="mr-3 inline-block font-bold text-[25px] ease-in duration-300 hover:text-yellow-400 text-center" to="/sevimli">
                <FaRegHeart />
              </NavLink>
              <NavLink className="mr-3 inline-block font-bold text-[25px] ease-in duration-300 hover:text-yellow-400 relative" to="/savatcha">
                <small className='text-blue-600 absolute top-0 right-0 text-[15px] font-bold transform translate-x-1/2 -translate-y-1/2'>{count}</small>
                <MdOutlineShoppingCart />
              </NavLink>
              {!user && <NavLink className="mr-3 inline-block font-bold text-[25px] ease-in duration-300 hover:text-yellow-400" to="/signin">
                <PiSignInBold />
              </NavLink>}
              <NavLink className="mr-5 font-bold text-[25px] ease-in duration-300 hover:text-yellow-400" to="/dashboard">
                <VscAccount />
              </NavLink>
              {user && <button onClick={logOut} className="mr-5 font-bold text-[25px] hover:text-yellow-400"><IoIosLogOut /></button>}

            </div>
          </div>
        </div>
      </header>

      {show && (
        <Fragment>
          <div onClick={toggleMenu} className='w-full h-full bg-[rgba(0,0,0,.5)] fixed top-0 left-0 z-40'></div>
          <div className='fixed top-0 left-0 w-[250px] h-full bg-white shadow-md z-50'>
            <div className='flex justify-end p-4'>
              <IoCloseSharp className='text-[28px]' onClick={toggleMenu} />
            </div>
            <nav className='flex flex-col items-start p-4'>
              <NavLink className="mb-4 text-gray-700 hover:text-yellow-400" to="/" onClick={toggleMenu}>Home</NavLink>
              <NavLink className="mb-4 text-gray-700 hover:text-yellow-400" to="/sevimli" onClick={toggleMenu}>Sevimli</NavLink>
              <NavLink className="mb-4 text-gray-700 hover:text-yellow-400" to="/savatcha" onClick={toggleMenu}>Savatcha</NavLink>
              <NavLink className="mb-4 text-gray-700 hover:text-yellow-400" to="/signin" onClick={toggleMenu}>Sign In</NavLink>
              <NavLink className="mb-4 text-gray-700 hover:text-yellow-400" to="/dashboard" onClick={toggleMenu}>Dashboard</NavLink>
            </nav>
          </div>
        </Fragment>
      )}



      <Routes>
        <Route element={<Home count={count} setCount={setCount} searchTerm={searchTerm} />} path='/' />
        <Route element={<SignIn />} path='/signin' />
        <Route element={<ProtectRouteAdmin><Dashboard /></ProtectRouteAdmin>} path='/dashboard' />
        <Route element={<AddToCard />} path='/savatcha' />
        <Route element={<Sevimli />} path='/sevimli' />
      </Routes>
    </>
  );
}

export default App;
