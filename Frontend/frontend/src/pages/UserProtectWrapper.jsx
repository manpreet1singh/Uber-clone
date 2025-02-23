import React from 'react'
import{useContext} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const UserProtectWrapper = ({children}) => {

    const navigate = useNavigate()
    const {user} = useContext(UserDataContext)
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (!user||!token) {
            navigate('/login');
        }
    }, [user, navigate,token]);
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectWrapper