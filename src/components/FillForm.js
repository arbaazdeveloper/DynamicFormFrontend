import Axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import {Button, Row,Col} from 'antd'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Text from './BuildFormElement/Text'
import FormCheckBox from './BuildFormElement/FormCheckBox'
import { useDispatch, useSelector } from 'react-redux'
import Submitform from './Submitform'
import { postData } from '../features-redux/BuildFormData'
const FillForm = () => {
    const {id}=useParams()
    const [form,setForm]=useState([])
    const[val,setValue]=useState(1)
    const text=useRef()
    const dispatch=useDispatch()
    const postFormData=useSelector((state)=>state.formBuild.value)
    const [formData,setFormData]=useState([postFormData])
    const navigate=useNavigate()
    
    const getFormData=async()=>{
        const res= await Axios.get(`http://localhost:5000/getform/${id}`)
        setForm(res.data)
    
    }

  
    useEffect(()=>{
        getFormData()
       setFormData(postFormData)
      },[val])

      const test=(e)=>{
        e.preventDefault();
         setValue(val+1)
         setTimeout(()=>{
            dispatch(postData(form[0]._id))
            navigate('/thanks')
         }, 1000)
        
     
      
    }
  return (
    <div className='dashboard'>
     
     <Row>
     <Col span={8}></Col>
     <Col span={8}>
    <div>
        {form.map((item)=>{
            return<>
            <h1>{item.formTitle}</h1>
            </>
        })}

        <form>
    {form.map((item)=>{
        return item.fields.map((i)=>{
            if(i.type==='text'){
        return<>
        <div className='form-struct'>
            <h1>{i.title}</h1>
          <Text val={val} placeholder={i.title} ref={text} title={i.title}/>
        </div>
        </>
        }
        if(i.type==='checkbox'){
            return<>
            <div className='form-struct'>
            <h1>{i.title}</h1>
            <FormCheckBox options={i.options}
             title={i.title} 
             val={val}/>
            </div>
        </>
        }

    })}
    )}
          <button className='btn-btn' type='submit' onClick={test}>
        Submit
    </button>
      </form>
            </div>
            </Col>
            <Col span={8}></Col>
            </Row>
       <Submitform val={val} data={postFormData}/>
    </div>
  )
}

export default FillForm