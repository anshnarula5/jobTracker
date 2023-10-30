"use client"

import React, { useEffect, useState } from 'react'
import Login from './Login';
import Register from './Register';
import { redirect } from 'next/navigation'
import { useSelector } from 'react-redux';
const Auth = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [isLogin, setIsLogin] = useState(true);
  const state = useSelector((state : any)=> state.authReducer.value)
  
  if(state.token){
    redirect("/")
  }
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-700">
      <div className="bg-white p-8 rounded shadow-md">
        {isLogin ? (
          <Login userData={userData} setUserData={setUserData} setIsLogin={setIsLogin} />
        ) : (
          <Register userData={userData} setUserData={setUserData} setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
};


export default Auth