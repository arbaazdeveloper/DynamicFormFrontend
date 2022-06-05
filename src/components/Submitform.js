import React, { useEffect, useState } from 'react'
import Axios  from 'axios'
const Submitform = (props) => {
    const [data,setData]=useState([])
    useEffect(()=>{
  
},[props.val])
  

  return (
    <div>
      {
            useEffect(()=>{
              props.data.map((item)=>{
                  return console.log(item)
              })
            },[props.val])
        
      }
    </div>
  )

}

export default Submitform