import axios from 'axios'
import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Input,Form,Button } from 'antd';
const Signup = () => {
    const[name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()

    const [result,setResult]=useState([])

    const createUser=async (e)=>{
        e.preventDefault()
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
        <Form>
            <Input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name'/>
            <Input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
            <Input type='text' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password'/><br/>
            <Button onClick={createUser}>Signup</Button>
        </Form>
        </div>
    </div>
  )
}

export default Signup