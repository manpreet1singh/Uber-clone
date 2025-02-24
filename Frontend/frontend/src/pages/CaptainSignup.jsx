import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  // User information states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Vehicle information states
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { captain, setCaptain,updateCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname: { firstname: firstName, lastname: lastName }, // Check this key name
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: parseInt(vehicleCapacity), // Ensure capacity is a number
        vehicleType: vehicleType,
      },
    };
  
    console.log("Data being sent:", newCaptain); // Debugging
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/register`,
        newCaptain
      );
      console.log(response.status);
      if (response.status === 201) {
        const data = response.data;
        updateCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
    }

    // Reset all fields after submission
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-3"
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Uber Logo"
        />
        <form onSubmit={submitHandler}>
          {/* User Info Section */}
          <h3 className="text-base w-full font-medium mb-2">
            What's your name?
          </h3>
          <div className="flex gap-4">
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border text-base placeholder:text-sm"
              placeholder="First name"
            />
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border text-base placeholder:text-sm"
              placeholder="Last name"
            />
          </div>

          <h3 className="text-base w-full font-medium mb-2">
            What's your email?
          </h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            placeholder="youremail@gmail.com"
          />

          <h3 className="text-base font-medium mb-2">
            What's your password?
          </h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="password"
            placeholder="Enter password"
          />

          {/* 🚗 Vehicle Info Section */}
          <h3 className="text-base w-full font-medium mb-2">
            Vehicle Information
          </h3>
          <input
            type="text"
            required
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            placeholder="Vehicle color"
          />
          <input
            type="text"
            required
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            placeholder="Vehicle plate number"
          />
          <input
            type="number"
            required
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            placeholder="Vehicle capacity (number of passengers)"
          />
          <select
            required
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base"
          >
            <option value="">Select vehicle type</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="motorcycle">Motorcycle</option>
          </select>

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 w-full text-lg">
            Sign Up
          </button>
        </form>

        <p className="text-center">
          Already have an account?
          <Link to="/login" className="text-blue-600">
            {' '}
            Sign in
          </Link>
        </p>
      </div>
      <div>
        <p className="text-xs leading-tight">
          This site is protected by reCAPTCHA and{' '}
          <span className="underline">Google policies</span> and{' '}
          <span>Terms of Service apply</span>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
