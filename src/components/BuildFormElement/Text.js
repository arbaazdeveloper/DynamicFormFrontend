import React, { useEffect, useState } from 'react'
import {Input} from 'antd'
import { useDispatch } from 'react-redux'
import { addData } from '../../features-redux/BuildFormData'
import { useSelector } from 'react-redux'
const Text = (props) => {
    const [data,setData]=useState('')
    const postFormData=useSelector((state)=>state.formBuild.value)   
     const dispatch=useDispatch()
 
     useEffect(()=>{
      const postData={key:props.title,value:data}
      if(data !==''){
        dispatch(addData(postData))
      } 
    
    },[props.val])
  return (
    <div>
        <Input placeholder={props.placeholder}
        value={data}
        style={{
          border:'none',
          borderBottom:'1px solid #413df7',
          marginBottom:10,
          marginLeft:2,
          marginRight:2,

        }}
        onChange={(e)=>setData(e.target.value)
        }
        />
    </div>
  )
}

export default Text