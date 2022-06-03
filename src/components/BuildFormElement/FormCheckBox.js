import React from 'react'
import { Checkbox } from 'antd';
const FormCheckBox = (props) => {
    const CheckboxGroup = Checkbox.Group;
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
      };
  return (
    <div>
          <CheckboxGroup 
       onChange={onChange}
       options={props.options}></CheckboxGroup>;
    </div>
  )
}

export default FormCheckBox