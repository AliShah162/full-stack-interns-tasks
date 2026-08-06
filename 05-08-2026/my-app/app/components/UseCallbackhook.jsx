"use client"
import  { useState, memo } from 'react'
import '../globals.css'
const UseCallbackhook = ({adjective}) => {
    console.log("This will render");
    
    const [count, setCount] = useState(0)
  return (
    <div>I am {adjective} useCallbackhook
    <br />
    <button onClick={()=>setCount(count+1)}>Click Me</button>
    <br />
    <h1>Count: {count}</h1>
    
    
    </div>



  )
}

export default memo(UseCallbackhook) 