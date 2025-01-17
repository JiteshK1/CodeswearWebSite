import { useRouter } from "next/router";
import { useState } from "react";
import mongoose from 'mongoose';
import Product from '../../models/Product';
const Post = ({ buyNow, addToCart, product, variants }) => {
  console.log(variants);
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const [color, setcolor] = useState(product.color);
  const [size, setsize] = useState(product.size);
  const checkService = async () => {
    let pins = await fetch("http://localhost:3000/api/pincode");
    let pinJson = await pins.json();

    if (pinJson.includes(parseInt(pin))) {
      setService(true);
    } else {
      setService(false);
      console.log(pinJson);
    }
    console.log(service);
  };
  const onPinChange = (e) => {
    setPin(e.target.value);
  };
  const refresh = (newSize, newColor) => {
    console.log(newSize, newColor);
    let url = `http://localhost:3000/products/${variants[newColor][newSize]["slug"]}`
    window.location = url;
  }
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto  px-24 object-top rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CODESWEAR
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} / {product.color}
              </h1>

              <p className="leading-relaxed">
                {product.desc}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>

                  {Object.keys(variants).includes("red") && Object.keys(variants["red"]).includes(size) && <button onClick={(e) => { refresh(size, "red") }} className={`border-2 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${color === "red" ? "border-black" : "border-gray-300"}`}></button>}
                  {Object.keys(variants).includes("blue") && Object.keys(variants["blue"]).includes(size) && <button onClick={(e) => { refresh(size, "blue") }} className={`border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color === "blue" ? "border-black" : "border-gray-300"}`}></button>}
                  {Object.keys(variants).includes("yellow") && Object.keys(variants["yellow"]).includes(size) && <button onClick={(e) => { refresh(size, "yellow") }} className={`border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === "yellow" ? "border-black" : "border-gray-300"}`}></button>}
                  {Object.keys(variants).includes("orange") && Object.keys(variants["orange"]).includes(size) && <button onClick={(e) => { refresh(size, "orange") }} className={`border-2 ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none ${color === "orange" ? "border-black" : "border-gray-300"}`}></button>}
                  {Object.keys(variants).includes("green") && Object.keys(variants["green"]).includes(size) && <button onClick={(e) => { refresh(size, "green") }} className={`border-2 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color === "green" ? "border-black" : "border-gray-300"}`}></button>}

                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size} onChange={(e) => { refresh(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 text-base pl-3 pr-10">
                      {Object.keys(variants[color]).includes("S") && <option value={"S"}>S</option>}
                      {Object.keys(variants[color]).includes("M") && <option value={"M"}>M</option>}
                      {Object.keys(variants[color]).includes("L") && <option value={"L"}>L</option>}
                      {Object.keys(variants[color]).includes("XL") && <option value={"XL"}>XL</option>}
                      {Object.keys(variants[color]).includes("XXL") && <option value={"XXL"}>XXL</option>}


                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {product.price}
                </span>
                <button onClick={() => { addToCart(slug, 1, product.price, product.title, size, color) }}
                  className="flex ml-3 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm"
                >
                  Add To Cart
                </button>
                <button onClick={() => {
                  buyNow(slug,
                    1,
                    product.price,
                    product.title,
                    size,
                    color)
                }} className="flex ml-3 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm">
                  Buy Now
                </button>

                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="pin mt-5 flex space-x-2 text-sm">
                <input
                  type="number"
                  onChange={onPinChange}
                  placeholder="Enter Your PinCode"
                  className="px-3 border-2 border-pink-200 rounded"
                />
                <button
                  onClick={checkService}
                  className="flex ml-14 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded"
                >
                  CheckPin
                </button>
              </div>
              {!service && service != null && (
                <div className="text-red-500 mt-3">
                  Sorry! We do not deliver to this pincode yet.
                </div>
              )}
              {service && service != null && (
                <div className="text-green-500 mt-3">
                  Yeah! This pincode is serviceable .
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export async function getServerSideProps(context) {

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let product = await Product.findOne({ slug: context.query.slug })
  let variants = await Product.find({ title: product.title, category: product.category })
  let colorSizeSlug = {}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    } else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }

    }
  }
  return {
    props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) },
  }
}
export default Post