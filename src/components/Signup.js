import axios from 'axios'
import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Input,Form,Button,Col,Row } from 'antd';
const Signup = () => {
    const[name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [result,setResult]=useState([])
    const createUser=async (e)=>{
        e.preventDefault()
        if(email===''||password==='' || name===''){
                 alert('Fields cannot be empty')
                 return
        }
       const data={
           name:name,
           email:email,
           password:password
       }
       const postData= await fetch('http://localhost:5000/signup',{
           method:'POST',
           headers:{
               'content-type':'application/json'
           },
           body:JSON.stringify(data)
       })
   setResult(await postData.json())
    }

  return (
    <div className='login-container'>
        <div className='login-form'>
        <h1>Signup</h1>
        <Row>
            <Col xs={24} xl={12}>
        <Form>
            <Input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name'/>
            <Input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
            <Input type='text' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password'/><br/>
            <Button onClick={createUser}>Signup</Button>
        </Form>
            </Col>
            <Col xs={24} xl={12}>
            <img style={{height:700}} src="https://i.ibb.co/dpLG5GJ/6333050.jpg" alt="6333050" border="0"></img>
            </Col>
        </Row>
        </div>
    </div>
  )
}

export default Signup