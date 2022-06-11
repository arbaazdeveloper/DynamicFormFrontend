import { Button,Row,Col,Modal} from 'antd'
import Icon, { DeleteOutlined ,EditOutlined,ShareAltOutlined} from '@ant-design/icons';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreateForm from './userfeatures/CreateForm'

import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import { getRequest } from './Request';

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
    const data=await getRequest('getallform')
    setForm(data)
    
    
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
             return<Col xs={24} xl={4}>
               <div className='forms'>
             <div className='feature-1'>
               <img src="data:image/jpeg;base64,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"/>
             <h3 className='form-title-icon'>{item.formTitle}</h3>
        
             <div className='form-features'>
             
               <Link to={`/editform/${item._id}`} className='edit-form-btn'>
               <EditOutlined/>
               </Link>
            <div className='edit-form-btn'onClick={()=>deleteForm(item._id)}>
             <DeleteOutlined />
             </div>
             <div className='edit-form-btn'onClick={()=>{share(item._id)}}>
             <ShareAltOutlined >
             </ShareAltOutlined>
             </div>
             </div>

             </div>
               </div>
             </Col>
           })}

        <Col xs={24} xl={4}>
          <div className='create-form-btn'>
        <div className='feature-1'onClick={()=>setComponent(1)}>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbPXRf0IjgZ7MWOQyYt4ziifdqpkjt4PDZag&usqp=CAU'/>
        <h2>Create Form</h2>
          </div>
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