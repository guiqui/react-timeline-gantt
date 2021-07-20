import React, { Component, useState } from 'react'
import TimeLine, { ModeSelector } from '../../src';
import logo from './logo.svg'
import './App.css'

const config = {
  header: {
    month: {
      dateFormat: 'MMMM  YYYY',
      style: {
        background: 'linear-gradient( grey, black)',
        textShadow: '0.5px 0.5px black',
        fontSize: 12
      }
    },
    dayOfWeek: {
      style: {
        background: 'linear-gradient( orange, grey)',
        fontSize: 9
      }
    },
    dayTime: {
      style: {
        background: 'linear-gradient( grey, black)',
        fontSize: 9,
        color: 'orange'
      },
      selectedStyle: {
        background: 'linear-gradient( #d011dd ,#d011dd)',
        fontWeight: 'bold',
        color: 'white'
      }
    }
  },
  taskList: {
    title: {
      label: 'Task Todo',
      style: {
        background: 'linear-gradient( grey, black)'
      }
    },
    task: {
      style: {
        backgroundColor: 'grey',
        color: 'white'
      }
    },
    verticalSeparator: {
      style: {
        backgroundColor: '#fbf9f9'
      },
      grip: {
        style: {
          backgroundColor: 'red'
        }
      }
    }
  },
  dataViewPort: {
    rows: {
      style: {
        backgroundColor: 'white',
        borderBottom: 'solid 0.5px silver'
      }
    },
    task: {
      showLabel: true,
      style: {
        borderRadius: 1,
        boxShadow: '2px 2px 8px #888888'
      }
    }
  }
};

const DATA : any[] = [
  {
    id: 1,
    color: 'purple',
    name: "Test",
    start: new Date(2021, 2, 12),
    end: new Date(2021, 5, 9)
  },
  {
    id: 2,
    color: 'orange',
    name: "Test",
    start: new Date(2021, 7, 12),
    end: new Date(2021, 12, 9)
  }
];

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemheight: 50,
      data: DATA,
      selectedItem: null,
      timelineMode: 'month',
      links: [],
      nonEditableName: false,
      date: new Date()
    };
  }

  handleDayWidth = (e: any) => {
    this.setState({ daysWidth: parseInt(e.target.value) });
  };

  handleItemHeight = (e: any) => {
    this.setState({ itemheight: parseInt(e.target.value) });
  };

  onHorizonChange = (start: any, end: any) => {
    let result = DATA.filter((item) => {
      return (item.start < start && item.end > end) || (item.start > start && item.start < end) || (item.end > start && item.end < end);
    });
    console.log('Calculating ');
    this.setState({ data: result });
  };

  onSelectItem = (item: any) => {
    console.log(`Select Item ${item}`);
    this.setState({ selectedItem: item });
  };

  onUpdateTask = (item: any, props: any) => {
    item.start = props.start;
    item.end = props.end;
    this.setState({ data: [...this.state.data] });
    console.log(`Update Item ${item}`);
  };

  onCreateLink = (item: any) => {
    this.setState({links: [...this.state.links, item]})
    /*let newLink = Generator.createLink(item.start, item.end);
    this.setState({ links: [...this.state.links, newLink] });*/
    console.log(`Update Item ${item}`);
  };

  getbuttonStyle(value: any) {
    return this.state.timelineMode == value ? { backgroundColor: 'grey', boder: 'solid 1px #223344' } : {};
  }

  modeChange = (value: any) => {
    this.setState({ timelineMode: value });
  };


  getRandomDate() {
    let result = new Date();
    result.setDate(result.getDate() + Math.random() * 10);
    return result;
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  addTask = () => {
    let newTask = {
      id: this.state.data.length + 1,
      start: new Date(),
      end: this.getRandomDate(),
      name: 'New Task',
      color: this.getRandomColor()
    };
    this.setState({ data: [newTask, ...this.state.data] });
  };

  delete = () => {
    console.log('On delete');
    if (this.state.selectedItem) {
      let index = this.state.links.indexOf(this.state.selectedItem);
      if (index > -1) {
        this.state.links.splice(index, 1);
        this.setState({ links: [...this.state.links] });
      }
      index = this.state.data.indexOf(this.state.selectedItem);
      if (index > -1) {
        this.state.data.splice(index, 1);
        this.setState({ data: [...this.state.data] });
      }
    }
  };

  getStripes(count: number, dayWidth: number){
    
    let onColor = '#5d9634';
    let offColor = '#538c2b';

    let stripes = [];
    for(var i = 0; i < count; i++){
      let color = (i == 0 || i == count - 1) ? onColor : offColor
      let borderMultiplier = i * 1;
      stripes.push(`
        ${i == 0 ? `#ffffff ${((i * dayWidth))}px,
        #ffffff ${(i * dayWidth) +0.5 }px,` : ''}
        ${color} ${(i * dayWidth) + 0.5}px,
        ${color} ${(i * dayWidth) + dayWidth}px
        ${true ? `, #ffffff ${(i * dayWidth) }px,
        #ffffff ${(i * dayWidth) + 0.5}px` : ''}`)
    }
    return stripes.join(',')
  }

  getOffset(mode: string){
    switch(mode){
      case 'year':
        return 4;
      default:
        return 0;
    }
  }

  handleDateChange(date: Date){
    this.setState({date})
    console.log("Date", date)
  }

  render() {
    return (
      <div className="app-container">
        <div className="nav-container">
          <div className="mode-container-title">Full Demo</div>
          <div className="operation-button-container">
            <div className="operation-button-container">
              <div className="mode-button" onClick={this.addTask}>
                <svg height={30} width={30} viewBox="0 0 48 48">
                  <path
                    fill="silver"
                    d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 22h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z"
                  />
                </svg>
              </div>
              <div className="mode-button" onClick={this.delete}>
                <svg height={30} width={30} viewBox="0 0 48 48">
                  <path fill="silver" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 22H14v-4h20v4z" />
                </svg>
              </div>
            </div>
          </div>
          <ModeSelector
            onChange={(mode) => this.setState({timelineMode: mode})} />
        </div>
        <div className="time-line-container">
          <TimeLine
            style={{
              background: (mode: string, dayWidth: number) => {
                if(mode == 'year') dayWidth = dayWidth * 7
                return {
                background: `linear-gradient(
                  to right, 
                  ${this.getStripes(2, dayWidth)}
                )`,
                backgroundSize: `${dayWidth * 2}px 100%`,
                backgroundPosition: `${this.getOffset(mode)}px 0`
              }
            }
            }}
            // config={config}
            data={this.state.data}
            date={this.state.date}
            onDateChange={this.handleDateChange.bind(this)}
            links={this.state.links}
            onHorizonChange={this.onHorizonChange}
            onSelectItem={this.onSelectItem}
            onUpdateTask={this.onUpdateTask}
            onCreateLink={this.onCreateLink}
            mode={this.state.timelineMode}
            itemheight={this.state.itemheight}
            selectedItem={this.state.selectedItem}
            nonEditableName={this.state.nonEditableName}
          />
        </div>
      </div>
    );
  }
}

export default App
