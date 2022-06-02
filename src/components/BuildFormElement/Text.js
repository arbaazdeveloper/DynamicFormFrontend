import React, { useState } from 'react'
import {Input} from 'antd'
const Text = (props) => {
    const [data,setData]=useState()
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

export default Text