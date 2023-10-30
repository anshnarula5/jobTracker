// Register.js
import React from 'react';

const Register = ({ userData, setUserData, setIsLogin } : any) => {
  const { email, password, firstName, lastName } = userData;

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("submuit")
    console.log(email, password, firstName, lastName)
  }
  const handleEmailChange = (e) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setUserData({ ...userData, password: e.target.value });
  };

  const handleFirstNameChange = (e) => {
    setUserData({ ...userData, firstName: e.target.value });
  };

  const handleLastNameChange = (e) => {
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
