import React ,{useState}from 'react'
import { Link } from 'react-router-dom'
const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})

    const submitHandler = async (e) => {
        e.preventDefault()
        setUserData({email:email,password:password})
        console.log(userData)
        setEmail('')
        setPassword('')
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between' >
        <div>
        <img className='w-16 mb-10 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
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
        <p className='text-center' >New here?<Link to='/signup' className='text-blue-600' > Create new account</Link></p> 
        </div>
        <div> 
            <Link  to='/captain-signup' className='bg-[#10b461] flex justify-center items-center text-white font-semibold mb-7 rounded px-4 w-full text-lg placeholder:text-base'> Sign in as Captain</Link>
           
        </div>

    </div>
  )
}

export default UserLogin