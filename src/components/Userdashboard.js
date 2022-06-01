import { Button } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CreateForm from './userfeatures/CreateForm'
import EditForm from './userfeatures/EditForm'
import Responses from './userfeatures/Responses'
import Visulization from './userfeatures/Visulization'

const Userdashboard = () => {
  const [user,setuser]=useState()
  const[currentComp,setCurrentComp]=useState(<CreateForm/>)

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
         <h1>welcome {user}</h1>
        <div className='dashboard-items'>
          <div className='grid-1'>
            <div>
              <Button onClick={()=>setComponent(1)}>Create Form</Button>
              <Button onClick={()=>setComponent(4)}>Edit Form</Button>
              <Button onClick={()=>setComponent(2)}>See Responses</Button>
              <Button onClick={()=>setComponent(3)}>Visulization</Button>
            </div>
          </div>
          
          <div className='grid-2'>
               {currentComp}
          </div>
          <div className='grid-3'>

          </div>

        </div>
    </div>
  )
}

export default Userdashboard