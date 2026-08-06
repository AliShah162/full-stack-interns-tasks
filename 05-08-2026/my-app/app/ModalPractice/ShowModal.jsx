"use client"

const MyModal = ({ closeModal }) => {
    return (
        //  Overlay - covers entire screen
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal} // Click outside to close
        >
            {/*  Modal Container */}
            <div 
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/*  Header */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Stay Tuned
                    </h1>
                    <button 
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                {/*  Body */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    Necessitatibus quasi odit sint reiciendis impedit asperiores 
                    dolore nam, ratione dolorum debitis quam?
                </p>

                {/*  Footer with Action Button */}
                <button 
                    onClick={closeModal}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                >
                    Accept
                </button>
            </div>
        </div>
    )
}

export default MyModal