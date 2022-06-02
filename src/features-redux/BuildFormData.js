import { createSlice } from "@reduxjs/toolkit";

const FormBuild=createSlice({
    name:"formBuild",
    initialState:{value:[]},
    reducers:{
        addData:(state,action)=>{
            state.value.push(action.payload)
        }
    }
})
export const {addData }=FormBuild.actions
export default FormBuild.reducer