import { Input,Select,Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addEditData } from '../../../features-redux/EditFormRedux'
import Chekbox from './Chekbox'
const { Option, OptGroup } = Select;

const EditTextInput = (props) => {
    const [data,setData]=useState(props.data)
    const [selectBox,setSelectBox]=useState('text')
    const dispatch=useDispatch()
    const [optionText,setOptionText]=useState()
    const[option,setOption]=useState([])

    const handleChange=(value)=>{
      setSelectBox(value)
      console.log(selectBox)
    }

    const setUpdateValue=()=>{
      console.log('the value of select'+selectBox)
      if(selectBox==='text'){
        const postData={
          id:props.itemId,
          type:'text',
          title:data
      }
      dispatch(addEditData(postData))
      console.log('textbody')
      }
      if(selectBox==='checkbox'){
        const postData={
          id:props.itemId,
          type:'checkbox',
          title:data,
          options:option
        }
        dispatch(addEditData(postData))
        console.log('check body')
      }

    }
    const addOption=()=>{
      setOption([...option,optionText])
      setOptionText('')
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
         <Select
       defaultValue='text'
       onChange={handleChange}
       style={{
       width: 200,
       margin:10
       }}
  >
    <OptGroup label="select">
      <Option value="text">Text</Option>
      <Option value="checkbox">Chekbox</Option>
    </OptGroup>
  </Select>

        {selectBox==='checkbox'?<><Input
      style={{width:150,
      margin:5
      }}
      placeholder='Options'
      value={optionText}
      onChange={(e)=>setOptionText(e.target.value)}
      >
      </Input><Button onClick={addOption}>Add Options</Button>
      <br></br>

      <Chekbox options={option} title={props.title}/>
      </>:''}
    </div>
  )
}

export default EditTextInput