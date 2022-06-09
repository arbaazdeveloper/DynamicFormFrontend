import React, { useState ,useEffect} from 'react'
import { Checkbox,Input } from 'antd';
import { useDispatch } from 'react-redux'
import { addEditData } from '../../../features-redux/EditFormRedux'
import { editField } from '../../../features-redux/Editform'


const EditChekbox = (props) => {
  const CheckboxGroup = Checkbox.Group;
  const [checks,setChecks]=useState([])
  const [title,setTitle]=useState(props.data)
  const[option,setOption]=useState([])
  const [data,setData]=useState(props.data)
  const [selectBox,setSelectBox]=useState('checkbox')
   const [optionText,setOptionText]=useState()
  const dispatch=useDispatch()
  const onChange = (checkedValues) => {
     setChecks([...checks,checkedValues])
    };

    const setUpdateValue=()=>{
      console.log('the value of select '+selectBox)
      if(selectBox==='text'){
        const postData={
          id:1,
          type:'text',
          title:title
      }
      if(postData!==null){
      
     
      }
      }
      if(selectBox==='checkbox'){
        const postData={
          id:props.itemId,
          type:'checkbox',
          title:title,
          options:option
        }
        if(postData!==null){
          dispatch(editField({index:props.itemId,type:'checkbox',title:title}))
        
        }
     
      }

    }
  useEffect(()=>{
    if(props.val === 1){
      setUpdateValue()
      
    }
  },[props.val])
  return (
    <div>
      <Input value={title} onChange={(e)=>setTitle(e.target.value)}></Input>
         <CheckboxGroup 
         onChange={onChange}
         options={props.options}>
         </CheckboxGroup>;
         
    </div>
  )
}

export default EditChekbox