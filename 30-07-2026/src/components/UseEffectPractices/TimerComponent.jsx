import {useState,useEffect} from 'react'

const TimerComponent = () => {
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
     const intervalId=setInterval(() => {
         console.log("Timer executed");
        setSeconds(seconds+1)
        
     }, 1000);
    
      return () => {
          console.log("Timer stopped");
        clearInterval(intervalId)
        
      }
    }, [])
    

  return (
    <div>
        <h1>Seconds: {seconds}</h1>
    </div>
  )
}

export default TimerComponent