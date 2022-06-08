import React, { useEffect, useState } from 'react'
import { Button, Row,Col, Input, Select ,Checkbox} from 'antd'

const { Option, OptGroup } = Select;
const Window = (props) => {
    const CheckboxGroup = Checkbox.Group;
    const [title,setTitle]=useState()
    const [mywindow,setWindow]=useState(false)
    const [selectBox,setSelectBox]=useState()
    const [optionText,setOptionText]=useState()
    const [select,setSelect]=useState([])
    const[option,setOption]=useState([])
    const [id,setId]=useState(parseInt(props.id))
    const handleChange=(value)=>{
        setSelectBox(value)
      }
      const setWindowOption=()=>{
        setWindow(true)
      }
      const addOption=()=>{
        setOption([...option,optionText])
        setOptionText('')
      }
      const addField=()=>{
        const fieldFound=select.some(item=>item.title===title)
        if(fieldFound){
            alert('two fields cannot be same')
            return;
        }
        setId(id+1);
        if(selectBox==='text'){
        const field={
          id:id,
          type:'text',
          title:title
        }
    setSelect([...select,field])
    props.getData(field)
      }
      if(selectBox==='checkbox'){
        const field={
          id:id,
          type:'checkbox',
          title:title,
          options:option
        
        }
        props.getData(field)

setSelect([...select,field])
      }
      }
  return (
    <div>
             <Button
          style={{
            border:'none',
            background:'#413df7',
            paddingLeft:50,
            paddingRight:50,
            fontWeight:600,
            color: '#fff',
            borderRadius:5,
            cursor:'pointer'
          }}
          onClick={setWindowOption}>Create +</Button>
{mywindow?
         <div className='add-field'>
           <h1>Add a field</h1>
           <Row>
             <Col span={8}></Col>
             <Col span={8}>
        
           <Input placeholder='Title'
           value={title}
           onChange={(e)=>setTitle(e.target.value)}
           style={{
             margin:5
           }}
           />

           <Select
      defaultValue="Select type"
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
  
             </Col>
             <Col span={8}></Col>
           </Row>
      {selectBox==='checkbox'?<>
      <Input
      style={{width:150,
      margin:5
      }}
      placeholder='Options'
      value={optionText}
      onChange={(e)=>setOptionText(e.target.value)}
      >
      </Input><Button onClick={addOption}>Add Options</Button>
      <br></br>
      <CheckboxGroup 
       options={option}>
         </CheckboxGroup>
      </>:<></>}

      <Button
             style={{
              border:'none',
              background:'#413df7',
              paddingLeft:50,
              paddingRight:50,
              fontWeight:600,
              color: '#fff',
              borderRadius:5,
              cursor:'pointer'
            }}
       onClick={addField}>Add Field</Button>
       </div>:<></>
}
    </div>
  )
}

export default Window