import {useState} from 'react'

const ControlledComponents = () => {
    const [inpuVal, setinputVal] = useState('') //state to keep track of the input valuee
    const handleChange=(event)=>{
        setinputVal(event.target.value)  //this way track the input value
    }
  return (
    <div className='items-center flex flex-col justify-center'>
        <h1>Type Below</h1>
        <input className='bg-white border mt-3 border-black rounded-md' type="text" 
        onChange={handleChange}
        value={inpuVal}/>
        <h1>You typed: {inpuVal}</h1>
    </div>
  )
}

export default ControlledComponents