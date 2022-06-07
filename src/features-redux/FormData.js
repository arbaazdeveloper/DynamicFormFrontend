import { createSlice } from "@reduxjs/toolkit";

export const formData=createSlice({
    name:'formData',
    initialState:{value:[]},
    reducers:{
        formEditFormData:(state,action)=>{
            state.value=action.payload
            console.log(state.value)
        },
        filterFormData:(state,action)=>{
            console.log(action.payload)
           // state.value[0].fields=state.value[0].fields.filter((item)=>item.id !== action.payload)
            state.value[0].fields.splice(action.payload,1)
            console.log(state.value[0])
           
        }
    }
});
export const {formEditFormData,filterFormData}=formData.actions
export default formData.reducer