import React from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { useState } from 'react';

const Checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  return (
    <div className="container m-auto ">
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="font-bold text-xl ">1.Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-md text-gray-600">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-md text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-md text-gray-600">Address</label>
          <textarea cols="30" rows="2" type="text" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-md text-gray-600">Phone</label>
            <input type="number" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">

          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-md text-gray-600">Pincode</label>
            <input type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-md text-gray-600">State</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-md text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>

      <h2 className="font-bold text-xl ">2.Review Cart Items and Pay</h2>
      <div className="sideCart bg-pink-50 rounded p-6 m-3 text-xl">
        <ol className={`list-decimal ${Object.keys(cart).length != 0 ? "p-5" : ""}  font-semibold`}>
          {Object.keys(cart).length == 0 &&
            <div>
              <p className="font-semibold mt-3">Your cart is empty.</p>
            </div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-3">
                <div className="font-semibold ">{cart[k].name}({cart[k].size}/{cart[k].variant}) </div>
                <div className="w-1/3 font-semibold flex items-center justify-center "><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className=" hover:text-pink-600 cursor-pointer text-lg text-pink-500 mx-2" />{cart[k].qty}<AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className=" hover:text-pink-600  cursor-pointer text-lg text-pink-500 mx-2" />
                </div>
              </div>
            </li>
          })}
        </ol>
        <h3 className="font-bold mb-8">SubTotal : ₹{subTotal}</h3>

      </div>
      <div className="mx-3">
        <button className=" bg-pink-500 border-0 py-1 px-3 focus:outline-none hover:bg-pink-600 text-black  rounded w-32 text-xl  mx-auto">Pay ₹{subTotal}</button>
      </div>
    </div>
  )
}

export default Checkout