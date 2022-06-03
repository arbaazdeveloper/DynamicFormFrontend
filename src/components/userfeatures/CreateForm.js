import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TextInput from './form elements/TextInput'
import { addData } from '../../features-redux/BuildFormData'
import { useDispatch } from 'react-redux'
import { Button, Row,Col, Input,Select } from 'antd'
import Chekbox from './form elements/Chekbox'
import { useNavigate } from 'react-router-dom'
import FormUrl from '../FormUrl'
const { Option, OptGroup } = Select;
const CreateForm = () => {
  const [url,setUrl]=useState('')
  const [myPost,setMyPost]=useState(false)
  const [select,setSelect]=useState([])
  const [title,setTitle]=useState()
  const [window,setWindow]=useState(false)
  const [selectBox,setSelectBox]=useState()
  const [optionText,setOptionText]=useState()
  const[option,setOption]=useState([])
  const navigate=useNavigate()
  const [textData,setTextData]=useState()
  const [formTitle,setFormTitle]=useState()
  const [id,setId]=useState(0)
  const dispatch=useDispatch()
  const [uId,setUid]=useState('the')
  const [disable,setDisable]=useState(true)
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
    setId(id+1);
    if(selectBox==='text'){
    const field={
      id:id,
      type:'text',
      title:title
    }
    setSelect([...select,field])
    
  }
  if(selectBox==='checkbox'){
    const field={
      id:id,
      type:'checkbox',
      title:title,
      options:option
    
    }
    
    setSelect([...select,field])
  }


  }

const postData= async()=>{
   const data={
     formTitle:formTitle,
     fields:select
   }
 const token=localStorage.getItem('token')
 const res= await fetch('http://localhost:5000/createform',{
   method:'POST',
   headers:{'content-type':'application/json',
     token:token},
     body:JSON.stringify(data)
 })

const response=await res.json()
// navigate(`/Formurl/${response._id}`)
console.log(response)
setUid(response._id)

setDisable(false)
}



  return (
    <div>
      {url}
      <h2>Create Your own Custom form</h2>
      <Input placeholder='Form-title'
      value={formTitle}
      onChange={(e)=>setFormTitle(e.target.value)}
      style={{
        margin:5,
        width:300
      }}
      ></Input>
        <div className='form-builder'>
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

{window?
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
      <Chekbox options={option} title={title}/>
      </>:''}

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
       </div>:''
}
          <Row>
          <Col span={8}></Col>
          <Col span={8}>

         <div className='form-structure'>

          {select.map((item)=>{
            if(item.type==='text'){
            return <>
            <div className='form-struct'>
              <h1>{item.title}</h1>
           <TextInput placeholder={item.title}/>
            </div>
            </>
            }
            if(item.type==='checkbox'){
              return <>
              <div className='form-struct'>
            <Chekbox options={item.options} title={item.title}/>
              </div>
              </>
              }
          })}
           </div>
          </Col>
           <Col span={8}></Col>
           </Row>
          <br></br>
        </div>
     <div>
         <Button onClick={postData} style={{margin:'5px'}}>Generate Form</Button>
         <FormUrl id={uId} disabled={disable} />
     </div>
    </div>
  )
}

export default CreateForm