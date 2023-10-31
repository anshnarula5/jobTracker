"// Login.js"
import React, { useEffect } from 'react';
import { authenticate } from '../rest/apiService';
import { logIn, logOut  } from '@/redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { redirect } from 'next/navigation';

const Login = ({ userData, setUserData, setIsLogin } : any) => {
  const { email, password } = userData;

  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state : any)=> state.authReducer.value)

  useEffect(() => {
    if(state.authToken){
      redirect("/")
    }
  }, [state])

  const handleSubmit = async(e : any) => {
    e.preventDefault()
    console.log("submuit")
    const resData = await authenticate({email, password});
    const { email : mail, firstName, id, lastName, token : authToken} = resData;
    if(!resData) return
    const name = firstName + " " + lastName
    const data = {
      name, email : mail, id, authToken
    }
    console.log(data)
   dispatch(logIn(data))
  }

  const handleEmailChange = (e : any) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const handlePasswordChange = (e : any) => {
    setUserData({ ...userData, password: e.target.value });
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-4 text-center">Login</h2>
      <div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
          className="w-full bg-gray-100 border-2 rounded mb-4 p-2"
        />
      </div>
      <div>
        <input
          type="password"
          required
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="w-full bg-gray-100 border-2 rounded p-2"
        />
      </div>
      <div className="mt-4">
        <button className="bg-green-500 text-white p-2 rounded w-full" type='submit'>
          Login
        </button>
      </div>
      <div className='mt-4 text-center'>
        Don't have an account? 
        <div className='text-green-600 cursor-pointer'
          onClick={() => setIsLogin(false)}
          >Register</div>
      </div>
    </form>
  );
};

export default Login;
