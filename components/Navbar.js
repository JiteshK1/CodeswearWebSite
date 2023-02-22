import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  AiFillCloseCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
BsFillCartCheckFill;
import { useRef, useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';

const Navbar = ({ logout, user,cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [dropdown, setDropdown] = useState(false);
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-10">
        <div className="logo mr-auto md:mx-5">
        <Link href={"/"}><a><Image width={200} height={40} src="/logo.png" alt="" /></a></Link>
      </div>
      <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center font-bold md:text-md">
        <Link href="/tshirts">
          <a className="mr-5 text-pink-700 hover:text-black">T-shirts</a>
        </Link>
        <Link href="/hoodies">
          <a className="mr-5 text-pink-700 hover:text-black">Hoodies</a>
        </Link>
        <Link href="/stickers">
          <a className="mr-5 text-pink-700 hover:text-black">Stickers</a>
        </Link>
        <Link href="/mugs">
          <a className="mr-5 text-pink-700 hover:text-black">Mugs</a>
        </Link>
      </nav>
      <div className="cursor-pointer items-center cart absolute right-0 top-4 mx-5 flex">
                <a onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>
                    {dropdown && <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="absolute right-8 top-6 rounded-md px-5 py-2 w-32 bg-black text-pink-300">
                        <ul>
                            <a href={'/myaccount'}><li className='py-1 hover:text-pink-600 font-bold text-sm'>My Account</li></a>
                            <a href={'/orders'}><li className='py-1 hover:text-pink-600 font-bold text-sm'>Orders</li></a>
                            <a><li onClick={logout} className='py-1 hover:text-pink-600 font-bold text-sm'>Logout</li></a>
                        </ul>
                    </div>}
                    {user.value && <MdAccountCircle className='text-xl md:text-2xl mx-2' />}
                </a>
                {!user.value && <Link href={'/login'}>
          <a>
          <button className=' mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm'>Login</button>
          </a>
          </Link>}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="cursor-pointer text-xl md:text-2xl"
        />
      </div>
      <div
        ref={ref}
        className={`w-72 h-[100vh] sideCart absolute top-0 right-0 bg-pink-100 p-10 transform transition-transform ${Object.keys(cart).length === 0 ? 'translate-x-full' : 'translate-x-0'}`}
      >
        <h2 className="font-bold text-xl">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className=" cursor-pointer text-2xl text-pink-500 hover:text-black absolute top-3 right-3"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold ">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 font-semibold">Your Cart is Empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">{cart[k].name} {cart[k].size}/{cart[k].variant}</div>
                  <div className="flex items-center justify-center w-1/3 text-lg ">
                    <AiOutlineMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer"
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <AiOutlinePlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <h3 className="font-bold mx-2">SubTotal : ₹{subTotal}</h3>
        <div className="flex">
          <Link passHref={true} href={"/checkout"}>
            <button className="flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
              <BsFillCartCheckFill className="m-1" />
              Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
          >
            <BsFillCartCheckFill className="m-1" />
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
