import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addValue, editField,deleteField, postUpdatedForm } from '../../features-redux/Editform'
import { getRequest } from '../Request'
import Window from '../Window'
import EditChekbox from './form elements/EditChekbox'
import EditTextInput from './form elements/EditTextInput'
import Icon, { DeleteOutlined} from '@ant-design/icons';

const Edit = () => {
    const {id}=useParams()
    const form=useSelector(state=>state.editForm.value)
  
    const [val,setVal]=useState(0)
    const dispatch=useDispatch()

    const navigate=useNavigate()
    const getForm=async ()=>{
        const fetchedForm=await getRequest(`getform/${id}`)
        dispatch(addValue(fetchedForm))
     
        
    }
    const del=(index)=>{
        dispatch(deleteField(index))
        
    }
 const update=()=>{
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
         <Window crrentComp="edit" id={parseInt(form.map((item)=>{return item.fields.lastIndexOf()+1}))}/>
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
     </div>
    </div>
  )
}

export default Edit