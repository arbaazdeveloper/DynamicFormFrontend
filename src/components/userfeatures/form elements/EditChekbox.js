import React, { useState ,useEffect} from 'react'
import { Checkbox,Input } from 'antd';
import { useDispatch } from 'react-redux'
import { addEditData } from '../../../features-redux/EditFormRedux';


const EditChekbox = (props) => {
  const CheckboxGroup = Checkbox.Group;
  const [checks,setChecks]=useState([])
  const [title,setTitle]=useState(props.title)
  const dispatch=useDispatch()

  const onChange = (checkedValues) => {
     setChecks([...checks,checkedValues])
    };

  const setUpdateValue=()=>{
    const postData={type:'text',

    title:props.title}
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
      <Input value={title}></Input>
         <CheckboxGroup 
         onChange={onChange}
         options={props.options}>
         </CheckboxGroup>;
    </div>
  )
}

export default EditChekbox