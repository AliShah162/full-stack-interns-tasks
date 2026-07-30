import {useEffect, useState} from 'react'

const UseEffect = () => {
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState(0)
    //we use useEffect to create side effects, below is how it works.
    // first -> side-effect function, means the main function
    // second -> clean-up function, means what will we do if a component unmounts.
    // third -> comma separated list, means when and how much times this will run like on every render or just once 
    // useEffect(() => {
    //   first
    
    //   return () => {
    //     second
    //   }
    // }, [third])
    
    // now lets learn variations of useEffect
    // variation 1
    //no dependency at all
    // useEffect(() => {
    //   alert('I will work on every render')
    // },) //no brackets at all means this will work on every render, everytime i click the button this will work.

    // Variation 2
    //empty dependency
    // useEffect(() => {
    //  alert('I will only run on 1st render')
    // }, []) //empty brackets mean it will only render once, the first time only.
    
    // Variation 3
    //Single Dependency
    useEffect(() => {
      alert(`'Button was clicked ${count} times'`)
    }, [count]) //count variable means evertyome the the variable updates, it will re-render(will work)
    

    // Variation 4
    //Multiple Dependencies
    // useEffect(() => {
    //   alert("I will everytime the count1 or count2 is clicked")
    // }, [count,count2])//this means everytime i click counter1 or counter2, it will re render
    

    // Variation 5
    // the cleanup function
    // useEffect(() => {
    //   alert('Count is clicked')
    
    //   return () => {
    //     alert('works everytime the comp is unmounted and mounted again') //this is the cleanup function, means if i remove this compenent from app.jsx, it will be stopped.
    //   }
    // }, [count])
    
function handleClick(){
    setCount(count+1)
}
function handleClick2(){
    setCount2(count2+1)
}
  return (
    <div>
        <h1>First Counter</h1>
        <button onClick={handleClick}>click Me</button>
        <p>i am clicked {count} times</p>
            <br />
            <h1>Second Counter</h1>
        <button onClick={handleClick2}>click Me</button>
        <p>i am clicked {count2} times</p>
    </div>

  )
}

export default UseEffect