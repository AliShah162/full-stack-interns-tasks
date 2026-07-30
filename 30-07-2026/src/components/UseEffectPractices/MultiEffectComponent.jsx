import {useState, useEffect} from 'react'

const MultiEffectComponent = () => {
    const [count, setcount] = useState(0)
    const [seconds, setseconds] = useState(0)


    useEffect(() => {
      console.log("Count is increamented be: ",count );
    }, [count])
    

    useEffect(() => {
       const timer= setInterval(() => {
        console.log("Timer started");
        
        setseconds(seconds=> seconds+1)
       }, 1000);
    
      return () => {
        console.log("Timer stopped");
        
        clearInterval(timer)
      }
    }, []) //means it will run only first render
    


  return (
    <div>
    <h1>Count: {count}</h1>
    <button className='bg-blue-600 border border-teal-400 rounded-md text-white' onClick={()=>setcount(count+1)}>Increament</button>
    <h1>Seconds: {seconds}</h1>

    </div>
  )
}

export default MultiEffectComponent