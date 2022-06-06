import { Input } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addEditData } from '../../../features-redux/EditFormRedux'

import Chekbox from './Chekbox'

const EditTextInput = (props) => {
    const [data,setData]=useState(props.data)
    const dispatch=useDispatch()

    const setUpdateValue=()=>{
      const postData={type:'text',title:data
    }
      dispatch(addEditData(postData))
    }
    useEffect(()=>{
      if(props.val !== 0){
        setUpdateValue()
        console.log('the if body')
      }
    },[props.val])
  return (
    <div>
         <Input placeholder={props.placeholder}
        value={data}
         onChange={(e)=>setData(e.target.value)
        }
        />
    </div>
  )
}

export default EditTextInput