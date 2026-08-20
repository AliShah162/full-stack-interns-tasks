"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from '../features/todo/todoSlice'

const Todos = () => {
    const todos = useSelector(state => state.todo.todos)
    const dispatch = useDispatch()

    return (
        <div className="w-full max-w-md mt-4">
            {todos.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No todos yet. Add one above!</p>
            ) : (
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li 
                            key={todo.id}  
                            className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <span className="text-gray-800">{todo.text}</span>
                            <button 
                                onClick={() => dispatch(removeTodo(todo.id))}
                                className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Todos