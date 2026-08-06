"use client"
import Image from "next/image";
import { lazy, Suspense, useEffect, useState } from "react";
// import UseMemoDemo from "./components/useMemo.jsx"; 
import UseCallbackhook from './components/UseCallbackhook.jsx'
import UseRef from "./components/UseRef.jsx";
import Toggle from "./ThemeToggler/Toggle.jsx";
// const User =lazy(()=>import('./LazyLoading/User.js'))
import UseApi from "./CustomHookForApi/UseApi.jsx";
import Button from "./LibraryofComponents/ui/Button.jsx";
import Modal from "./ModalPractice/Modal.jsx";

export default function Home() {
  // const api = UseApi("https://fakestoreapi.com/products");
  
  // //  Check loading state
  // if (api.loading) {
  //   return <div className="flex items-center justify-center min-h-screen">⏳ Loading products...</div>;
  // }

  // //  Check error state
  // if (api.error) {
  //   return <div className="flex items-center justify-center min-h-screen text-red-500">❌ Error: {api.error}</div>;
  // }

  // const [load, setLoad] = useState(false)
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* <Toggle/> */}
      {/* <div> */}
      {/* <UseMemoDemo />  */}
      {/* <UseCallbackhook adjective={"Ali's"} /> */}
      {/* <UseRef/> */}
      {/* <h1>Lazy Loading</h1> */}
      {/* <button onClick={()=>setLoad(!load)}>{load ? "Hide users" : "Load Users"}</button> */}
      {/* {load? <Suspense fallback={<h3>Loading....</h3>}><User/></Suspense> :null} */}
      {/* </div> */}
      {/* <div>
        {api.data?.map((item, index) => {
          return <h1 key={index}>{item.title}</h1>
        })} */}
      {/* </div> */}
      <Modal/>
    </div>
  );
}