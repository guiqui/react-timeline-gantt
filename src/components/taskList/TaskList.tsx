import { Box } from 'grommet';
import React, { Component } from 'react';
import Config from '../../helpers/config/Config';
import { TaskRow } from './TaskRow'
export class VerticalLine extends Component<any, any>{
  constructor(props: any) {
    super(props);
  }

  render() {
    return <div className="timeLine-main-data-verticalLine" style={{ left: this.props.left }} />;
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
          top={i * (this.props.itemheight + 5)}
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
      <Box className="timeLine-side">
        <Box  
          height={'60px'}
          background="dark-2"
          elevation="small"
          pad="small"
          align="center"
          justify="center"
          direction="row">
          <div>{Config.values.taskList.title.label}</div>
        </Box>
        <Box ref={this.taskViewRef} className="timeLine-side-task-viewPort" onScroll={this.doScroll}>
          <Box className="timeLine-side-task-container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', 
            ...this.containerStyle
          }}>
            {this.renderTaskRow(data)}
          </Box>
        </Box>
      </Box>
    );
  }
}
