import {useState} from 'react'

const Clicker = () => {
    const [click, setClick] = useState(0)
    const handleClick = () => {
        setClick(click + 1)
    }
  return (
    <div onClick={handleClick}>
        <p>I was clicked {click} times.</p>
    </div>
  )
}

export default Clicker