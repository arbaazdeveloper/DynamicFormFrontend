import { Modal } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const upadted = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}

export default upadted