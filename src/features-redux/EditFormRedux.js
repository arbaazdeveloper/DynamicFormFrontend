import { createSlice } from "@reduxjs/toolkit";

export const editSlice=createSlice({
    name:"edit",
    initialState:{value:[]},
    reducers:{
        addEditData:(state,action)=>{
            state.value.push(action.payload)
        },
        updateFormData:async (state,action)=>{
const updatedData={
fields:state.value,
formTitle:action.payload.data
            }
 const res=await fetch(`http://localhost:5000/updateform/${action.payload.id}`,{
    method:'PUT',
    headers:{
      'content-type':'application/json',
       token:localStorage.getItem('token')
    },
    body:JSON.stringify(updatedData)
})
const response= await res.json()
console.log(response)
        }
     
    }
})

export const  {addEditData,updateFormData}=editSlice.actions
export default editSlice.reducer