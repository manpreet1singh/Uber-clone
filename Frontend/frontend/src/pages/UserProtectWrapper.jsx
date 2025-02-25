import React from 'react'
import{useContext} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const UserProtectWrapper = ({children}) => {

    const navigate = useNavigate()
    const {user,setUser} = useContext(UserDataContext)
    const token = localStorage.getItem('token')
    const [isLoading,setIsLoading]=useState(true)
    useEffect(() => {
      if (!token) {
        navigate('/login');
        return;
      }
    
      axios.get(`${import.meta.env.VITE_API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data.user);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error('❌ Error:', error.response ? error.response.data : error.message);
          localStorage.removeItem('token');
          navigate('/login');
        });
    }, [token, navigate, setUser]);
    
  if(isLoading){
      return <div>Loading...</div>
  }


  return (
    <>
    {children}
    </>
  )
}

export default UserProtectWrapper