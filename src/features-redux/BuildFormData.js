import { createSlice } from "@reduxjs/toolkit";

const FormBuild=createSlice({
    name:"formBuild",
    initialState:{value:[]},
    reducers:{
        addData:(state,action)=>{
            state.value.push(action.payload)
        },
        postData:async (state,action)=>{
            const res=await fetch('http://localhost:5000/postresponse',{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify({formId:action.payload,
                response:state.value
                  })
            })
            console.log(await res.json())
        }
    }
})
export const {addData }=FormBuild.actions
export const {postData}=FormBuild.actions
export default FormBuild.reducer