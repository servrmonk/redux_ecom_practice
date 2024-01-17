import React, { useEffect, useState } from "react";
import { add } from "../store/cartSlice";
import { useDispatch } from "react-redux";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`https://fakestoreapi.com/products`);
      const data = await res.json();
      console.log("Data ", data);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const dispatch = useDispatch()

  const handleAdd =(product) =>{
    // yaha se is product ko redux store k under store krna hai product ko 
    // usedispatch se action ko call krdo 
    dispatch(add(product)) //product chala gya
  }

  return (
    <div className="flex flex-wrap ">
      {products.map((prod) => (
        <div className=" w-1/4 p-6 shadow-2xl  " key={prod.id}>
          <img src={prod.image} className="w-28 m-auto" alt="product_image" />
          <h4 className="text-lg font-semibold">{prod.title}</h4>
          <p className="text-gray-700">${prod.price}</p>
          <button onClick={()=>handleAdd(prod)} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;
