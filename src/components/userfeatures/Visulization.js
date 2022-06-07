import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { Row,Col } from 'antd';
const Visulization = () => {
  const [todayCount,setTodayCount]=useState()
  const [yesterdayCount,setYesterDayCount]=useState()
  const getData= async ()=>{
    const res= await axios.get('http://localhost:5000/countformtoday')
    const yes= await axios.get('http://localhost:5000/countformyesterday')
    setTodayCount(res.data)
    console.log(todayCount)
    setYesterDayCount(yes.data)
  

  }
  useEffect(()=>{
     getData()
  },[])

  const options = {
    xAxis: {
        categories:['created today','created-yesterday'],
        crosshair: true
    },
    title: {
      text: 'Form Data'
    },
series: [{
 type: 'column',
 data:[todayCount,yesterdayCount]
        }]
    }
  return (
    <div>
      <Row>
        <Col span={12}>
      <div className='bar-chart'>
      <HighchartsReact highcharts={Highcharts}
      styles={{width:50}}
      options={options}
      >
      </HighchartsReact>
      </div>
        </Col>
      </Row>
    </div>
  )
}

export default Visulization