import axios from "axios"
const requests={
    postRequest:async (data,endpoint)=>{
        const res=await axios.post(`http://localhost:5000/${endpoint}`,data,
      {  headers:{'content-type':'application/json',
            token:localStorage.getItem('token')}}
        )
        return await res.data
    },
    getRequest:async (endpoint)=>{
        const res=await axios.get(`http://localhost:5000/${endpoint}`,{
            headers:{'content-type':'application/json',token:localStorage.getItem('token')}
        })
        return res.data
    }
}
export const {postRequest,getRequest}=requests