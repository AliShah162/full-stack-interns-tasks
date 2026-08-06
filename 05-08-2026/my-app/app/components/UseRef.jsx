"use client"
import React, { useRef, useState,useEffect } from 'react'
//useRef is not recomended because it directly maipulates DOM, moreover it is also useful with count logic
const UseRef = () => {
const [count, setCount] = useState(0)
    const a = useRef(0)
    
    useEffect(() => {
        a.current = a.current + 1
        console.log(`The value of a is ${a.current}`) // 
    }, []) // ← Added empty dependency array
    

    // const inputRef = useRef(null)
    
    // const Inputhandle = () => {
    //     console.log(inputRef);
    //     inputRef.current.focus() // This will focus the input field
    //     inputRef.current.style.color = "red" // This will change text color
    // }

    // const Togglehandler = () => {
    //     // Check if input is currently visible
    //     if (inputRef.current.style.display !== 'none') {
    //         inputRef.current.style.display = 'none' // Hide input
    //     } else {
    //         inputRef.current.style.display = 'inline' // Show input
    //     }
    // }

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Click Me</button>
            <h1>Count: {count}</h1> {/* ← Show the actual count state */}
           
            {/* <button onClick={Togglehandler}>Toggle</button>
            <input ref={inputRef} type="text" /> */}
            {/* <button onClick={Inputhandle}>Enter Details</button> */}
        </div>
    )
}

export default UseRef