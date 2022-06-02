import React from 'react'
import { useParams } from 'react-router-dom'

const FormUrl = () => {
    const {id}=useParams()
  return (
    <div className='form-url'>
        <div>
            <a href={`http://localhost:3000/fillform/${id}`}>{`http://localhost:3000/fillform/${id}`}</a>
        </div>
        
    </div>
  )
}

export default FormUrl