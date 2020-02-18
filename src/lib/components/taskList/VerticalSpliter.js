import React, { Component } from 'react';
import Config from 'libs/helpers/config/Config';
export default class VerticalSpliter extends Component {
  constructor(props) {
    super(props);
    this.doMouseMove = this.doMouseMove.bind(this);
    this.doMouseDown = this.doMouseDown.bind(this);
    this.doMouseUp = this.doMouseUp.bind(this);
    this.state = { dragging: false };
  }

  doMouseDown(e) {
    if (e.button === 0) {
      this.draggingPosition = e.clientX;
      this.setState({ dragging: true });
    }
  }

  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.doMouseMove);
      document.addEventListener('mouseup', this.doMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.doMouseMove);
      document.removeEventListener('mouseup', this.doMouseUp);
    }
  }

  doMouseMove(e) {
    if (this.state.dragging) {
      e.stopPropagation();
      let delta = this.draggingPosition - e.clientX;
      this.draggingPosition = e.clientX;
      this.props.onTaskListSizing(delta);
    }
  }

  doMouseUp(e) {
    this.setState({ dragging: false });
  }

  render() {
    return (
      <div className="verticalResizer" style={Config.values.taskList.verticalSeparator.style} onMouseDown={this.doMouseDown}>
        <div className="squareGrip" style={Config.values.taskList.verticalSeparator.grip.style}></div>
        <div className="squareGrip" style={Config.values.taskList.verticalSeparator.grip.style}></div>
        <div className="squareGrip" style={Config.values.taskList.verticalSeparator.grip.style}></div>
        <div className="squareGrip" style={Config.values.taskList.verticalSeparator.grip.style}></div>
      </div>
    );
  }
}
