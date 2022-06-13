import { createSlice } from "@reduxjs/toolkit";

export const editForm=createSlice({
    name:"editForm",
    initialState:{value:[]},
    reducers:{
        addValue:(state,action)=>{
             state.value=action.payload
        },
        editField:(state,action)=>{
            state.value[0].fields[action.payload.index].type=action.payload.type
            state.value[0].fields[action.payload.index].title=action.payload.title

        },
        editTitle:(state,action)=>{
            state.value[0].formTitle=action.payload
        },
        addFormField:(state,action)=>{
            state.value[0].fields.push(action.payload)
        },
        deleteField:(state,action)=>{
            state.value[0].fields=state.value[0].fields.filter(item=>item.id !== action.payload)
        },
        postUpdatedForm:async (state,action)=>{
           const res=await fetch(`http://localhost:5000/updateform/${action.payload.id}`,{
               method:'PUT',
               headers:{
                   'content-type':'application/json',
                   token:localStorage.getItem('token')
               },
               body:JSON.stringify(state.value[0])
           })
           const response =await res.json()
           
        }
        

    }
})

export const {addValue,deleteField,editField,addFormField,postUpdatedForm,editTitle}=editForm.actions
export default editForm.reducer