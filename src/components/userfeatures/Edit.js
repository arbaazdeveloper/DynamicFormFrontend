import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import  Axios  from 'axios'
const Edit = () => {
    const {id}=useParams()
    const [formData,setFormData]=useState([])
    const [formFields,setFields]=useState()
    const [values,setValue]=useState([""])
     const getFormData=async()=>{
     const res= await Axios.get(`http://localhost:5000/getform/${id}`)
     setFormData(res.data)
     setFields(res.data[0].fields)
    console.log(formFields)

}
function handleChange(i,event){
   const val=[...values]
   val[i]=event.target.value
   setFields(val)

}
useEffect(()=>{
getFormData()
},[])
  return (
    <div>
        <form>

        {
            formFields.map((item,index)=>{
                return <>
                    <input type={item.type} value={values || ""} onChange={(e)=>handleChange(index,e)}/>
                </>
            })
          
        }
        </form>
    </div>
  )
}

export default Edit