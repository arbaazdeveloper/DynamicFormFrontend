import { Modal } from 'antd'
import React, { useEffect,useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';

const Updated = () => {
  const navigate=useNavigate()
  const updated=()=>{
      navigate('/userdashboard')
  }

  return (
    <div>
       
        <p>Form Updated</p>
       <a href='/userdashboard'>tell</a>
    </div>
  )
}

export default Updated