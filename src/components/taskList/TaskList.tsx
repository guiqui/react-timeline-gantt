import React, { Component } from 'react';
import Config from '../../helpers/config/Config';
import ContentEditable from '../common/ContentEditable';

export class VerticalLine extends Component<any, any>{
  constructor(props: any) {
    super(props);
  }

  render() {
    return <div className="timeLine-main-data-verticalLine" style={{ left: this.props.left }} />;
  }
}

export class TaskRow extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  onChange = (value: any) => {
    if (this.props.onUpdateTask) {
      this.props.onUpdateTask(this.props.item, { name: value });
    }
  };

  render() {
    return (
      <div
        className="timeLine-side-task-row"
        style={{
          ...Config.values.taskList.task.style,
          top: this.props.top,
          height: this.props.itemheight
        }}
        onClick={(e) => this.props.onSelectItem(this.props.item)}
      >
        {this.props.nonEditable ? (
          <div tabIndex={this.props.index} style={{ width: '100%' }}>
            {this.props.label}
          </div>
        ) : (
          <ContentEditable value={this.props.label} index={this.props.index} onChange={this.onChange} />
        )}
      </div>
    );
  }
}

//Task Lis

export default class TaskList extends Component<any, any> {
  private taskViewRef = React.createRef<HTMLDivElement>()
  containerStyle?: { height: number; };

  constructor(props: any) {
    super(props);
  }

  getContainerStyle(rows: number) {
    let new_height = rows > 0 ? rows * this.props.itemheight : 10;
    return { height: new_height };
  }

  renderTaskRow(data: { [x: string]: any; }) {
    let result = [];
    for (let i = this.props.startRow; i < this.props.endRow + 1; i++) {
      let item = data[i];
      if (!item) break;
      result.push(
        <TaskRow
          key={i}
          index={i}
          item={item}
          label={item.name}
          top={i * this.props.itemheight}
          itemheight={this.props.itemheight}
          isSelected={this.props.selectedItem == item}
          onUpdateTask={this.props.onUpdateTask}
          onSelectItem={this.props.onSelectItem}
          nonEditable={this.props.nonEditable}
        />
      );
    }
    return result;
  }

  doScroll = () => {
    if(this.taskViewRef.current) this.props.onScroll(this.taskViewRef.current.scrollTop);
  };

  render() {
    let data = this.props.data ? this.props.data : [];
    this.containerStyle = this.getContainerStyle(data.length);
    return (
      <div className="timeLine-side">
        <div className="timeLine-side-title" style={Config.values.taskList.title.style}>
          <div>{Config.values.taskList.title.label}</div>
        </div>
        <div ref={this.taskViewRef} className="timeLine-side-task-viewPort" onScroll={this.doScroll}>
          <div className="timeLine-side-task-container" style={this.containerStyle}>
            {this.renderTaskRow(data)}
          </div>
        </div>
      </div>
    );
  }
}
