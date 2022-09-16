import React from "react";
import Link from "next/Link";
import mongoose from "mongoose";
import Product from "../models/Product";
const tshirts = ({products}) => {
  // console.log(products);
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container lg:pl-24 py-24 mx-auto ">
        <div className="flex flex-wrap justify-evenly  ">
            {products.map((p) => { // passhref is use to open link when we  click on that component
              return <div key={p._id} className="lg:w-1/5 md:w-1/4 p-5 m-3 border rounded-md border-pink-500 w-full shadow-lg">
                <Link passHref={true} href={`/products/${p.slug}`}>
                  <div>
                    <a className="block relative rounded overflow-hidden">
                      <img alt="ecommerce" className="h-1/4 m-auto block " src={p.img} />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Tshirts</h3>
                      <h3 className="text-gray-900 title-font text-lg font-medium">{p.title}</h3>
                      <p className="mt-1">₹{p.price}</p>
                    </div>
                  </div>
                </Link>
              </div>
            })}
          </div>
         
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readystate){
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find();
  return {
    props: {products:JSON.parse(JSON.stringify(products))}, // will be passed to the page component as props
  }
}

export default tshirts;

