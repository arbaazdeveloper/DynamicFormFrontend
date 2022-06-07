import { Input } from 'antd'
import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams} from 'react-router-dom'
import { postData } from '../../features-redux/BuildFormData'
import { updateFormData } from '../../features-redux/EditFormRedux'
import Chekbox from './form elements/Chekbox'
import EditChekbox from './form elements/EditChekbox'
import EditTextInput from './form elements/EditTextInput'
import TextInput from './form elements/TextInput'
import { formEditFormData ,filterFormData} from '../../features-redux/FormData'
import Icon, { DeleteOutlined ,EditOutlined,ShareAltOutlined} from '@ant-design/icons';
const EditForm = () => {
  const {id}=useParams()
  const [form,setForm]=useState([])
  const [val,setVal]=useState(0)
  const [formTitle,setFormTitle]=useState()
  const updatedData=useSelector((state)=>state.formEdit.value)
  const formData=useSelector((state)=>state.formData.value)
  const dispatch=useDispatch()
  const getFormData=async()=>{
    const res= await Axios.get(`http://localhost:5000/getform/${id}`)
    setFormTitle(res.data[0].formTitle)
    console.log(formTitle)
    dispatch(formEditFormData(res.data))
    setForm(res.data) 
    
}

const updateForm=(e)=>{
  e.preventDefault()
  setVal(val+1)
  console.log(updatedData)
  const updatedFormVal={
    formTitle:formTitle,
    fields:updatedData,
  }
  console.log(updatedFormVal)
  
  setTimeout(()=>{
  dispatch(updateFormData({id:id,data:formTitle}))

  },1000)
}

const deleteField=(Fid)=>{
 // setForm([form.fields.filter(item=>item.id !== id)])
 console.log(Fid)
 dispatch(filterFormData(Fid))
 console.log(formData)
 console.log('the update'+updatedData)
}
useEffect(()=>{
  getFormData()
 
},[updatedData])
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
   <h1>Fields</h1>
    {formData.map((item)=>{
        return item.fields.map((i)=>{
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
             <button onClick={()=>deleteField(i.id)}>Delete</button>
            </div>
        </>
        }

    })}
    )}
          <button className='btn-btn' type='submit' onClick={updateForm}>
       Update
    </button>
      </form>
    </div>
  )
}

export default EditForm