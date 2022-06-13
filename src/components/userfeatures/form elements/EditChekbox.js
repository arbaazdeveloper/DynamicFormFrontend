import React, { useState ,useEffect} from 'react'
import { Checkbox,Input ,Select} from 'antd';
import { useDispatch } from 'react-redux'
import { editField } from '../../../features-redux/Editform'
import { addEditData } from '../../../features-redux/EditFormRedux';

const { Option, OptGroup } = Select;
const EditChekbox = (props) => {
  const CheckboxGroup = Checkbox.Group;
  const [checks,setChecks]=useState([])
  const [title,setTitle]=useState(props.data)
  const[option,setOption]=useState([])
  const [data,setData]=useState(props.data)
  const [selectBox,setSelectBox]=useState('checkbox')
   const [optionText,setOptionText]=useState()

  const dispatch=useDispatch()
  const handleChange=(value)=>{
    setSelectBox(value)
  }
  const onChange = (checkedValues) => {
     setChecks([...checks,checkedValues])
    };

    const setUpdateValue=()=>{
      if(selectBox==='text'){
        const postData={
          id:props.itemId,
          type:'text',
          title:title
      }
      if(postData!==null){
   //     dispatch(editField({index:props.index,type:'text',title:title}))
   dispatch(addEditData(postData))
      }
      }
      if(selectBox==='checkbox'){
        const postData={
          id:props.itemId,
          type:'checkbox',
          title:title,
          options:props.options
        }
   //  dispatch(editField({index:props.index,type:'checkbox',title:title}))
   dispatch(addEditData(postData))
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
      {selectBox==='checkbox'?
         <CheckboxGroup 
         onChange={onChange}
         options={props.options}>
         </CheckboxGroup>
  :''  
  }
      

<Select
 defaultValue='checkbox'
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
         
    </div>
  )
}

export default EditChekbox