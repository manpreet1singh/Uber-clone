import React ,{useState}from 'react'
import { Link } from 'react-router-dom'
import {useContext} from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const CaptainLogin = () => {
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [captainData, setCaptainData] = useState({})
        const {captain,setCaptain,updateCaptain} = useContext(CaptainDataContext)

        const navigate = useNavigate()

        const submitHandler = async (e) => {
            e.preventDefault()


            const captain={
                email:email,
                password:password
            }
            const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,captain)
            console.log(response)
            if(response.status===200){
                const data=response.data
                updateCaptain(data.captain)
                localStorage.setItem('token',(data.token))
                navigate('/captain-home')
                console.log(data.captain.fullname.firstname)
            }
           
            setEmail('')
            setPassword('')
        }
  return (
   <div className='p-7 h-screen flex flex-col justify-between' >
           <div>
           <img className='w-20 mb-3  ' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
           <form onSubmit={(e)=>{submitHandler(e)}}>
               <h3 className='text-lg font-medium mb-2'>Whats your email</h3>
               <input required 
                      value={email}
                      onChange={(e)=>{setEmail(e.target.value)
                   
                      }
                      
                   }
                      className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
                      type="email"
                      placeholder='youremail@gmail.com'/>
               <h3 className='text-lg font-medium  mb-2'>Whats your password</h3>
               <input  required 
                       value={password}
                       onChange={(e)=>{setPassword(e.target.value)
                       }}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
                       type="password" 
                       placeholder='enter password' />
               <button className='bg-[#111] text-white font-semibold mb-3  rounded px-4 w-full text-lg placeholder:text-base'>Login</button>
          
           </form>
           <p className='text-center' >Join a fleet?<Link to='/captain-signup' className='text-blue-600' > Register as captain</Link></p> 
           </div>
           <div> 
               <Link  to='/login' className='bg-[#d5622d] flex justify-center items-center text-white font-semibold mb-5 rounded px-4 w-full text-lg placeholder:text-base'> Sign in as User</Link>
              
           </div>
   
       </div>
  )
}

export default CaptainLogin