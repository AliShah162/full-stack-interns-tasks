import React from 'react'

const Shop = () => {
  return (
    <div className='items-center text-center'> 
        <h1 className='text-xl'>Withdraw/Deposit</h1>

        <div className='flex'>
        <button className='bg-blue-700 rounded-xl m-2 p-3 cursor-pointer hover:bg-blue-400'>-</button>
        <h1>Update Balance</h1>
        <button className='bg-blue-700 rounded-xl m-2 p-3 cursor-pointer hover:bg-blue-400'>+</button>

        </div>



    </div>

  )
}

export default Shop