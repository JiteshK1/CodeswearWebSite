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
import { useRef } from "react";
const Navbar = () => {
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
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md">
      <div className="logo">
        <Image width={200} height={40} src="/logo.png" alt="" />
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
      <div className="cart absolute right-0 top-4 mx-5">
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="cursor-pointer text-xl md:text-2xl"
        />
      </div>
      <div
        ref={ref}
        className="w-72 sideCart absolute top-0 right-0 bg-pink-100 p-10 transform transition-transform translate-x-full"
      >
        <h2 className="font-bold text-xl">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className=" cursor-pointer text-2xl text-pink-500 hover:text-black absolute top-3 right-3"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold ">
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">Tshirt- Wear The Code</div>
              <div className="flex items-center justify-center w-1/3 text-lg ">
                <AiOutlineMinusCircle className="cursor-pointer" />
                <span className="mx-2 text-sm">1</span>
                <AiOutlinePlusCircle className="cursor-pointer" />
              </div>
            </div>
          </li>
        </ol>
        <div className="flex">
          <Link passHref={true} href={"/checkout"}>
            <button className="flex mr-2 mt-8 text-white bg-pink-500 border-0 py-1 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm">
              <BsFillCartCheckFill className="m-1" />
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
