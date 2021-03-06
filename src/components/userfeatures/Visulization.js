import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { Row,Col } from 'antd';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Acharts from './Acharts';
const Visulization = () => {
  const [todayCount,setTodayCount]=useState()
  const [yesterdayCount,setYesterDayCount]=useState()
  const [week,setWeek]=useState();
  const [date,onChangeDate]=useState(new Date())
  const [byDate,setByDate]=useState()
  const [showCal,setShowCal]=useState(false)
 
  const getData= async ()=>{
    const res= await axios.get('http://localhost:5000/countformtoday')
    const yes= await axios.get('http://localhost:5000/countformyesterday') 
    const weekAgo =await axios.get('http://localhost:5000/countweekago')
    const dateData= await axios.post('http://localhost:5000/countbydate',{
      date:date.toDateString()
    })
    setTodayCount(res.data)
    setYesterDayCount(yes.data)
    setWeek(weekAgo.data)
    setByDate(dateData.data)
  }
  const show=()=>{
    if(showCal && onChangeDate){
      setShowCal(false)
    }
    else{
      setShowCal(true)
    }
  }
  useEffect(()=>{
     getData()

  },[date])

  const options = {
    xAxis: {
        categories:['created today','created-yesterday','1 week ago',date.toDateString()],
        crosshair: true
    },
    title: {
      text: 'Form Data'
    },
    colors: ['#413df7'],
    credits:{enabled:false},
series: [{
 type: 'column',
 data:[todayCount,yesterdayCount,week,byDate]}]
    }
  
  return (
    <div>
      <Row>
      <Col span={6}/>
        <Col span={12}>
      <div className='bar-chart'>
        <div className='calender-btn' onClick={show}>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZUfR73w3mwZCvpo_sBqwfX-qwgqHaF9f6kQ&usqp=CAU'></img>
        </div>
        <h1>Created By date</h1>
      <HighchartsReact highcharts={Highcharts} styles={{width:50}} options={options}>
      </HighchartsReact>
      </div>
        </Col>
        <Col span={2}>
        
       {
        showCal?<div className='cal'><Calendar  onChange={onChangeDate} value={date}></Calendar></div>:''
       }
        </Col>
        
      </Row>
      <Acharts/>
    </div>
  )
}

export default Visulization