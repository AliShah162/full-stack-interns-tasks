import { useState } from 'react'

const CounterApp = () => {
    const [count, setCount] = useState(0)

    function handleDecrease() {
        setCount(count - 1)
    }
    
    function handleIncrease() {
        setCount(count + 1)
    }
    
    function handleReset() {
        setCount(0) 
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Counter App
                </h1>
                
                <div className="text-6xl font-bold text-center text-blue-600 mb-8">
                    {count}
                </div>
                
                <div className="flex gap-4 justify-center">
                    <button 
                        onClick={handleDecrease}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 text-xl"
                    >
                        -
                    </button>
                    
                    <button 
                        onClick={handleReset}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 text-xl"
                    >
                        Reset
                    </button>
                    
                    <button 
                        onClick={handleIncrease}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 text-xl"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CounterApp