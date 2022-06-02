import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TextInput from './form elements/TextInput'
import { addData } from '../../features-redux/BuildFormData'
import { useDispatch } from 'react-redux'
import { Button, Row,Col } from 'antd'
import Chekbox from './form elements/Chekbox'
import { useNavigate } from 'react-router-dom'

const CreateForm = () => {
  const [url,setUrl]=useState('')
  const [myPost,setMyPost]=useState(false)
  const formData=useSelector((state)=>state.formBuild.value)
  const [select,setSelect]=useState([])
  const [optionText,setOptionText]=useState()
  const[option,setOption]=useState([])
  const[inputTextField,setInputTextField]=useState(false)
  const[checkBoxwindow,setcheckBoxwindow]=useState(false)
  const navigate=useNavigate()
  const [textData,setTextData]=useState()
  const dispatch=useDispatch()
  const passData=()=>{
    setInputTextField(true)
  }
  const setcheckBoxwindowBool=()=>{
    setcheckBoxwindow(true)
  }
  const addText=()=>{
    const elem={
      type:'text',
      field:textData
    }
   setSelect([...select,elem])
   setInputTextField(false)
  }
  const addOption=()=>{
    setOption([...option,optionText])
    console.log(option)
    
    }
  const addCheckBox=()=>{
    const elem={
      type:'checkbox',
      field:textData,
      options:option
    }
   setSelect([...select,elem])
   setcheckBoxwindow(false)
   setOption([])
  }

const postData= async()=>{

  const input=select.map((item)=>{
    if(item.type==='text'){
      return{
          title:item.field
      }
    }
  })
  console.log(input)
  const checkbox=select.map((item)=>{
    if(item.type==='checkbox'){
      return{
          title:item.field,
          options:item.options
      }
    }
  })
   const postForm={
     input:input,
     chekbox:checkbox
   }
 const token=localStorage.getItem('token')
 const res= await fetch('http://localhost:5000/createform',{
   method:'POST',
   headers:{'content-type':'application/json',
     token:token},
     body:JSON.stringify(postForm)
 })

const response=await res.json()
 navigate(`/Formurl/${response._id}`)
}



  return (
    <div>
      {url}
      <h2>Create Your own Custom form</h2>
        <div className='form-builder'>
          
          <Button style={{margin:'5px'}} onClick={passData}>Text Input +</Button>
          <Button style={{margin:'5px'}} onClick={setcheckBoxwindowBool}>Checkbox +</Button><br></br>


          {!inputTextField?<></>:<><input type='text' placeholder='Title for input' value={textData} onChange={(e)=>setTextData(e.target.value)}/>
          <Button style={{margin:'5px'}} onClick={addText}>Add field</Button>
          </>}

          {!checkBoxwindow?<></>:<><input type='text' placeholder='Title for Checkbox' value={textData} onChange={(e)=>setTextData(e.target.value)}/>
          <br></br>
          <input type='text' value={optionText} onChange={(e)=>setOptionText(e.target.value)} placeholder='Option' />
          <Button style={{margin:'5px'}} onClick={addOption}>Add options</Button><br></br>
          <Button style={{margin:'5px'}} onClick={addCheckBox}>Add field</Button>
          </>}

          <Row>
          <Col span={8}></Col>
          <Col span={8}>
         <div className='form-structure'>
           <h1>Your Form Structure</h1>
          {select.map((item)=>{
            if(item.type==='text'){
            return <>
           <TextInput placeholder={item.field}/>
            </>
            }
            if(item.type==='checkbox'){
              return <>
            <Chekbox options={item.options} title={item.field}/>
              </>
              }
          })}
           </div>
          </Col>
           <Col span={8}></Col>
           </Row>
          <br></br>
        </div>
        {/*<Chekbox options={['adr','agr']}/>*/}
         <Button onClick={postData} style={{margin:'5px'}}>Generate Form</Button>
    </div>
  )
}

export default CreateForm