import {useState} from 'react'

const LoggerComponent = () => {
    const [count, setCount] = useState(0)
    function handleClick(){
        setCount(count+1)
    }
  return (
    <div>
        <h1>I am clicked {count} times</h1>
        <button onClick={handleClick}>Click Me</button>
    </div>
  )
}

export default LoggerComponent