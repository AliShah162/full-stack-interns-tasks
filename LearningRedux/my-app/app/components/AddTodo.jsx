"use client"
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'

const AddTodo = () => {
    const [input, setInput] = useState('')
    const dispatch = useDispatch() //dispatch is declared here
    
    const addTodoHandler = (e) => {
        e.preventDefault()
        if (input.trim()) {
            dispatch(addTodo(input)) //and used here
            setInput('')
        }
    }
    
    return (
        <div className="w-full  text-center max-w-md text-white"> 
        <h1 className='text-xl mb-7 text-blue-500'>Add Todos</h1>
            <form onSubmit={addTodoHandler} className="flex gap-2">
                <input 
                    placeholder='Enter a Todo' 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                >
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddTodo