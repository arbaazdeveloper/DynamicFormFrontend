import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addValue, editField,deleteField, postUpdatedForm, editTitle } from '../../features-redux/Editform'
import { getRequest } from '../Request'
import Window from '../Window'
import EditChekbox from './form elements/EditChekbox'
import EditTextInput from './form elements/EditTextInput'
import Icon, { DeleteOutlined} from '@ant-design/icons';
import { Input } from 'antd'

const Edit = () => {
    const {id}=useParams()
    const form=useSelector(state=>state.editForm.value)
    const [formTitle,setFormTitle]=useState('title')
    const [formIndex,setFormIndex]=useState(10)
    const [val,setVal]=useState(0)
    const dispatch=useDispatch()

    const navigate=useNavigate()
    const getForm=async ()=>{
        const fetchedForm=await getRequest(`getform/${id}`)
        dispatch(addValue(fetchedForm))
        setFormTitle(fetchedForm[0].formTitle)
       console.log(fetchedForm[0].fields[fetchedForm[0].fields.length-1].id)
       setFormIndex(fetchedForm[0].fields[fetchedForm[0].fields.length-1].id)
    }
    const del=(index)=>{
        dispatch(deleteField(index))
        
    }
 const update=(e)=>{
     e.preventDefault()
     dispatch(editTitle(formTitle))
     setVal(val+1)
     setTimeout(()=>{
         dispatch(postUpdatedForm({id:id}))
         navigate('/updated')
     },1000)

 }
    useEffect(()=>{
        getForm()
    },[])
  return (
    <div>
     <h1></h1>
     <div>
         <form>

          <Input value={formTitle}
          style={{width:'50%',margin:10}}
           onChange={(e)=>setFormTitle(e.target.value)}/>
         <Window crrentComp="edit" id={formIndex}/>
      
         {
         
        form.map((item)=>item.fields.map((i,index)=>{
              if(i.type==='text'){
                  return<div key={i.title}>
                      <div className='edit-box'>
                      <EditTextInput val={val} itemId={i.id}  data={i.title}>
                      </EditTextInput>
                      <DeleteOutlined onClick={()=>del(i.id)}></DeleteOutlined>
                      </div>
                  </div> 
              }
              if(i.type==='checkbox'){
                return<div key={i.title}>
                    <div className='edit-box'>
                    <EditChekbox val={val}
                     itemId={index} 
                      data={i.title}
                     options={i.options}>
                    </EditChekbox>
                    <DeleteOutlined onClick={()=>del(i.id)}></DeleteOutlined>
                    </div>
                </div> 
            }
         }))
         
         }
      <button className='btn-btn'onClick={update}>Update</button>
      </form>
     </div>
    </div>
  )
}

export default Edit