import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Navbar() {
  // useselector store se getkrne k lie
  const items = useSelector(state => state.cart) //iske under aap ko se state ko subscribe krna chahte ho 
  console.log("Items inside navbar" ,items);
  return (
    <div className='bg-slate-400 flex justify-between p-4 text-xl'>
      <span className='logo'>REDUX STORE</span>
      <div className='mx-4 justify-evenly  '>
        <Link className='mx-3 hover:font-extrabold hover:text-white' to ='/'>Home</Link>
        <Link className='mx-3  hover:font-bold hover:text-white' to='/cart'> Cart</Link>
        <span className='mx-3  hover:font-bold hover:text-white'> Cart items : {items.length}</span>
      </div>

    </div>

  )
}
