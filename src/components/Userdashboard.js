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
  useEffect(()=>{
    getUser()
  },[])


  return (
    <div className='dashboard'>
         <h1 className='feature-title'>Welcome {user}</h1>
         {currentComp===''?
         <div>
         <Row>
        <Col span={6}></Col>
      <Col span={6}>
        <div className='feature-1'onClick={()=>setComponent(1)}>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbPXRf0IjgZ7MWOQyYt4ziifdqpkjt4PDZag&usqp=CAU'/>
        </div>
        <h2 className='feature-title'>Create Form</h2>
      </Col>
      <Col span={6} >
          <div className='feature-1' onClick={()=>setComponent(4)}>
          <img src='https://img.icons8.com/bubbles/344/edit.png'/>
        </div>
        <h2 className='feature-title'>Edit Form</h2>
      </Col>

      <Col span={6}></Col>
    </Row>

    <Row>
        <Col span={6}></Col>
        
      <Col span={6}>
      <div className='feature-1' onClick={()=>setComponent(2)}>
          <img src='https://www.shareicon.net/data/2015/09/02/94952_table_512x512.png'/>
        </div>
        <h2 className='feature-title'>View Responses</h2>
      </Col>
      <Col span={6}>

          
          <div className='feature-1' onClick={()=>setComponent(3)}>
          <img src='https://img.freepik.com/free-vector/set-elements-chart-infographics-graphs-diagrams-chart-color_90220-326.jpg?w=2000'/>
        </div>
        <h2 className='feature-title'>Analyze</h2>

      </Col>

      <Col span={6}></Col>
    </Row>
      </div>:
      currentComp
}
{currentComp===''?<></>:<Button onClick={()=>{setComponent(5)}}>Goback</Button>}
    </div>
  )
}

export default Userdashboard