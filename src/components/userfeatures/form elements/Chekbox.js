import React from 'react'

import { Checkbox } from 'antd';
const Chekbox = (props) => {
    const CheckboxGroup = Checkbox.Group;
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
      };
  return (
    <div>
         <h3>{props.title}</h3>
        <CheckboxGroup 
        style={{color:'#fff'}}
        onChange={onChange}
        options={props.options}></CheckboxGroup>;
    </div>
  )
}

export default Chekbox