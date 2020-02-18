import React, { Component } from 'react';
import TimeLine from 'libs/TimeLine';
import Generator from './Generator';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    let result = Generator.generateData();
    this.data = result.data;
    this.state = {
      itemheight: 20,
      timeLineData: [],
      selectedItem: null,
      timelineMode: 'month',
      links: result.links
    };
  }

  onHorizonChange = (start, end) => {
    let result = this.data.filter((item) => {
      return (item.start < start && item.end > end) || (item.start > start && item.start < end) || (item.end > start && item.end < end);
    });
    console.log('Calculating ');
    this.setState({ timeLineData: result });
  };

  render() {
    return (
      <div className="app-container">
        <div className="nav-container">
          <div className="mode-container-title">On Horizon Change Demo with client side Filtering</div>
        </div>
        <div className="time-line-container">
          <TimeLine
            data={this.state.timeLineData}
            links={this.state.links}
            onHorizonChange={this.onHorizonChange}
            selectedItem={this.state.selectedItem}
          />
        </div>
      </div>
    );
  }
}

export default App;
