import Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Responselist = () => {
    const [data,setData]=useState([])
    const navigate=useNavigate()
    const getForms=async ()=>{
        const res= await Axios.get('http://localhost:5000/getallform',{
            headers:{token:localStorage.getItem('token')}
        })
        setData(res.data)
    }
  
    useEffect(()=>{
        getForms()
    },[])
  return (
    <div>
         <div>
             <h1>Your forms</h1>
             {data.map((item)=>{
                 return <div key={item._id} className='response-list'>
                      <h2>{item.formTitle}</h2>
                      <div className='btn-groups'>
                      <Link className='response-btn' to={`/response/${item._id}`}>View Response</Link>
                      </div>
                     </div>
             })}
         </div>
    </div>
  )
}

export default Responselist