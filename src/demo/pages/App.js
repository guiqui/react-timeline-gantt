import React,{Component} from 'react';
import TimeLine from 'libs/TimeLine';
import Generator from './Generator'
import './App.css'

class App extends Component{
  constructor(props){
    super(props)
    this.data=Generator.generateData()
    this.state={
      itemheight:30,
      timeLineData:[],
      selectedItem:null,
      timelineMode:"week"
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

  getbuttonStyle(value){
    return this.state.timelineMode==value?{backgroundColor:"grey",boder:'solid 1px #223344'}:{}
  }

  modeChange=(value)=>{
    this.setState({timelineMode:value})
  }

  render(){

    return (
      <div className="app-container">
       <h1>Gantt Time Lime Demo</h1>
        <div className="mode-container">
          <div className="mode-container-item mode-container-item-left" 
              onClick={(e)=>this.modeChange('day')}
              style={this.getbuttonStyle('day')}>Day</div>
          <div className="mode-container-item" 
              onClick={(e)=>this.modeChange('week')}
              style={this.getbuttonStyle('week')} >Week</div>
          <div className="mode-container-item mode-container-item-right" 
              onClick={(e)=>this.modeChange('month')}
              style={this.getbuttonStyle('month')}>Month</div>
        </div>
        <div className="time-line-container">
          <TimeLine  data={this.state.timeLineData} 
            onNeedData={this.onNeedData} 
            onSelectItem={this.onSelectItem}
            onUpdateItem={this.onUpdateItem}
            mode={this.state.timelineMode}
            itemheight={this.state.itemheight} 
            selectedItem={this.state.selectedItem}/>
        </div>
      </div>
    )
  }

}

export default App;
