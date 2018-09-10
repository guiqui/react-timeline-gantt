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
      timeLineData:[],
      selectedItem:null
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
  
  onSelectItem=(item)=>{
    console.log(`Select Item ${item}`)
    this.setState({selectedItem:item})
  }

  onUpdateItem=(item,props)=>{
    item.start=props.start;
    item.end=props.end;
    this.setState({timeLineData:[...this.state.timeLineData]})
    console.log(`Update Item ${item}`)
  }

  render(){

    return (
      <div className="app-container">
       <h1>Gant Time Lime Demo</h1>
       {/* DayWidth<input type="range" min="30" max="500" value={this.state.daysWidth} onChange={this.handleDayWidth} step="1"/>
       Item Height<input type="range" min="30" max="500" value={this.state.itemheight} onChange={this.handleItemHeight} step="1"/> */}
        <div className="time-line-container">
          <TimeLine  data={this.state.timeLineData} 
            onNeedData={this.onNeedData} 
            onSelectItem={this.onSelectItem}
            onUpdateItem={this.onUpdateItem}
            itemheight={this.state.itemheight} 
            dayWidth={this.state.daysWidth}
            selectedItem={this.state.selectedItem}/>
        </div>
      </div>

    )
  }

}

export default App;
