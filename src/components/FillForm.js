import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Button, Row,Col} from 'antd'
import { useParams } from 'react-router-dom'
import Text from './BuildFormElement/Text'
import { memo } from 'react'
import FormCheckBox from './BuildFormElement/FormCheckBox'
const FillForm = () => {
    const {id}=useParams()
    const [form,setForm]=useState([])
    const getFormData=async()=>{
        const res= await Axios.get(`http://localhost:5000/getform/${id}`)
        setForm(res.data)
        console.log(form)
    }
    const test=()=>{
      
    }
    useEffect(()=>{
        getFormData()
        test()
      },[])
 
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
          <Text placeholder={i.title}/>
        </div>
        </>
        }
        if(i.type==='checkbox'){
            return<>
            <div className='form-struct'>
            <h1>{i.title}</h1>
            <FormCheckBox options={i.options}/>
            </div>
        </>
        }

    })}
    )}
    <button className='btn-btn'>
        Submit
    </button>
      </form>
            </div>
            </Col>
            <Col span={8}></Col>
            </Row>
     
    </div>
  )
}

export default memo(FillForm)