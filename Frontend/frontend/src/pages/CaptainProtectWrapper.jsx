import React from 'react'
import{useContext} from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'

const CaptainProtectWrapper = ({children}) => {

    const navigate = useNavigate()
    const {captain,setCaptain} = useContext(CaptainDataContext)
    const[isLoading,setIsLoading]=useState(true)

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return
        }
        axios.get(`${import.meta.env.VITE_API_URL}/captain/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
        }).then((response) => {
        if(response.status===200){
            setIsLoading(false)
            setCaptain(response.data.captain)
        
        }}).catch((error) => {
            console.error('Error:', error.response ? error.response.data : error.message);
            localStorage.removeItem('token')
            navigate('/captain-login')
        })
    }, [captain, navigate,token]);//now the token is also generated for user so how we know that it is user or captain
 
    
    if(isLoading){
        return <div>Loading...</div>
    }
    return (
    <>
    {children}
    </>
  )
}

export default CaptainProtectWrapper