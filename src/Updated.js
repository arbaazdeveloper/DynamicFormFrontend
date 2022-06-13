import { Modal } from 'antd'
import React, { useEffect,useRef,useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';

const Updated = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const ref=useRef()
  const navigate=useNavigate()
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
      navigate('/userdashboard')
  
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
      navigate('/userdashboard')
  
    };
    useEffect(()=>{
      showModal()
    },[])

  return (
    <div>
  <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Updated</p>
      
      </Modal>
       <a ref={ref} href='/userdashboard'>tell</a>
    </div>
  )
}

export default Updated