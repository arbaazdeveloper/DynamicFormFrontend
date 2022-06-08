import { Input,Button,Col,Select,Row } from 'antd'
import  Axios  from 'axios'
import ReactDOM from 'react-dom/client';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams} from 'react-router-dom'
import { postData } from '../../features-redux/BuildFormData'
import { updateFormData } from '../../features-redux/EditFormRedux'
import Chekbox from './form elements/Chekbox'
import EditChekbox from './form elements/EditChekbox'
import EditTextInput from './form elements/EditTextInput'
import TextInput from './form elements/TextInput'
import { formEditFormData ,filterFormData} from '../../features-redux/FormData'
import Icon, { DeleteOutlined ,EditOutlined,ShareAltOutlined} from '@ant-design/icons';
import { memo } from 'react';
import axios from 'axios';
const { Option, OptGroup } = Select;
const EditForm = () => {
  const {id}=useParams()
  const [form,setForm]=useState([])
  const [val,setVal]=useState(0)
  const [formTitle,setFormTitle]=useState()
  const [formFields,setFormFields]=useState([])
  const updatedData=useSelector((state)=>state.formEdit.value)
  const formData=useSelector((state)=>state.formData.value)
  const [deletedField,setDeletedField]=useState([])
  const[option,setOption]=useState([])
  const [window,setWindow]=useState(false)
  const [optionText,setOptionText]=useState()
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [selectBox,setSelectBox]=useState()
 const [title,setTitle]=useState()
  const getFormData=async()=>{
    const res= await Axios.get(`http://localhost:5000/getform/${id}`)
    setFormTitle(res.data[0].formTitle)
   // console.log(formTitle)
    dispatch(formEditFormData(res.data))
    setForm(res.data)
    console.log(res.data.map((item)=>item.fields))
    setFormFields(res.data[0].fields)
    
}

const setWindowOption=()=>{
  setWindow(true)
}
const handleChange=(value)=>{
  setSelectBox(value)
}
const addOption=()=>{
  setOption([...option,optionText])
  setOptionText('')
}
const updateForm=(e)=>{
  e.preventDefault()
  setVal(val+1)
  console.log(updatedData)
   setTimeout(()=>{
  dispatch(updateFormData({id:id,data:formTitle}))
  navigate('/updated')
  },1000)
}

const deleteField=async (Fid)=>{
// dispatch(filterFormData(Fid))
// const test=formFields.filter(item=>item.id !== Fid)
 //setFormFields(test)
// console.log(formData)
 //console.log('the update'+updatedData)
  const res=await axios.put(`http://localhost:5000/deletefield/${id}/${Fid}`)
  setDeletedField(res.data)

}
const addField=()=>{
 
  if(selectBox==='text'){
  const field={
    id:formFields.lastIndexOf()+1,
    type:'text',
    title:title
  }
  setFormFields([...formFields,field])

}
if(selectBox==='checkbox'){
  const field={
    id:formFields.lastIndexOf()+1,
    type:'checkbox',
    title:title,
    options:option
  
  }
  
  setFormFields([...formFields,field])
}


}
useEffect(()=>{
  getFormData()
},[updatedData,deletedField])
  return (
    <div className='edit'>
<form>
<h1>Form Title</h1>
<Input 
style={{
  width:'50%',
  margin:'auto',
  marginBottom:10
}}
value={formTitle}
onChange={(e)=>setFormTitle(e.target.value)}
></Input>

<h1>Add Fields</h1>
        <div className='form-builder'>
          <Button
          style={{
            border:'none',
            background:'#413df7',
            paddingLeft:50,
            paddingRight:50,
            fontWeight:600,
            color: '#fff',
            borderRadius:5,
            cursor:'pointer'
          }}
          onClick={setWindowOption}>Create +</Button></div>

{window?
         <div className='add-field'>
           <h1>Add a field</h1>
           <Row>
             <Col span={8}></Col>
             <Col span={8}>
        
           <Input placeholder='Title'
           value={title}
           onChange={(e)=>setTitle(e.target.value)}
           style={{
             margin:5
           }}
           />

           <Select
      defaultValue="Select type"
           onChange={handleChange}
       style={{
       width: 200,
       margin:10
       }}
   
  >
    <OptGroup label="select">
      <Option value="text">Text</Option>
      <Option value="checkbox">Chekbox</Option>
    </OptGroup>
  </Select>
  
             </Col>
             <Col span={8}></Col>
           </Row>
      {selectBox==='checkbox'?<><Input
      style={{width:150,
      margin:5
      }}
      placeholder='Options'
      value={optionText}
      onChange={(e)=>setOptionText(e.target.value)}
      >
      </Input><Button onClick={addOption}>Add Options</Button>
      <br></br>
      <Chekbox options={option} title={title}/>
      </>:''}

      <Button
             style={{
              border:'none',
              background:'#413df7',
              paddingLeft:50,
              paddingRight:50,
              fontWeight:600,
              color: '#fff',
              borderRadius:5,
              cursor:'pointer'
            }}
       onClick={addField}>Add Field</Button>
       </div>:''
}
   <h1>Fields</h1>

   {formFields.map((i)=>{
 if(i.type==='text'){
        return<>
        <div className='edit-box'>
          <EditTextInput
           placeholder={i.title}
           title={i.title} 
           data={i.title}
           val={val}
           itemId={i.id}
           />
            <DeleteOutlined onClick={()=>deleteField(i.id)}/>
        </div>
        </>
        }
        if(i.type==='checkbox'){
            return<>
            <div className='edit-box'>
            <EditChekbox 
            options={i.options}
             title={i.title} 
             data={i.title}
            />
           <DeleteOutlined onClick={()=>deleteField(i.id)}/>
            </div>
        </>
        }
      })}
    
           
          <button className='btn-btn' type='submit' onClick={updateForm}>
       Update
    </button>
      </form>
    </div>
  )
}

export default memo(EditForm)