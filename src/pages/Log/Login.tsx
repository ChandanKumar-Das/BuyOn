import React, { useState } from "react"
import MessageLogo from '../../assets/message-logo.png'
import { signup, logIn } from "../../config/firebase"


const Login = () =>{

    const [state ,setState] = useState('Sign Up');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandeler = (event:any) =>{
          event.preventDefault();
          
          if(state === 'Sign Up'){
            signup(userName,email,password)
           
          }
          if(state === 'Log In'){
            logIn(email,password)
          }
    }

    console.log(userName)

    return(
        <div className="flex justify-center items-center mt-20 ">
        <div className="flex w-3/5 h-3/5 bg-white shadow-lg rounded-lg overflow-hidden p-4">
          {/* Left Side - Chat Image */}
          <div className="flex-1 flex justify-center items-center">
            <img src={MessageLogo} alt="Chat" className="w-3/4 h-auto" />
          </div>
          
          {/* Right Side - Signup Form */}
          <div className="flex-1 bg-white flex justify-center items-center">
            <div className="w-3/4">
              <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">{state}</h2>
              <form onSubmit={submitHandeler} className="flex flex-col">
                {state === 'Sign Up' ? 
                <div className="flex flex-col"><label htmlFor="username" className="mb-2 text-gray-600">Username:</label>
                <input
                onChange={(e:any)=>setUserName(e.target.value)}
                value={userName}
                  type="text"
                  id="username"
                  name="username"
                  className="p-2 mb-4 border border-gray-300 rounded"
                  required
                /></div>
                : null}
                
  
                <label htmlFor="email" className="mb-2 text-gray-600">Email:</label>
                <input
                onChange={(e:any)=>setEmail(e.target.value)}
                value={email}
                  type="email"
                  id="email"
                  name="email"
                  className="p-2 mb-4 border border-gray-300 rounded"
                  required
                />
  
                <label htmlFor="password" className="mb-2 text-gray-600">Password:</label>
                <input
                onChange={(e:any)=>setPassword(e.target.value)}
                value={password}
                  type="password"
                  id="password"
                  name="password"
                  className="p-2 mb-4 border border-gray-300 rounded"
                  required
                />
  
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="mr-2"
                    required
                  />
                  <label htmlFor="terms" className="text-gray-400">
                    I agree to the terms and conditions
                  </label>
                </div>
  
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                  {state === 'Sign Up'? 'Create Account' : 'Log In'}
                </button>
              </form>
              {
                state === 'Sign Up' ? 
                <h2 className="mt-2 text-gray-500">Already have an account 
                <span 
                className="text-blue-400 cursor-pointer"
                onClick={()=>setState('Log In')}
                 > click here
                 </span>
            </h2> : 
               
               <h2 className="mt-2 text-gray-500">Create an account
                <span 
                className="text-blue-400 cursor-pointer"
                onClick={()=>setState('Sign Up')}
                 > click here
                 </span>
            </h2>
              }
              
            
            </div>
          </div>
        </div>
      </div>
    )
}

export default Login