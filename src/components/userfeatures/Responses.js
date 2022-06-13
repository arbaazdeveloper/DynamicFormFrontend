import React, { useEffect, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import  Axios  from 'axios';
import { useParams } from 'react-router-dom';

const Responses = () => {
  const [rowData,setRowData] = useState([]);
const [columnDefs,setColumnDefs] = useState([])
const [filterData,setFilterData]=useState([])
const {id}=useParams()

const getData=async ()=>{
  const res=await Axios.get(`http://localhost:5000/getresponse/${id}`)
    const myArray=res.data.map((item)=>{
      return item.response.map((i)=>{
        return i.key
      })
     })
     setColumnDefs(myArray[0].map((i)=>{
       return {
         field:i
       }
     }))
     setRowData((res.data.map((item)=>{
      return item.response.map((i)=>{
       return {[i.key]:i.value}
      })
     })))

     setFilterData(rowData.map((item)=>{
      return item.reduce((result, current)=>{
        return Object.assign(result, current);
      }, {})
    }))

}

useEffect(()=>{
getData()
},[rowData])
  return (
    <div className='response-data'>
     
       <div className="ag-theme-alpine" style={{height:600, width:1000}
      
      }>
             <AgGridReact
               rowData={filterData}
               columnDefs={columnDefs}
                
               >
              
             </AgGridReact>
           </div>
    </div>
  )
}

export default React.memo(Responses)