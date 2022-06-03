import { Button,Row,Col } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CreateForm from './userfeatures/CreateForm'
import EditForm from './userfeatures/EditForm'
import Responses from './userfeatures/Responses'
import Visulization from './userfeatures/Visulization'

const Userdashboard = () => {
  const [user,setuser]=useState()
  const[currentComp,setCurrentComp]=useState('')
  const [form,setForm]=useState([])
  const setComponent=(comId)=>{
       if(comId===1){
        setCurrentComp(<CreateForm/>)
       }
       if(comId===2){
        setCurrentComp(<Responses/>)
       }
       if(comId===3){
        setCurrentComp(<Visulization/>)
       }
       if(comId===4){
        setCurrentComp(<EditForm/>)
       }
       if(comId===5){
        setCurrentComp('')
       }
  }
  const getUser= async()=>{
    const data= await axios.get('http://localhost:5000/getuser',{
      headers:{
        token:localStorage.getItem('token')
      }
    })
    setuser(data.data[0].name)
  
  }
  const getallForms=async ()=>{
    const data=await axios.get('http://localhost:5000/getallform',{
      headers:{
        token:localStorage.getItem('token')
      }
    })
    setForm(data.data)
    console.log(form)
  }
  useEffect(()=>{
    getUser()
    getallForms()
  },[])


  return (
    <div className='dashboard'>
         <h1 className='feature-title'>Welcome {user}</h1>
         {currentComp===''?
         <div>
         <Row>
           {form.map((item)=>{
             return <Row> <Col span={6}  >
             <div className='feature-1'onClick={()=>setComponent(1)}>
               <img src='https://img.freepik.com/free-vector/competent-resume-writing-professional-cv-constructor-online-job-application-profile-creation-african-american-woman-filling-up-digital-form-concept-illustration_335657-2053.jpg?w=2000'/>
             <h3 className='form-title-icon'>{item.formTitle}</h3>
             </div>
             </Col></Row>
           })}

        <Col span={6}>
        <div className='feature-1'onClick={()=>setComponent(1)}>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbPXRf0IjgZ7MWOQyYt4ziifdqpkjt4PDZag&usqp=CAU'/>
        <h2>Create Form</h2>
        </div>
        </Col>
      </Row>
      </div>:
      currentComp
}
{currentComp===''?<></>:<Button onClick={()=>{setComponent(5)}}>Goback</Button>}
    </div>
  )
}

export default Userdashboard