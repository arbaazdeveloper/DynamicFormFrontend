import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';

import { Modal, Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';

const FormUrl = (props) => {
    const[id,setId]=useState(props.id)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [url,setUrl]=useState(`http://localhost:3000/fillform/${props.id}`)

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  useEffect(()=>{

   setUrl(`http://localhost:3000/fillform/${props.id}`)
  },[props.id])
  return (
    <div className='form-url'>
        <div>
        <Button 
        disabled={props.disabled}
        margin={{margin:5,
         }}
   
        type="primary" onClick={showModal}>
        Share
      </Button>
      <Modal title="Form"
       visible={isModalVisible}
        onOk={handleOk} 
        onCancel={handleCancel}>

        <Link to={`/fillform/${id}`}>{url}</Link><br></br>
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
        
    </div>
  )
}

export default FormUrl