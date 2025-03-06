import React from 'react'
import { useState,useRef } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'

const Home = () => {
  const [pickup,setPickup]=useState('')
  const [destination,setDestination]=useState('')
  const [panelOpen,setPanelOpen]=useState(false)
  const panelRef=useRef(null)
    const submithandler=(e)=>{
        e.preventDefault()
    }

    // useGSAP(function(){
    //   gsap.to(panelRef.current,{
    //     height:panelOpen?'70%':'0%'})
    // },[panelOpen])
  return (
    <div className='relative h-screen'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div className='h-screen w-full object-cover'>
        <img  className='h-full w-full object-cover' src="https://cdn.dribbble.com/users/844221/screenshots/4539927/attachments/1027442/uber-search-2.png" alt="" />
      </div>

      <div className='flex flex-col justify-end h-screen absolute w-full top-0 p-5'>
        <div className='h-[30%] p-5 bg-white relative'>
        <h4 className='text-2xl font-semibold' >Find a trip</h4>
        <form onSubmit={(e)=>{
          submithandler(e)
        }} >
          <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
          <input 
          value={pickup}
          onClick={()=>{setPanelOpen(!panelOpen)
          // console.log('clicked')
        }}
          onChange={(e)=>{setPickup(e.target.value)}}
          className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' 
          type="text" 
          placeholder='Add a pick-up location' />
          <input  
          value={destination}
          onChange={(e)=>{setDestination(e.target.value)}}
          className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3' 
          type="text" 
          placeholder='Enter destination' />
        </form>
        </div>
        <div  ref={panelRef} className={`h-0 bg-red-500  overflow-hidden transition-height duration-300 ease-in-out ${
          panelOpen ? 'h-[70%]' : 'h-0'}`
        }>

        </div>
      </div>

    </div>
  )
}

export default Home