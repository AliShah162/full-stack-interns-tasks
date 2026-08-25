'use client'

import { useSelector, useDispatch } from 'react-redux'
import { increament, decreament, reset } from '../store/features/counterSlice'

export default function Counter() {
  const count = useSelector((state) => state.counter?.value ?? 0)  //  Fallback to 0
  const dispatch = useDispatch()

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6"> Counter App</h1>
      
      <div className="text-7xl font-bold text-blue-600 mb-8">
        {count !== undefined && !isNaN(count) ? count : 0}  {/*  Safety check */}
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={() => dispatch(decreament())}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xl font-bold"
        >
          −
        </button>
        
        <button
          onClick={() => dispatch(reset())}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-xl font-bold"
        >
          Reset
        </button>
        
        <button
          onClick={() => dispatch(increament())}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xl font-bold"
        >
          +
        </button>
      </div>
    </div>
  )
}