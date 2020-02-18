import React, { Component } from 'react';
import TimeLine from 'libs/TimeLine';
import Generator from './Generator';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    let d1 = new Date();
    let d2 = new Date();
    d2.setDate(d2.getDate() + 5);
    let d3 = new Date();
    d3.setDate(d3.getDate() + 8);
    let d4 = new Date();
    d4.setDate(d4.getDate() + 20);
    this.data = [
      { id: 1, start: d1, end: d2, name: 'Demo Task 1' },
      {
        id: 2,
        start: d3,
        end: d4,
        name: 'Demo Task 2'
      }
    ];
    this.links = [{ id: 1, start: 1, end: 2 }];
  }

  render() {
    return (
      <div className="app-container">
        <h1>Getting Started Demo</h1>
        {/* DayWidth<input type="range" min="30" max="500" value={this.state.daysWidth} onChange={this.handleDayWidth} step="1"/>
           Item Height<input type="range" min="30" max="500" value={this.state.itemheight} onChange={this.handleItemHeight} step="1"/> */}
        <div className="time-line-container">
          <TimeLine data={this.data} links={this.links} />
        </div>
      </div>
    );
  }
}

export default App;
