import React,{Component} from 'react';
import TimeLine from 'libs/TimeLine';
import Generator from './Generator'
import './App.css'

class App extends Component{
  constructor(props){
    super(props)
    this.data=Generator.generateData()
    this.state={
      daysWidth:30,
      itemheight:30,
      timeLineData:[]
    }
  }

  handleDayWidth=(e)=>{
    this.setState({daysWidth:parseInt(e.target.value)})
  }
  handleItemHeight=(e)=>{
    this.setState({itemheight:parseInt(e.target.value)})
  }
  
  onNeedData=(start,end)=>{
      let result = this.data.filter((item)=>{
        return  (item.start<start && item.end>end) ||
                (item.start>start && item.start<end) ||
                (item.end>start && item.end<end)})
      console.log('Calculating ')
      this.setState({timeLineData:result})
  }
  


  render(){

    return (
      <div className="app-container">
       <h1>Gant Time Lime Demo</h1>
       DayWidth<input type="range" min="30" max="500" value={this.state.daysWidth} onChange={this.handleDayWidth} step="1"/>
       Item Height<input type="range" min="30" max="500" value={this.state.itemheight} onChange={this.handleItemHeight} step="1"/>
        <div className="time-line-container">
          <TimeLine  data={this.state.timeLineData} onNeedData={this.onNeedData} itemheight={this.state.itemheight} dayWidth={this.state.daysWidth}/>
        </div>
      </div>

    )
  }

}

export default App;
