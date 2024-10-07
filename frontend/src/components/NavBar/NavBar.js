import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';

const NavBar = () => {
    const [show,setShow]=useState(false)
    let location = useLocation();
    const {user,logoutUser}=useContext(AuthContext)
    
  return (
        <nav className="bg-gray-100  fixed w-full text-black z-20 top-0 start-0 border-b border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://th.bing.com/th/id/OIP.s8xXmQ1-uwIqmbWTs4mIngHaHa?rs=1&pid=ImgDetMain"
                        className="h-8"
                        alt="Flowbite Logo"
                    />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">City Bank Planner</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user ?(
                            <button type="button" onClick={logoutUser}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center ">Logout</button>

            ):(
                            <Link type="button" to="/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center ">Login</Link>

            )}
            <button data-collapse-toggle="navbar-sticky" onClick={()=>{setShow(!show)}} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
        <div className={`items-center justify-between  w-full md:flex md:w-auto md:order-1 ${show ?(""):("max-md:hidden")}`} id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
            <li>
                <Link to="/" className={`block py-2 px-3 md:p-0  rounded bg-transparent ${location.pathname==="/" ?("text-blue-500"):("text-black")}`} aria-current="page">Home</Link>
            </li>
            <li>
                <Link to="/advisor" className={`block py-2  px-3  rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 ${location.pathname==="/advisor" ?("text-blue-500"):("text-black")}`}>Advisor</Link>
            </li>
            <li>
                <Link to="/evalutor" className={`block py-2  px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0  ${location.pathname==="/evalutor" ?("text-blue-500"):("text-black")}`}>Evaluator</Link>
            </li>
           
            </ul>
        </div>
        </div>
        </nav>

  )
}

export default NavBar