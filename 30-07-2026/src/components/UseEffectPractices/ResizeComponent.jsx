import {useState,useEffect} from 'react'

const ResizeComponent = () => {
const [windowWidth, setwindowWidth] = useState(window.innerWidth)

useEffect(() => {
  const handleResize=()=>setwindowWidth(window.innerWidth)

window.addEventListener('resize',handleResize)

  return () => {
    window.removeEventListener('resize',handleResize)
  }
}, [])

  return (
    <div>window Width: {windowWidth}</div>
  )
}

export default ResizeComponent