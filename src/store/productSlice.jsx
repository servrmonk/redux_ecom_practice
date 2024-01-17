import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const STATUSES = {
// hm nai chahte hai  ki koi v status.idle kr k idle ka status change kr sake so we'll use object.freeze
//     IDLE:'idl',
//     ERROR:'error',
//     LOADING:'loading'
// }
export const STATUSES = Object.freeze({
  IDLE: "idl",
  ERROR: "error",
  LOADING: "loading",
}); //ab ye read only ho chucka hai ab koi bahar se change nai kr sakta hai

const initialState = {
  // initial state object rkhna hai taki api call thora time le sakti hai to hm loading state dikha sakte hai
  data: [], //productList k lie array
  // status:'skdi'  //current status if loading ho yaa error ho ye sb request, stirng k case me aap enum use kr sakte ho ye typescript me hai jo ki hm uper bana lie hai
  status: STATUSES.IDLE,
};
const productSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setProducts(state, action) {
      state.data = action.payload; //uper wala jo data array hai usme action.payload ka value directly chala jaega

      //koi  v asyn call aap reducer k under se nai kr sakte ho qkijo humare reducer hote hai wo synchronously call hota hai wo pure fun hota hai iska matlab iska koi v sideeffect nai hona chahiye ye jo api call hai isko aap sideeffect v bol sakte ho
      //to hme request kaha maare to iske lie hm thunk middleware use kro
      // const res = await fetch(`https://fakestoreapi.com/products`);
    },
    setStatus(state, action) {
      state.status = action.payload; //uper wala status
    },
  },
});
export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

//the word 'thunk' is a programming term that means 'a piece of code thet does some delayed work ' Rather than execute some logic now. we can write a function body or code that can be used to perform the work later

//redux toolkit me thunk inbuilt aata hai so alag se configur krne k need nai hai 2 trh se thunk use kr sakte hai . thunk means ek fun hota hai export kr do

//method 1  ---------------------------

// export function fetchProducts() {
//   // is fun se ek fun return krna pdta hai jo thunk hai wo khud se ek fun hai jo ek fun return krta hai
//   return async function fetchProductThunk(dispatch, getState) {
//     //is fun me do parameter aate hai dispatch and getstate

//     // req start krne se pehle ek dispatch krenge loading state ko on kr dia
//     dispatch(setStatus(STATUSES.LOADING));
//     // const prop = getState() //yaha se jo v property chahiye le sakte hai yaha pr koi use nai hai so we r not useing here
//     try {
//       const res = await fetch(`https://fakestoreapi.com/products`);
//       const data = await res.json();
//       //   fir yaha se ek action dispatch krenge avi mera action setProduct hai
//       dispatch(setProducts(data));
//       dispatch(setStatus(STATUSES.IDLE));
//     } catch (err) {
//       console.log(err);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }

// method 2 ----------------------------
// ek method hai createAsyncthunk  ye toolkit se method hai . isme hai pehla parameter hai identifier and 2nd parameter ek async fun hota hai baaki same kaam uper wala. aisa kia gya hai better error handling k lie 
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch(`https://fakestoreapi.com/products`);
  const data = await res.json();
  return data;
});
