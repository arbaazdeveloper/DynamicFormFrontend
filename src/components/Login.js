import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Input,Form,Button,Col,Row,Divider} from 'antd';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const [creStatus,setCredStatus]=useState('')
    const [found,setFound]=useState({
        found:'',
        message:''
    })
const navigate=useNavigate()
    const loginUser= async (e)=>{
        e.preventDefault()
        if(email==='' || password===''){
            setFound({
                found:'error',
                message:'Fields cannot be empty'
            })
            return
        }
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
       
        <div className=''>
      
        <h1>Login</h1>
        <Row>
            <Col xs={24} xl={12}>
                <div className='login-form'>
            <Form>
             <p>{found.message}</p>
            <Input status={found.found} placeholder='Username' type='text' required={true} value={email} onChange={(e)=>setEmail(e.target.value)}/><br></br>
            <Input status={creStatus} placeholder='Password' type='text' value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
            <div className='forgot'>
            <Link to='/'>Forgot Password</Link><br></br>
            </div>
            <Button onClick={loginUser}>Sign in</Button>

            <div>
                <Divider style={{width:70}}>Or</Divider>
                <Link to='/signup'>Don't have an account yet? signup here</Link>
            </div>
        </Form>
        </div>
            </Col>
            <Col xs={24} xl={12}>
            <img src='https://i.ibb.co/r5SrDHK/login-image.jpg'></img>

          
            </Col>
        </Row>
    
        </div>
    </div>
  )
}

export default Login