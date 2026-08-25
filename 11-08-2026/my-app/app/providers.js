"use client"
import { Provider } from "react-redux"
import { store } from "./store"

export function Providers({children}){
    return <Provider store={store}>{children}</Provider>  //this store came from 'features/index.js' where we created our store
}

