import { useState } from "react"
const Counter = () => {
    const [count, setCount] = useState(0) //count is the state variable and setCout is the fucntion and useState(0) 0is the starting value
    function handleClick(){
        setCount(count+1)//setCount will increament the count variable everytime we click
    }
  return (
    <div className='items-center'>
        <p>You clicked {count} times</p>
        <button onClick={handleClick}>Click Me</button>

    </div>
  )
}

export default Counter  