// Register.js
import { logIn } from '@/redux/features/authSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../rest/apiService';
import { redirect } from 'next/navigation';
import axios from 'axios';
import { createAlert } from '@/redux/features/alertSlice';

const Register = ({ userData, setUserData, setIsLogin } : any) => {
  const { email, password, firstName, lastName } = userData;
  const dispatch = useDispatch()
  const handleSubmit = async(e : any) => {
    e.preventDefault()
    try {
      console.log(userData)
      const { data } = await axios.post("http://localhost:8080/api/auth/register", userData);
      const { data: resData } = data;
      const { email: mail, firstName, id, lastName, token: authToken } = resData;
      const name = firstName + " " + lastName
      const saveData = {
        name, email: mail, id, authToken
      }
      dispatch(createAlert({
        message: `Welcome ${firstName}`,
        type: "success"
      }))
      dispatch(logIn(saveData))
    } catch (error: any) {
      console.log(error)
      if (error.response.status === 409) {
        dispatch(createAlert({
          message: "Email already exists, try login.",
          type: "error"
        }))
      }
      else{
        dispatch(createAlert({
          message: "Something went wrong.",
          type: "error"
        }))
      }
    }
  }

  const state = useSelector((state : any)=> state.authReducer.value)

  useEffect(() => {
    if(state.authToken){
      redirect("/")
    }
  }, [state])
  const handleEmailChange = (e:any) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const handlePasswordChange = (e:any) => {
    setUserData({ ...userData, password: e.target.value });
  };

  const handleFirstNameChange = (e:any) => {
    setUserData({ ...userData, firstName: e.target.value });
  };

  const handleLastNameChange = (e:any) => {
    setUserData({ ...userData, lastName: e.target.value });
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-4 text-center">Register</h2>
      <div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          placeholder="Email"
          className="w-full bg-gray-100 border-2 rounded mb-4 p-2"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
          placeholder="Password"
          className="w-full bg-gray-100 border-2 rounded mb-4 p-2"
        />
      </div>
      <div>
        <input
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
          required
          placeholder="First Name"
          className="w-full bg-gray-100 border-2 rounded mb-4 p-2"
        />
      </div>
      <div>
        <input
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
          required
          placeholder="Last Name"
          className="w-full bg-gray-100 border-2 rounded mb-4 p-2"
        />
      </div>
      <div className="mt-4">
        <button
          className="bg-green-500 text-white p-2 rounded w-full" type='submit'>
          Register
        </button>
      </div>
      <div className='mt-4 text-center'>
        Already have an account? 
        <div className='text-green-600 cursor-pointer'
          onClick={() => setIsLogin(true)}
          >Login</div>
      </div>
    </form>
  );
};

export default Register;
