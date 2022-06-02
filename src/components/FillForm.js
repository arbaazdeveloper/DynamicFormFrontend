import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Text from './BuildFormElement/Text'
import { memo } from 'react'
const FillForm = () => {
 
    const {id}=useParams()
    const [form,setForm]=useState([])
    const [text,setText]=useState()
    const getFormData=async()=>{
        const res= await Axios.get(`http://localhost:5000/getform/${id}`)
        setForm(res.data[0])
      
       
    }
    const test=()=>{
      
     
    }
    useEffect(()=>{
        getFormData()
        test()
      },[])
 
  return (
    <div className='dashboard'>
        <div>
            <div>
    dfsncdsf
            </div>
        </div>
     
    </div>
  )
}

export default memo(FillForm)