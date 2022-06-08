import React, { useEffect, useState } from 'react'
import TextInput from './form elements/TextInput'
import { Button, Row,Col, Input,Select, message } from 'antd'
import { postRequest } from '../Request'
import Chekbox from './form elements/Chekbox'
import FormUrl from '../FormUrl'
import Window from '../Window'

const CreateForm = () => {
  const [select,setSelect]=useState([])
  const [formTitle,setFormTitle]=useState()
  const [uId,setUid]=useState('')
  const [disable,setDisable]=useState(true)
  const [response,setResponse]=useState([])
  const[found,setFound]=useState({
    found:'',
    message:''
  })
const getData=(data)=>{
    setSelect([...select,data])
}
const postData= async()=>{
   const data={
     formTitle:formTitle,
     fields:select
   }
const res= await postRequest(data,'createform')
if(res.message==="Form Title is already used"){
  setFound({
      found:'error',
      message:'Title already exists'
  })
  return;
}

setResponse(res)
setDisable(false)
}
useEffect(()=>{
setUid(response._id)
},[response])

  return (
    <div>
      <h2>Create Your own Custom form</h2>
      <p>{found.message}</p>
      <Input
      status={found.found}
      placeholder='Form-title'
      value={formTitle}
      onChange={(e)=>setFormTitle(e.target.value)}
      style={{
        margin:5,
        width:300
      }}
      ></Input>
        <div className='form-builder'>
          <Window getData={getData} />

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