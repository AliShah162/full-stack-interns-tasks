import { createContext } from "react";

export const counterContext =createContext(0)
//is se ye hoga k hmen kbhi kbhi aik state ya varibale ko kisi nested component tk le jane k liye pehle us k sb hi parent components se guzaranna prta hai jo k theek nhin. contextApi ka use kr k direct aik component se kisi bhi doosre component ko kuch bhi bhej skte hain, bghair props drilling kiye

//jis comp mein se kuch bhejna hai us comp ko <counterContext.Provider></counterContext.Provider>  mein wrap kr do, import bhi krna hai useContext ko top pe. Is k baad sare child direclty use kr skte hain parent k kisi bhi variable y state ko

// const [count, setcount] = useState(0) //hum setCount bhi bhej skte hain
// for example state variable ko bhejne k liye:

//  <counterContext.Provider value={count}>
// <Navbar/> is tarh se navbar ko to count variable mile ga hi, sath mein us k sare childs ko bhi
// </counterContext.Provider>


import React from 'react'
import { useContext } from "../context/context.js"; //pehle import kren ge
const Component1 = () => {
    const counter=useContext(counterContext) //phr is tarh se
  return (
    <div>{counter}</div>//ab yahn counter ki value mil jaye gi
  )
}

export default Component1