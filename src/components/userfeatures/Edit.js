import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addValue, editField,deleteField, postUpdatedForm } from '../../features-redux/Editform'
import { getRequest } from '../Request'
import Window from '../Window'
import EditTextInput from './form elements/EditTextInput'

const Edit = () => {
    const {id}=useParams()
    const form=useSelector(state=>state.editForm.value)
    const [val,setVal]=useState(0)
    const dispatch=useDispatch()
    const [show,setShow]=useState(true)
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
     setShow(false)
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
         <Window />
         {
         
        show?form.map((item)=>item.fields.map((i,index)=>{
              if(i.type==='text'){
                  return<div key={i.title}>
                      <div>
                      <EditTextInput val={val} itemId={index}  data={i.title}>
                      </EditTextInput>
                      <div onClick={()=>del(index)}>delete {index}</div>
                      </div>
                  </div> 
              }
         })):<div><h1>Updating....</h1></div>
         
         }
      <button onClick={update}>Update</button>
     </div>
    </div>
  )
}

export default Edit