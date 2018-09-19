import React,{Component} from 'react';
import TimeLine from 'libs/TimeLine';
import Generator from './Generator'
import './App.css'


const config={
  header:{
    month:{
      dateFormat:'MMMM  YYYY',
      style:{
        background:"linear-gradient( grey, black)",
        textShadow:'0.5px 0.5px black',
        fontSize:12
      }
    },
    dayOfWeek:{
      style:{
        background:"linear-gradient( orange, grey)",
        fontSize:9
      }
    },
    dayTime:{
      style:{
        background:"linear-gradient( grey, black)",
        fontSize:9,
        color:"orange"
      },
      selectedStyle:{
        background:"linear-gradient( #d011dd ,#d011dd)",
        fontWeight: 'bold',
        color:'white'
      }
    }
  },
  taskList:{
    title:{
        label:"Task Todo",
        style:{
          background:"linear-gradient( grey, black)"
        }
    },
    task:{
      style:{
          backgroundColor: 'grey',
          color:'white'
      }
    },
    verticalSeparator:{
        style:{
            backgroundColor: '#fbf9f9',
        },
        grip:{
          style:{
            backgroundColor: 'red',
          }
        }
    }
  },
  dataViewPort:{
    rows:{
      style:{
        backgroundColor:"white",
        borderBottom:'solid 0.5px silver'
      }
    },
    task:{
      showLabel:true,
      style:{
          borderRadius:1,
          boxShadow: '2px 2px 8px #888888',
          
      }
    }
  }
}

class App extends Component{
  constructor(props){
    super(props)
    let result=Generator.generateData()
    this.data=result.data;
    this.state={
      itemheight:20,
      timeLineData:[],
      selectedItem:null,
      timelineMode:"month",
      links:result.links
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

  onUpdateTask=(item,props)=>{
    item.start=props.start;
    item.end=props.end;
    this.setState({timeLineData:[...this.state.timeLineData]})
    console.log(`Update Item ${item}`)
  }
  onCreateLink=(item)=>{
    
    let newLink=Generator.createLink(item.start,item.end)
    this.setState({links:[...this.state.links,newLink]})
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
       
        <div className="nav-container">
          <div className="mode-container-title">Gantt TimeLine Demo</div>
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
        </div>
        <div className="time-line-container">
          <TimeLine  
              // config={config}
            data={this.state.timeLineData} 
            links={this.state.links} 
            onNeedData={this.onNeedData} 
            onSelectItem={this.onSelectItem}
            onUpdateTask={this.onUpdateTask}
            onCreateLink={this.onCreateLink}
            mode={this.state.timelineMode}
            itemheight={this.state.itemheight} 
            selectedItem={this.state.selectedItem}/>
        </div>
      </div>
    )
  }

}

export default App;
