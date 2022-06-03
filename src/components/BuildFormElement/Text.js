import React, { useState } from 'react'
import {Input} from 'antd'
const Text = (props) => {
    const [data,setData]=useState()
  return (
    <div>
        <h3>{props.title}</h3>
        <Input placeholder={props.placeholder}
        value={data}
        style={{
          border:'none',
          borderBottom:'1 solid #000'
        }}
        onChange={(e)=>setData(e.target.value)
        }
        />
    </div>
  )
}

export default Text