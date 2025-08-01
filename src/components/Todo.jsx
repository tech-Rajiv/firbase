import React, { useState } from 'react'

function Todo() {
    const [input , setInput] = useState("")
  return (
    <div className='w-full'>
        <h2 className='text-xl text-center mb-2'>Todo</h2>
        <div className="inp flex gap-5 justify-center">
        <input type="text" placeholder='type a todo...' value={input} onChange={(e)=>setInput(e.target.value)} className='border p-2 w-full rounded-lg'/>
        <button className='bg-black text-white px-4 py-2 rounded-lg cursor-pointer'>Add </button>
        </div>
        <div className="lists mt-10">
        <h5 className='text-lg underline underline-offset-4'>Previous Todo Lists</h5>

        </div>
    </div>
  )
}

export default Todo