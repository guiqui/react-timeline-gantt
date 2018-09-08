import React,{Component} from 'react';
import TimeLine from 'libs/TimeLine';

import './App.css'

class App extends Component{
  constructor(props){
    super(props)
    this.state={
      daysWidth:30,
      itemheight:30
    }
  }

  handleDayWidth=(e)=>{
    this.setState({daysWidth:parseInt(e.target.value)})
  }
  handleItemHeight=(e)=>{
    this.setState({itemheight:parseInt(e.target.value)})
  }
  render(){

    return (
      <div className="app-container">
       <h1>Gant Time Lime Demo</h1>
       DayWidth<input type="range" min="30" max="500" value={this.state.daysWidth} onChange={this.handleDayWidth} step="1"/>
       Item Height<input type="range" min="30" max="500" value={this.state.itemheight} onChange={this.handleItemHeight} step="1"/>
        <div className="time-line-container">
          <TimeLine  itemheight={this.state.itemheight} dayWidth={this.state.daysWidth}/>
        </div>
      </div>

    )
  }

}

export default App;
