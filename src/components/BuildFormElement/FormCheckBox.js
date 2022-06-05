import React, { useState ,useEffect} from 'react'
import { Checkbox } from 'antd';
import { useDispatch } from 'react-redux'
import { addData } from '../../features-redux/BuildFormData'
const FormCheckBox = (props) => {
    const CheckboxGroup = Checkbox.Group;
    const [checks,setChecks]=useState([])
    const dispatch=useDispatch()

    const onChange = (checkedValues) => {
       setChecks([...checks,checkedValues])
      };
      useEffect(()=>{
        const postData={key:props.title,value:checks}
        if(checks.length !==0){
          dispatch(addData(postData))
        }
     
         
      },[props.val])
  return (
    <div>
  

          <CheckboxGroup 
       onChange={onChange}
       options={props.options}>
         
         </CheckboxGroup>;
  
    </div>
  )
}

export default FormCheckBox