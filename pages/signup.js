/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect  } from 'react'
import Link from "next/link"
import { useRouter } from 'next/router'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
        router.push('/')
    }
}, []);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpass] = useState("");
  const router = useRouter();
  const handleChange = (e) => {

    if (e.target.name === "name") {
      setname(e.target.value)
    }
    else if (e.target.name === "email") {
      setemail(e.target.value)
    } else {
      setpass(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password }
    console.log("data : ", data);
    let res = await fetch("http://localhost:3000/api/signup", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log("res : ", res.body);
    let response = await res.json();
    console.log(response);
    setname("");
    setpass("");
    setemail("");
    toast('Account created successfully!', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    // router.push("/login")
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer/>
      <div className="max-w-md w-full space-y-8">
        <div>
        <img className="mx-auto h-12 w-auto" src="/codeswearcircle.png" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href={"/login"}>
              <a href="#" className="font-medium text-pink-600 hover:text-pink-500"> SignIn </a>
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div >
              <label htmlFor="name" className="sr-only">Name</label>
              <input onChange={handleChange} id="name" value={name} name="name" type="text" autoComplete="name" required className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Your Name" />
            </div>
            <div >
            <label htmlFor="email-address" className="sr-only">Email address</label>
              <input onChange={handleChange} id="email" value={email} name="email" type="text" autoComplete="email" required className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input onChange={handleChange} id="password" name="password" value={password} type="password" autoComplete="current-password" required className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-pink-200 group-hover:text-pink-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup