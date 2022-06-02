import React from 'react'

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