import React, { Component } from 'react';
import { DATA_CONTAINER_WIDTH } from 'libs/Const';
import DataTask from 'libs/components/viewport/DataTask';
import DateHelper from 'libs/helpers/DateHelper';
import sizeMe from 'react-sizeme';
import Config from 'libs/helpers/config/Config';
import Registry from 'libs/helpers/registry/Registry';

export class DataRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="timeLine-main-data-row"
        style={{ ...Config.values.dataViewPort.rows.style, top: this.props.top, height: this.props.itemheight }}
      >
        {this.props.children}
      </div>
    );
  }
}

export class DataViewPort extends Component {
  constructor(props) {
    super(props);
    this.childDragging = false;
  }
  getContainerHeight(rows) {
    let new_height = rows > 0 ? rows * this.props.itemheight : 10;
    return new_height;
  }
  onChildDrag = (dragging) => {
    this.childDragging = dragging;
  };

  renderRows = () => {
    let result = [];
    const groups = Registry.groupData(this.props.data, this.props.startRow, this.props.endRow + 1);

    Object.keys(groups).forEach((key, i) => {
      const group = groups[key];
      result.push(
        <DataRow key={key} label={key} top={i * this.props.itemheight} left={20} itemheight={this.props.itemheight}>
          {
            group.map(item => {
              let new_position = DateHelper.dateToPixel(item.start, this.props.nowposition, this.props.dayWidth);
              let new_width = DateHelper.dateToPixel(item.end, this.props.nowposition, this.props.dayWidth) - new_position;
              return <DataTask
                key={item.id}
                item={item}
                label={item.name}
                nowposition={this.props.nowposition}
                dayWidth={this.props.dayWidth}
                color={item.color}
                left={new_position}
                width={new_width}
                height={this.props.itemheight}
                onChildDrag={this.onChildDrag}
                isSelected={this.props.selectedItem == item}
                onSelectItem={this.props.onSelectItem}
                onStartCreateLink={this.props.onStartCreateLink}
                onFinishCreateLink={this.props.onFinishCreateLink}
                onTaskChanging={this.props.onTaskChanging}
                onUpdateTask={this.props.onUpdateTask}
              >
                {' '}
              </DataTask>
            })
          }
        </DataRow>
      );
    });
    return result;
  };

  doMouseDown = (e) => {
    if (e.button === 0 && !this.childDragging) {
      this.props.onMouseDown(e);
    }
  };
  doMouseMove = (e) => {
    this.props.onMouseMove(e, this.refs.dataViewPort);
  };

  doTouchStart = (e) => {
    if (!this.childDragging) {
      this.props.onTouchStart(e);
    }
  };
  doTouchMove = (e) => {
    this.props.onTouchMove(e, this.refs.dataViewPort);
  };

  componentDidMount() {
    this.refs.dataViewPort.scrollLeft = 0;
  }

  render() {
    if (this.refs.dataViewPort) {
      this.refs.dataViewPort.scrollLeft = this.props.scrollLeft;
      this.refs.dataViewPort.scrollTop = this.props.scrollTop;
    }

    let height = this.getContainerHeight(this.props.data.length);
    return (
      <div
        ref="dataViewPort"
        id="timeLinedataViewPort"
        className="timeLine-main-data-viewPort"
        onMouseDown={this.doMouseDown}
        onMouseMove={this.doMouseMove}
        onMouseUp={this.props.onMouseUp}
        onMouseLeave={this.props.onMouseLeave}
        onTouchStart={this.doTouchStart}
        onTouchMove={this.doTouchMove}
        onTouchEnd={this.props.onTouchEnd}
        onTouchCancel={this.props.onTouchCancel}
      >
        <div
          className="timeLine-main-data-container"
          style={{ height: height, width: DATA_CONTAINER_WIDTH, maxWidth: DATA_CONTAINER_WIDTH }}
        >
          {this.renderRows()}
        </div>
      </div>
    );
  }
}

export default sizeMe({ monitorWidth: true, monitorHeight: true })(DataViewPort);
