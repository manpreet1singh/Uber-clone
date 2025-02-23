import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const UserSignup = () => {
        const [firstName, setFirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [userData, setUserData] = useState({})
    
        const submitHandler = async (e) => {
            e.preventDefault()
            setUserData({
                fullName:{
                firstName:firstName,
                lastName:lastName},
                email:email,password:password})
            console.log(userData)
            setEmail('')
            setPassword('')
            setFirstName('')
            setLastName('')
        }
  return (
    <div className='p-7 h-screen flex flex-col justify-between' >
        <div>
        <img className='w-16 mb-10 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={(e)=>{submitHandler(e)}}>
            <h3 className='text-base font-medium mb-2'>Whats your name?</h3>
            <div className='flex gap-4'>
            <input type="text"
                     required 
                     value={firstName}
                     onChange={(e)=>{setFirstName(e.target.value)
                 
                     }
                     
                 }
                     className='bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border  text-base placeholder:text-sm '
                     placeholder='First name'

            />
            <input type="text"
                     required 
                     value={lastName}
                     onChange={(e)=>{setLastName(e.target.value)
                 
                     }
                     
                 }
                     className='bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border  text-base placeholder:text-sm '
                     placeholder='Last name'

            />
            </div>
            <h3 className='text-base font-medium mb-2'>Whats your email</h3>
            <input required 
                   value={email}
                   onChange={(e)=>{setEmail(e.target.value)
                
                   }
                   
                }
                   className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm '
                   type="email"
                   placeholder='youremail@gmail.com'/>
            <h3 className='text-lg font-medium  mb-2'>Whats your password</h3>
            <input  required 
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)
                    }}
                     className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm '
                    type="password" 
                    placeholder='enter password' />
            <button className='bg-[#111] text-white font-semibold mb-3  rounded px-4 w-full text-lg placeholder:text-base'>Sign Up</button>
       
        </form>
        <p className='text-center' >Already have a account?<Link to='/login' className='text-blue-600' > Sign in </Link></p> 
        </div>
        <div> 
            <p className='text-xs leading-tight'>This site is protected by reCAPTCHA and <span className='underline'>Google policies</span> and <span>Terms of Service apply</span></p>
        </div>

    </div>
  )
}

export default UserSignup