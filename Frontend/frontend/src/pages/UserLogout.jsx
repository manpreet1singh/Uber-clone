import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/login'); // Redirect to login after successful logout
        }
      } catch (error) {
        console.error('Logout failed:', error.response ? error.response.data : error.message);
      }
    };

    logoutUser(); // Call the async logout function
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default UserLogout;
