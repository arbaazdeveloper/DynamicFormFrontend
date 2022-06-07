import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { Row,Col } from 'antd';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const Visulization = () => {
  const [todayCount,setTodayCount]=useState()
  const [yesterdayCount,setYesterDayCount]=useState()
  const [week,setWeek]=useState();
  const [date,onChangeDate]=useState(new Date())
  const [byDate,setByDate]=useState()

 
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
    console.log(dateData.data)

  }
  useEffect(()=>{
     getData()
     console.log(date)
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
        <Col span={12}>
      <div className='bar-chart'>
        <h1>Created By date</h1>
      <HighchartsReact highcharts={Highcharts}
      styles={{width:50}}
      options={options}
      >
      </HighchartsReact>
      </div>
        </Col>
       

        <Col span={12}>
          <div className='calender'>
          <Calendar onChange={onChangeDate} value={date}></Calendar>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Visulization