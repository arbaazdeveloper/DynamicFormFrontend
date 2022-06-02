import { Input } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addData } from '../../../features-redux/BuildFormData'
import Chekbox from './Chekbox'
const TextInput = (props) => {
    const [data,setData]=useState()
    const dispatch=useDispatch()
    const formref=useRef()
   
  return (
    <div>
        <h3>{props.title}</h3>
        <Input placeholder={props.placeholder}

        value={data}
        onChange={(e)=>setData(e.target.value)
        
        }
        />

    </div>
  )
}

export default TextInput