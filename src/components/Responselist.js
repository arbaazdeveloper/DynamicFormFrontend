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
             {data.map((item)=>{
                 return <div className='response-list'>
                      <h2>{item.formTitle}</h2>
                      
                      <div className='btn-groups'>
                      <button className='response-btn'><Link  to={`/response/${item._id}`}>View Response</Link></button>
                      </div>
                     </div>
             })}
         </div>
    </div>
  )
}

export default Responselist