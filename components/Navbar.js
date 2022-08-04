import React from "react";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center">
      <div className="logo">
        <Image width={200} height={40} src="/logo.png" alt="" />
      </div>
      <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center font-bold md:text-2xl">
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
      <div className="cart">
        <button>Cart</button>
      </div>
    </div>
  );
};

export default Navbar;
