import React from 'react'

const useToggle = (dafaultval) => {
    const [value, setValue] = useState(dafaultval)
function toggleValue(){
    if(typeof val !='boolean'){
        setValue(!value)
    }
    else{
        setValue(val)
    }
}

return[val,toggleValue]


  return (
    <div>useToggle</div>
  )
}

export default useToggle