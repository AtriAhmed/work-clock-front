import React, { useEffect, useRef, useState } from 'react'
import { AuthContextType, useAuthContext } from '../utils/contexts/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

export default function AvatarDropdown() {
    const dropdownRef = useRef<any>(null);

    const [show,setShow] = useState(false)

    const { user, setUser } = useAuthContext() as AuthContextType;

    const navigate = useNavigate();

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

      const handleClickOutside = (event:any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShow(false);
        }
      };
    
      // Attach click event listener to the document when the component mounts
      useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        // Clean up the event listener when the component unmounts
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);

  return (
    <div className='relative' ref={dropdownRef}>
    <div onClick={()=>{setShow(!show)}} className='absolute h-full w-full hover:bg-[rgba(0,0,0,0.1)] z-10 rounded-full transition' ></div>
                                          <Avatar
name={user.firstname}
src={"http://localhost:5000/"+user.picture} // Use null if picture is not available
size="40" // Adjust the size as needed
round={true}
/>
      <div className={`${show ? "" : "pointer-events-none opacity-0"} transition font-normal text-sm absolute bg-white right-0 p-2 rounded-lg top-[55px] flex flex-col justify-start min-w-[150px]`}>
        <Link to="#" className='py-2 px-3 hover:bg-gray-200 rounded-lg'>Profile</Link>
      <button type='button' onClick={handleLogout} className='rounded-lg py-2 px-3 hover:bg-gray-200 text-start'>
      Logout
    </button>
        </div>                                  
  </div>
  )
}
