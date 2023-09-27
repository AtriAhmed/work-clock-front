import classNames from 'classnames';
import React, { MouseEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import RenderIfAId from '../utils/RenderIfAId';
import { useAuthContext, AuthContextType } from '../utils/contexts/AuthProvider';
import axios from 'axios';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { ThemeContextType, useThemeContext } from '../utils/contexts/ThemeProvider';

interface NavbarProps {}


const Navbar: React.FC<NavbarProps> = () => {
    const { theme, setTheme } = useThemeContext() as ThemeContextType;

    const toggleTheme = ()=>{
        document.body.classList.toggle("dark");
       if(theme == "light"){
        setTheme("dark")
        localStorage.setItem("theme","dark");
       }else{
        setTheme("light")
        localStorage.setItem("theme","light")
       }
    }

  const navigate = useNavigate();
  const { user, setUser } = useAuthContext() as AuthContextType;

  const handleLogout = () => {
    axios
      .get('/api/logout')
      .then((res) => {
        setUser(res.data.user);
        console.log('Successfully logged out');
        navigate('/');
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <nav className='shadow-xl fixed w-full bg-white dark:bg-gray-800 dark:text-white z-10 transition duration-300'>
      <div className='font-semibold max-w-7xl flex px-4 py-3 gap-4 mx-auto items-center'>
        <div className='text-xl font-bold flex grow'>{user?.accessId == 3 ? "Admin Interface" : user?.accessId == 2 ? "Accountant Interface" : "Employee Interface" }</div>
       
<div>
    <button onClick={toggleTheme} className="flex items-center">{theme == "dark" ? <MoonIcon className="h-6 w-6 text-white"></MoonIcon> :<SunIcon className="h-6 w-6"></SunIcon>  }  </button>
</div>
        <div className=''>
          <button type='button' onClick={handleLogout} className='font-semibold rounded-md'>
            Log-out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
