"use client"
import Image from "next/image";
import { useState,useMemo } from "react";
export default function Home() {
  const [count, setCount] = useState(0)
  const [val, setVal] = useState(0)


  function expensiveTasks(num){
    console.log("Inside expensive task");
    
    for(let i=1; i<=10000; i++);
    return num*2
  }

let doubleValue= useMemo(() => expensiveTasks(val), [val])   //now because of useMemo, the looop wont take time and everythni will work normally
//useMemo caches the calculated result of an expensive function between renders to improve performance
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Count: {count}</h1>
      <input type="number" onChange={(e)=>setVal(e.target.value)}  value={val} className="border border-amber-200"/>
      <button onClick={()=>setCount(count+1)} className="bg-blue-500 p-3 mt-3 rounded-xl cursor-pointer">Click Me</button>
      <h1>Double is: {doubleValue}</h1>
    </div>
  );
}
