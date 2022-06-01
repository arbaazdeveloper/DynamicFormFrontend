import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Input,Form,Button } from 'antd';

const Login = () => {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()

    const [creStatus,setCredStatus]=useState('')
    const [found,setFound]=useState({
        found:'',
        message:''
    })
const navigate=useNavigate()
    const loginUser= async (e)=>{
        e.preventDefault()
        const data={
            email:email,
            password:password
        }
        const postData= await fetch('http://localhost:5000/login',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        const logindata=await postData.json()
        if(logindata.message==='Login with correct credentials'){
            alert('Login with correct credentials')
            setCredStatus('error')
            return
        }
        if(logindata.message==='Email not Found'){
           
            setFound({
                found:'error',
                message:'Email Not Found'
            })
            return
        }
        localStorage.setItem('token',logindata.token)
        navigate('/userdashboard')
    }
  return (
    <div className='login-container'>
       
        <div className='login-form'>
        <Form>
        <h1>Login</h1>
             <p>{found.message}</p>
            <Input status={found.found} placeholder='Username' type='text' value={email} onChange={(e)=>setEmail(e.target.value)}/><br></br>
            <Input status={creStatus} placeholder='Password' type='text' value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
            <Button type='primary' onClick={loginUser}>Sign in</Button>
        </Form>
        </div>
    </div>
  )
}

export default Login