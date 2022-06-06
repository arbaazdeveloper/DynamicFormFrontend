import { Button,Row,Col,Modal} from 'antd'
import { Space } from 'antd';
import Icon, { DeleteOutlined ,EditOutlined,ShareAltOutlined} from '@ant-design/icons';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreateForm from './userfeatures/CreateForm'
import EditForm from './userfeatures/EditForm'
import Responses from './userfeatures/Responses'
import Visulization from './userfeatures/Visulization'
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';

const Userdashboard = () => {
  const [user,setuser]=useState()
  const[currentComp,setCurrentComp]=useState('')
  const [form,setForm]=useState([])
  const [isModalVisible,setIsModalVisible]=useState(false)
  const [url,setUrl]=useState()
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
    
  }
  const handleOk = () => {
    setIsModalVisible(false);
   
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const deleteForm=async(id)=>{
    const delData=await axios.delete(`http://localhost:5000/deleteform/${id}`)
    if(delData){
      alert('form deleted')
    }
  }
const share=(id)=>{
       setIsModalVisible(true)
       setUrl(`http://localhost:3000/fillform/${id}`)
}


  useEffect(()=>{
    getUser()
    getallForms()
  },[form])


  return (
    <div className='dashboard'>
         <h1 className='feature-title'>Welcome {user}</h1>

         <div className='feature-btn'>
          <Link to='/responselist'>
           <div className='change-btn'>
             <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/data-table-1492798-1264918.png"></img>
           </div>
           </Link>
           <div className='change-btn'>
             <Link to='/visualize'>
             <img src='https://assist-nps.com/wp-content/uploads/2017/06/pict-bar-chart-cloud-clipart-vector-stencils-library.png-diagram-flowchart-example.png'></img>
             </Link>
           </div>
         </div>
         {currentComp===''?
         <div className='form-rows'>
         <Row>
           {form.map((item)=>{
             return <Row> <Col span={6}  >
             <div className='feature-1'>
               <img src='https://img.freepik.com/free-vector/competent-resume-writing-professional-cv-constructor-online-job-application-profile-creation-african-american-woman-filling-up-digital-form-concept-illustration_335657-2053.jpg?w=2000'/>
             <h3 className='form-title-icon'>{item.formTitle}</h3>
             <div className='form-features'>
               <Link to={`/editform/${item._id}`}>
               <EditOutlined/>
               </Link>
             <DeleteOutlined onClick={()=>deleteForm(item._id)}/>
             <ShareAltOutlined onClick={()=>{share(item._id)}}>
             </ShareAltOutlined>
             </div>
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
<div style={{
  margin:5
}}>
{currentComp===''?<></>:<Button onClick={()=>{setComponent(5)}}>Goback</Button>}
</div>
<Modal title="Form"
       visible={isModalVisible}
        onOk={handleOk} 
        onCancel={handleCancel}>

        <Link to={url}>{url}</Link><br></br>
        <Button type="primary" onClick={() => {navigator.clipboard.writeText(url)}}>
       Copy
      </Button><br></br>

      <FacebookShareButton url={url} style={{margin:10}}>
        <FacebookIcon size={40}/>
      </FacebookShareButton>
      <WhatsappShareButton url={url} style={{margin:10}}>
        <WhatsappIcon size={40}></WhatsappIcon>
      </WhatsappShareButton>
      </Modal>

    </div>
  )
}

export default Userdashboard