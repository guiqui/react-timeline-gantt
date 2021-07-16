import React, { Component } from 'react';
import DateHelper from '../../helpers/DateHelper';
import { MODE_NONE, MODE_MOVE, MOVE_RESIZE_LEFT, MOVE_RESIZE_RIGHT } from '../../Const';
import { LINK_POS_LEFT, LINK_POS_RIGHT } from '../../Const';
import Config from '../../helpers/config/Config';

export default class DataTask extends Component<any, any> {
  draggingPosition: any;
  constructor(props: any) {
    super(props);
    this.calculateStyle = this.calculateStyle.bind(this);
    this.state = { dragging: false, left: this.props.left, width: this.props.width, mode: MODE_NONE };
  }

  onCreateLinkMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, position: string) => {
    if (e.button === 0) {
      e.stopPropagation();
      this.props.onStartCreateLink(this.props.item, position);
    }
  };
  onCreateLinkMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, position: any) => {
    e.stopPropagation();
    this.props.onFinishCreateLink(this.props.item, position);
  };
  onCreateLinkTouchStart = (e: React.TouchEvent<HTMLDivElement>, position: string) => {
    e.stopPropagation();
    this.props.onStartCreateLink(this.props.item, position);
  };
  onCreateLinkTouchEnd = (e: React.TouchEvent<HTMLDivElement>, position: any) => {
    e.stopPropagation();
    this.props.onFinishCreateLink(this.props.item, position);
  };

  componentDidUpdate(props: any, state: { dragging: any; }) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.doMouseMove);
      document.addEventListener('mouseup', this.doMouseUp);
      document.addEventListener('touchmove', this.doTouchMove);
      document.addEventListener('touchend', this.doTouchEnd);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.doMouseMove);
      document.removeEventListener('mouseup', this.doMouseUp);
      document.removeEventListener('touchmove', this.doTouchMove);
      document.removeEventListener('touchend', this.doTouchEnd);
    }
  }

  dragStart(x: any, mode: any) {
    this.props.onChildDrag(true);
    this.draggingPosition = x;
    this.setState({
      dragging: true,
      mode: mode,
      left: this.props.left,
      width: this.props.width
    });
  }
  dragProcess(x: number) {
    let delta = this.draggingPosition - x;
    let newLeft = this.state.left;
    let newWidth = this.state.width;

    switch (this.state.mode) {
      case MODE_MOVE:
        newLeft = this.state.left - delta;
        break;
      case MOVE_RESIZE_LEFT:
        newLeft = this.state.left - delta;
        newWidth = this.state.width + delta;
        break;
      case MOVE_RESIZE_RIGHT:
        newWidth = this.state.width - delta;
        break;
    }
    //the coordinates need to be global
    let changeObj = {
      item: this.props.item,
      position: { start: newLeft - this.props.nowposition, end: newLeft + newWidth - this.props.nowposition }
    };
    this.props.onTaskChanging(changeObj);
    this.setState({ left: newLeft, width: newWidth });
    this.draggingPosition = x;
  }
  dragEnd() {
    this.props.onChildDrag(false);
    let new_start_date = DateHelper.pixelToDate(this.state.left, this.props.nowposition, this.props.dayWidth);
    let new_end_date = DateHelper.pixelToDate(this.state.left + this.state.width, this.props.nowposition, this.props.dayWidth);
    this.props.onUpdateTask(this.props.item, { start: new_start_date, end: new_end_date });
    this.setState({ dragging: false, mode: MODE_NONE });
  }

  doMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, mode: number) => {
    if (!this.props.onUpdateTask) return;
    if (e.button === 0) {
      e.stopPropagation();
      this.dragStart(e.clientX, mode);
    }
  };
  doMouseMove = (e: { stopPropagation: () => void; clientX: any; }) => {
    if (this.state.dragging) {
      e.stopPropagation();
      this.dragProcess(e.clientX);
    }
  };
  doMouseUp = () => {
    this.dragEnd();
  };

  doTouchStart = (e: React.TouchEvent<HTMLDivElement>, mode: number) => {
    if (!this.props.onUpdateTask) return;
    console.log('start');
    e.stopPropagation();
    this.dragStart(e.touches[0].clientX, mode);
  };
  doTouchMove = (e: any) => {
    if (this.state.dragging) {
      console.log('move');
      e.stopPropagation();
      this.dragProcess(e.changedTouches[0].clientX);
    }
  };
  doTouchEnd = (e: any) => {
    console.log('end');
    this.dragEnd();
  };

  calculateStyle() {
    let configStyle = this.props.isSelected ? Config.values.dataViewPort.task.selectedStyle : Config.values.dataViewPort.task.style;
    let backgroundColor = this.props.color ? this.props.color : configStyle.backgroundColor;

    if (this.state.dragging) {
      return {
        ...configStyle,
        backgroundColor: backgroundColor,
        left: this.state.left,
        width: this.state.width,
        height: this.props.height - 5,
        top: 2
      };
    } else {
      return { ...configStyle, backgroundColor, left: this.props.left, width: this.props.width, height: this.props.height - 5, top: 2 };
    }
  }
  render() {
    let style = this.calculateStyle();
    return (
      <div
        onMouseDown={(e) => this.doMouseDown(e, MODE_MOVE)}
        onTouchStart={(e) => this.doTouchStart(e, MODE_MOVE)}
        onClick={(e) => {
          this.props.onSelectItem(this.props.item);
        }}
        style={style}
      >
        <div
          className="timeLine-main-data-task-side"
          style={{ top: 0, left: -4, height: style.height }}
          onMouseDown={(e) => this.doMouseDown(e, MOVE_RESIZE_LEFT)}
          onTouchStart={(e) => this.doTouchStart(e, MOVE_RESIZE_LEFT)}
        >
          <div
            className="timeLine-main-data-task-side-linker"
            onMouseUp={(e) => this.onCreateLinkMouseUp(e, LINK_POS_LEFT)}
            onTouchEnd={(e) => this.onCreateLinkTouchEnd(e, LINK_POS_LEFT)}
          />
        </div>
        <div style={{ overflow: 'hidden' }}>{Config.values.dataViewPort.task.showLabel ? this.props.item.name : ''}</div>
        <div
          className="timeLine-main-data-task-side"
          style={{ top: 0, left: style.width - 3, height: style.height }}
          onMouseDown={(e) => this.doMouseDown(e, MOVE_RESIZE_RIGHT)}
          onTouchStart={(e) => this.doTouchStart(e, MOVE_RESIZE_RIGHT)}
        >
          <div
            className="timeLine-main-data-task-side-linker"
            onMouseDown={(e) => this.onCreateLinkMouseDown(e, LINK_POS_RIGHT)}
            onTouchStart={(e) => this.onCreateLinkTouchStart(e, LINK_POS_RIGHT)}
          />
        </div>
      </div>
    );
  }
}
