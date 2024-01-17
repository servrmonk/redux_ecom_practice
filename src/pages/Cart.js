import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../store/cartSlice";

const Cart = () => {
  const products = useSelector((state) => state.cart);
  console.log("Products in cart.js", products);
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    // store hme change krna pdta hai to action ko dispatch krna hoga
    dispatch(remove(id));
  };
  return (
    <div>
      <h1>Cart</h1>
      <div className="border-2 flex">
        {products.map((prod) => (
          <div className="w-28 shadow-2xl mx-4 m-auto p-2 ">
            <img src={prod.image} alt="productImage" />
            <h5>{prod.title}</h5>
            <h5>{prod.price}</h5>
            <button
              onClick={() => deleteHandler(prod.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
