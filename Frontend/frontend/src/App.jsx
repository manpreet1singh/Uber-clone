import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Start from './pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/home" element={<UserProtectWrapper>
        <Home/>
      </UserProtectWrapper>}/>

      <Route path="/login" element={<UserLogin/>}/>
      <Route path="/signup" element={<UserSignup/>}/>
      <Route path="/captain-signup" element={<CaptainSignup/>}/>
      <Route path="/captain-login" element={<CaptainLogin/>}/>
      <Route path="/captain-home" element={<CaptainProtectWrapper>
        <CaptainHome/>
      </CaptainProtectWrapper>}/>
      <Route path="/user/logout" element={<UserProtectWrapper>
        <UserLogout/>
      </UserProtectWrapper>}/>
    </Routes> 
    </div>
  )
}

export default App