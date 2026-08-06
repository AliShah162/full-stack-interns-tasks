import React from 'react'
import '../globals.css'
import { useState,useEffect } from 'react'
export const metaData={
    title:"Ali",
    description:"This is ali's website"
}
const Toggle = () => {
    const [theme, setTheme] = useState('light')

    const ThemeToggle=()=>{
        const Newtheme= theme ==='light'? 'dark':'light'
        setTheme(Newtheme)
    }

    useEffect(() => {
      if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }
    }, [theme])//everytime the theme changes
    

    useEffect(() => {
      const saved=localStorage.getItem('theme')
      if(saved){
        setTheme(saved)
      }
    }, [])
    

  return (
    <div>
        <button onClick={ThemeToggle}>
             {theme === 'light' ? 'Dark' : 'Light'}
        </button>
    </div>
  )
}

export default Toggle