"use client"
import React, { useState } from 'react'
import MyModal from './ShowModal'

const Modal = () => {
    const [showModal, setShowModal] = useState(false)
    const closeModal = () => setShowModal(false)

    return (
        <div className=" flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div className="max-w-sm w-full"> 
        <button 
            onClick={() => setShowModal(true)}
            className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-lg transition-colors duration-200"
        >
             Open Modal
        </button>
    </div>
    
    {showModal && <MyModal closeModal={closeModal} />}
</div>
    )
}

export default Modal