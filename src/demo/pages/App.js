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
  constructor(props) {
    super(props);
    let d1 = new Date();
    let d2 = new Date();
    d2.setDate(d2.getDate() + 5);
    let d3 = new Date();
    d3.setDate(d3.getDate() + 8);
    let d4 = new Date();
    d4.setDate(d4.getDate() + 20);

    let data = [
      {
        id: 1,
        start: d1,
        end: d2,
        name: "Demo Task 1"
      },
      {
        id: 2,
        start: d3,
        end: d4,
        name: "Demo Task 2",
        color: "orange"
      }
    ];

    this.state = { data: data, links: [] };
  }
  genID() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-4" +
      S4().substr(0, 3) +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    ).toLowerCase();
  }
  createLink(start, end) {
    return {
      id: this.genID(),
      start: start.task.id,
      startPosition: start.position,
      end: end.task.id,
      endPosition: end.position
    };
  }
  onUpdateTask = (item, props) => {
    item.start = props.start;
    item.end = props.end;
    this.setState({ data: [...this.state.data] });
  };
  onCreateLink = item => {
    let newLink = this.createLink(item.start, item.end);
    this.setState({ links: [...this.state.links, newLink] });
  };

  render() {
    return (
      <div className="app-container">
        <h1>Getting Started Demo</h1>
        {/* DayWidth<input type="range" min="30" max="500" value={this.state.daysWidth} onChange={this.handleDayWidth} step="1"/>
       Item Height<input type="range" min="30" max="500" value={this.state.itemheight} onChange={this.handleItemHeight} step="1"/> */}
        <div className="time-line-container">
          <TimeLine
            data={this.state.data}
            links={this.state.links}
            onUpdateTask={this.onUpdateTask}
            onCreateLink={this.onCreateLink}
          />
        </div>
      </div>
    );
  }
}

export default App;
