import { Button,Row,Col,Modal} from 'antd'
import Icon, { DeleteOutlined ,EditOutlined,ShareAltOutlined} from '@ant-design/icons';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreateForm from './userfeatures/CreateForm'
import image from './form-builders.png'
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
             return<Col span={4}>
               <div className='forms'>
             <div className='feature-1'>
               <img src={image}/>
             <h3 className='form-title-icon'>{item.formTitle}</h3>
        
             <div className='form-features'>
             
               <Link to={`/editform/${item._id}`} className='edit-form-btn'>
               <EditOutlined/>
               </Link>
            <div className='edit-form-btn'>
             <DeleteOutlined onClick={()=>deleteForm(item._id)}/>
             </div>
             <div className='edit-form-btn'>
             <ShareAltOutlined onClick={()=>{share(item._id)}}>
             </ShareAltOutlined>
             </div>
             </div>

             </div>
               </div>
             </Col>
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