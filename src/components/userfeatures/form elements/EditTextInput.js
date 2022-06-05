import { Input } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addData } from '../../../features-redux/BuildFormData'
import Chekbox from './Chekbox'

const EditTextInput = (props) => {
    const [data,setData]=useState(props.data)
    
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