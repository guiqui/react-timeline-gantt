import React, { Component } from 'react';
import Link from './Link';

export default class CreateLink extends Component<any, any> {
  init: boolean;
  lastX: number;
  lastY: number;
  constructor(props: any) {
    super(props);
    this.state = { x: this.props.start.x, y: this.props.start.y };
    this.init = false;
    this.lastX = -1;
    this.lastY = -1;
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.doMouseMove);
    document.addEventListener('mouseup', this.doMouseUp);
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.doMouseMove);
    document.removeEventListener('mouseup', this.doMouseUp);
  }

  doMouseMove = (e: { clientX: number; clientY: number; }) => {
    if (!this.init) {
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.init = true;
    }
    let newX = this.state.x + (e.clientX - this.lastX);
    let newY = this.state.y + (e.clientY - this.lastY);
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.setState({ x: newX, y: newY });
  };

  doMouseUp = (e: any) => {
    this.props.onFinishCreateLink();
  };

  render() {
    return <Link key={-1} start={{ x: this.props.start.x, y: this.props.start.y }} end={{ x: this.state.x, y: this.state.y }} />;
  }
}
