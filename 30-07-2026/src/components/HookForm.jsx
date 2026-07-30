import React from 'react'
import { useForm} from "react-hook-form"

const HookForm = () => {
const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
    
  function onSubmit(data){
    console.log("your data is: ",data);
    
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Firstname</label>
        <input {...register("firstName",{ required: true, maxLength: 20,minLength:3 })}/>
      </div>
      <div>
        <label>Middlename</label>
        <input {...register("MiddleName",{ required: true, maxLength: 20,minLength:3 })}/>
      </div>
      <div>
        <label>Lastname</label>
        <input {...register("LastName",{ required: true, maxLength: 20,minLength:3 })}/>
      </div>
      <input type="submit" />
    </form>
  )
}

export default HookForm
