import { Input,Button,Col,Select,Row } from 'antd'
import  Axios  from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams} from 'react-router-dom'
import { updateFormData } from '../../features-redux/EditFormRedux'
import EditChekbox from './form elements/EditChekbox'
import EditTextInput from './form elements/EditTextInput'
import { formEditFormData} from '../../features-redux/FormData'
import Icon, { DeleteOutlined} from '@ant-design/icons';
import { memo } from 'react';
import axios from 'axios';
import Window from '../Window';
const { Option, OptGroup } = Select;
const EditForm = () => {
  const {id}=useParams()
  const [form,setForm]=useState([])
  const [val,setVal]=useState(0)
  const [formTitle,setFormTitle]=useState()
  const [formFields,setFormFields]=useState([])
  const updatedData=useSelector((state)=>state.formEdit.value)
  const [deletedField,setDeletedField]=useState([])
  const [Fieldid,setFieldId]=useState(0)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const winRef=useRef(null)

  const getFormData=async()=>{
    const res= await Axios.get(`http://localhost:5000/getform/${id}`)
    setFormTitle(res.data[0].formTitle)
    dispatch(formEditFormData(res.data))
    setFormFields(res.data[0].fields)
    setFieldId(formFields[formFields.length-1].id)
}
const getData=(data)=>{
  setFormFields([...formFields,data])
  console.log(formFields)
  console.log(formFields[formFields.length-1].id)
}

const updateForm=(e)=>{
  e.preventDefault()
  setVal(1)
  setTimeout(()=>{
  dispatch(updateFormData({id:id,data:formTitle}))
  navigate('/updated')
  },1000)
}
const test=(e)=>{
   e.preventDefault()
   winRef.current()
}

const deleteField=async (Fid)=>{
  const res=await axios.put(`http://localhost:5000/deletefield/${id}/${Fid}`)
  setDeletedField(res.data)
}

useEffect(()=>{
  getFormData()
console.log(updatedData)
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
<Window getData={getData} id={Fieldid}/>   
   <h1>Fields</h1>
   {formFields.map((i)=>{
 if(i.type==='text'){
        return<>
        <div className='edit-box'>
<EditTextInput placeholder={i.title}  title={i.title}
childFunc={winRef}
data={i.title} val={val} itemId={i.id} />
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
 <button className='btn-btn' type='submit' onClick={test}>
       Update
    </button>
      </form>
    </div>
  )
}

export default memo(EditForm)