import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import Chekbox from './form elements/Chekbox'
import EditTextInput from './form elements/EditTextInput'
import TextInput from './form elements/TextInput'

const EditForm = () => {
  const {id}=useParams()
  const [form,setForm]=useState([])
  const getFormData=async()=>{
    const res= await Axios.get(`http://localhost:5000/getform/${id}`)
    setForm(res.data) 
}

useEffect(()=>{
  getFormData()
},[])
  return (
    <div className='edit'>
            <form>
    {form.map((item)=>{
        return item.fields.map((i)=>{
            if(i.type==='text'){
        return<>
        <div className='edit-box'>
          <EditTextInput placeholder={i.title} title={i.title}  data={i.title}/>
        </div>
        </>
        }
        if(i.type==='checkbox'){
            return<>
            <div className='edit-box'>
            <Chekbox options={i.options}
             title={i.title} 
             data={i.title}
            />
            </div>
        </>
        }

    })}
    )}
          <button className='btn-btn' type='submit'>
       Update
    </button>
      </form>
    </div>
  )
}

export default EditForm