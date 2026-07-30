// import React from 'react'
// Lifting state up = moving state from a child component to a parent component so multiple children can share it.
const LiftingState = (props) => {
  return (
    <div>
        <input type="text"  onChange={(e)=>props.setName(e.target.value)}/>
        <br />
        <p>you are writing: {props.name}</p>
    </div>
  )
}

export default LiftingState