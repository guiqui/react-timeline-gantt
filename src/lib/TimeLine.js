import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VerticalSpliter from 'libs/components/taskList/VerticalSpliter';
import Header from 'libs/components/header/Headers';
import DataViewPort from 'libs/components/viewport/DataViewPort';
import LinkViewPort from 'libs/components/links/LinkViewPort';
import TaskList from 'libs/components/taskList/TaskList';
import Registry from 'libs/helpers/registry/Registry';
import { BUFFER_DAYS, DATA_CONTAINER_WIDTH } from 'libs/Const';
import { VIEW_MODE_DAY, VIEW_MODE_WEEK, VIEW_MODE_MONTH, VIEW_MODE_YEAR } from 'libs/Const';
import { DAY_MONTH_MODE, DAY_WEEK_MODE, DAY_DAY_MODE, DAY_YEAR_MODE } from 'libs/Const';
import DataController from 'libs/controller/DataController';
import Config from 'libs/helpers/config/Config';
import DateHelper from 'libs/helpers/DateHelper';
import './TimeLine.css';

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.dragging = false;
    this.draggingPosition = 0;
    this.dc = new DataController();
    this.dc.onHorizonChange = this.onHorizonChange;
    this.initialise = false;
    //This variable define the number of pixels the viewport can scroll till arrive to the end of the context
    this.pxToScroll = 1900;

    let dayWidth = this.getDayWidth(this.props.mode);
    Config.load(this.props.config);
    //Initialising state
    this.state = {
      currentday: 0, //Day that is in the 0px horizontal
      //nowposition is the reference position, this variable support the infinit scrolling by accumulatning scroll times and redefining the 0 position
      // if we accumulat 2 scroll to the left nowposition will be 2* DATA_CONTAINER_WIDTH
      nowposition: 0,
      startRow: 0, //
      endRow: 10,
      sideStyle: { width: 200 },
      scrollLeft: 0,
      scrollTop: 0,
      numVisibleRows: 40,
      numVisibleDays: 60,
      dayWidth: dayWidth,
      interactiveMode: false,
      taskToCreate: null,
      links: [],
      mode: this.props.mode ? this.props.mode : VIEW_MODE_MONTH,
      size: { width: 1, height: 1 },
      changingTask: null
    };
  }

  ////////////////////
  //     ON MODE    //
  ////////////////////

  getDayWidth(mode) {
    switch (mode) {
      case VIEW_MODE_DAY:
        return DAY_DAY_MODE;
      case VIEW_MODE_WEEK:
        return DAY_WEEK_MODE;
      case VIEW_MODE_MONTH:
        return DAY_MONTH_MODE;
      case VIEW_MODE_YEAR:
        return DAY_YEAR_MODE;
      default:
        return DAY_MONTH_MODE;
    }
  }

  ////////////////////
  //     ON SIZE    //
  ////////////////////

  onSize = (size) => {
    //If size has changed
    this.calculateVerticalScrollVariables(size);
    if (!this.initialise) {
      this.dc.initialise(
        this.state.scrollLeft + this.state.nowposition,
        this.state.scrollLeft + this.state.nowposition + size.width,
        this.state.nowposition,
        this.state.dayWidth
      );
      this.initialise = true;
    }
    this.setStartEnd();
    let newNumVisibleRows = Math.ceil(size.height / this.props.itemheight);
    let newNumVisibleDays = this.calcNumVisibleDays(size);
    let rowInfo = this.calculateStartEndRows(newNumVisibleRows, this.props.data, this.state.scrollTop);
    this.setState({
      numVisibleRows: newNumVisibleRows,
      numVisibleDays: newNumVisibleDays,
      startRow: rowInfo.start,
      endRow: rowInfo.end,
      size: size
    });
  };

  /////////////////////////
  //   VIEWPORT CHANGES  //
  /////////////////////////

  verticalChange = (scrollTop) => {
    if (scrollTop == this.state.scrollTop) return;
    //Check if we have scrolling rows
    let rowInfo = this.calculateStartEndRows(this.state.numVisibleRows, this.props.data, scrollTop);
    if (rowInfo.start !== this.state.start) {
      this.setState(
       {
          scrollTop: scrollTop,
          startRow: rowInfo.start,
          endRow: rowInfo.end
        }
      );
    }
  };

  calculateStartEndRows = (numVisibleRows, data, scrollTop) => {
    let new_start = Math.trunc(scrollTop / this.props.itemheight);
    let new_end = new_start + numVisibleRows >= data.length ? data.length : new_start + numVisibleRows;
    return { start: new_start, end: new_end };
  };

  setStartEnd = () => {
    this.dc.setStartEnd(this.state.scrollLeft, this.state.scrollLeft + this.state.size.width, this.state.nowposition, this.state.dayWidth);
  };

  horizontalChange = (newScrollLeft) => {
    let new_nowposition = this.state.nowposition;
    let new_left = -1;
    let headerData = this.state.headerData;
    let new_startRow = this.state.startRow;
    let new_endRow = this.state.endRow;

    //Calculating if we need to roll up the scroll
    if (newScrollLeft > this.pxToScroll) {
      //ContenLegnth-viewportLengt
      new_nowposition = this.state.nowposition - this.pxToScroll;
      new_left = 0;
    } else {
      if (newScrollLeft <= 0) {
        //ContenLegnth-viewportLengt
        new_nowposition = this.state.nowposition + this.pxToScroll;
        new_left = this.pxToScroll;
      } else {
        new_left = newScrollLeft;
      }
    }

    //Get the day of the left position
    let currentIndx = Math.trunc((newScrollLeft - this.state.nowposition) / this.state.dayWidth);

    //Calculate rows to render
    new_startRow = Math.trunc(this.state.scrollTop / this.props.itemheight);
    new_endRow =
      new_startRow + this.state.numVisibleRows >= this.props.data.length
        ? this.props.data.length - 1
        : new_startRow + this.state.numVisibleRows;
    //If we need updates then change the state and the scroll position
    //Got you
    this.setStartEnd();
    this.setState(
       {
        currentday: currentIndx,
        nowposition: new_nowposition,
        headerData: headerData,
        scrollLeft: new_left,
        startRow: new_startRow,
        endRow: new_endRow
      }
    );
  };

  calculateVerticalScrollVariables = (size) => {
    //The pixel to scroll verically is equal to the pecentage of what the viewport represent in the context multiply by the context width
    this.pxToScroll = (1 - size.width / DATA_CONTAINER_WIDTH) * DATA_CONTAINER_WIDTH - 1;
  };

  onHorizonChange = (lowerLimit, upLimit) => {
    if (this.props.onHorizonChange) this.props.onHorizonChange(lowerLimit, upLimit);
  };

  /////////////////////
  //   MOUSE EVENTS  //
  /////////////////////

  doMouseDown = (e) => {
    this.dragging = true;
    this.draggingPosition = e.clientX;
  };
  doMouseMove = (e) => {
    if (this.dragging) {
      let delta = this.draggingPosition - e.clientX;

      if (delta !== 0) {
        this.draggingPosition = e.clientX;
        this.horizontalChange(this.state.scrollLeft + delta);
      }
    }
  };
  doMouseUp = (e) => {
    this.dragging = false;
  };
  doMouseLeave = (e) => {
    // if (!e.relatedTarget.nodeName)
    //     this.dragging=false;
    this.dragging = false;
  };

  doTouchStart = (e) => {
    this.dragging = true;
    this.draggingPosition = e.touches[0].clientX;
  };
  doTouchEnd = (e) => {
    this.dragging = false;
  };
  doTouchMove = (e) => {
    if (this.dragging) {
      let delta = this.draggingPosition - e.touches[0].clientX;

      if (delta !== 0) {
        this.draggingPosition = e.touches[0].clientX;
        this.horizontalChange(this.state.scrollLeft + delta);
      }
    }
  };
  doTouchCancel = (e) => {
    this.dragging = false;
  };

  doMouseLeave = (e) => {
    // if (!e.relatedTarget.nodeName)
    //     this.dragging=false;
    this.dragging = false;
  };

  //Child communicating states
  onTaskListSizing = (delta) => {
    this.setState((prevState) => {
      let result = { ...prevState };
      result.sideStyle = { width: result.sideStyle.width - delta };
      return result;
    });
  };

  /////////////////////
  //   ITEMS EVENTS  //
  /////////////////////

  onSelectItem = (item) => {
    if (this.props.onSelectItem && item != this.props.selectedItem) this.props.onSelectItem(item);
  };

  onStartCreateLink = (task, position) => {
    console.log(`Start Link ${task}`);
    this.setState({
      interactiveMode: true,
      taskToCreate: { task: task, position: position }
    });
  };

  onFinishCreateLink = (task, position) => {
    console.log(`End Link ${task}`);
    if (this.props.onCreateLink && task &&
      this.state.taskToCreate && this.state.taskToCreate.task.id != task.id) {
      this.props.onCreateLink({
        start: this.state.taskToCreate,
        end: { task: task, position: position }
      });
    }
    this.setState({
      interactiveMode: false,
      taskToCreate: null
    });
  };

  onTaskChanging = (changingTask) => {
    this.setState({
      changingTask: changingTask
    });
  };

  calcNumVisibleDays = (size) => {
    return Math.ceil(size.width / this.state.dayWidth) + BUFFER_DAYS;
  };
  checkMode() {
    if (this.props.mode != this.state.mode && this.props.mode) {
      this.state.mode = this.props.mode;
      let newDayWidth = this.getDayWidth(this.state.mode);
      this.state.dayWidth = newDayWidth;
      this.state.numVisibleDays = this.calcNumVisibleDays(this.state.size);
      //to recalculate the now position we have to see how mwny scroll has happen
      //to do so we calculate the diff of days between current day and now
      //And we calculate how many times we have scroll
      let scrollTime = Math.ceil((-this.state.currentday * this.state.dayWidth) / this.pxToScroll);
      //We readjust now postion to the new number of scrolls
      this.state.nowposition = scrollTime * this.pxToScroll;
      let scrollLeft = (this.state.currentday * this.state.dayWidth + this.state.nowposition) % this.pxToScroll;
      // we recalculate the new scroll Left value
      this.state.scrollLeft = scrollLeft;
    }
  }
  checkNeeeData = () => {
    if (this.props.data != this.state.data) {
      this.state.data = this.props.data;
      let rowInfo = this.calculateStartEndRows(this.state.numVisibleRows, this.props.data, this.state.scrollTop);
      this.state.startRow = rowInfo.start;
      this.state.endRow = rowInfo.end;
      Registry.registerData(this.state.data);
    }
    if (this.props.links != this.state.links) {
      this.state.links = this.props.links;
      Registry.registerLinks(this.props.links);
    }
  };
  render() {
    this.checkMode();
    this.checkNeeeData();
    console.log('On render')
    if(!this.state.size){
      console.log(this.state)
    }
    return (
      <div className="timeLine">
        <div className="timeLine-side-main" style={this.state.sideStyle}>
          <TaskList
            ref="taskViewPort"
            itemheight={this.props.itemheight}
            startRow={this.state.startRow}
            endRow={this.state.endRow}
            data={this.props.data}
            selectedItem={this.props.selectedItem}
            onSelectItem={this.onSelectItem}
            onUpdateTask={this.props.onUpdateTask}
            onScroll={this.verticalChange}
            nonEditable={this.props.nonEditableName}
          />
          <VerticalSpliter onTaskListSizing={this.onTaskListSizing} />
        </div>
        <div className="timeLine-main">
          <Header
            headerData={this.state.headerData}
            numVisibleDays={this.state.numVisibleDays}
            currentday={this.state.currentday}
            nowposition={this.state.nowposition}
            dayWidth={this.state.dayWidth}
            mode={this.state.mode}
            scrollLeft={this.state.scrollLeft}
          />
          <DataViewPort
            ref="dataViewPort"
            scrollLeft={this.state.scrollLeft}
            scrollTop={this.state.scrollTop}
            itemheight={this.props.itemheight}
            nowposition={this.state.nowposition}
            startRow={this.state.startRow}
            endRow={this.state.endRow}
            data={this.props.data}
            selectedItem={this.props.selectedItem}
            dayWidth={this.state.dayWidth}
            onScroll={this.scrollData}
            onMouseDown={this.doMouseDown}
            onMouseMove={this.doMouseMove}
            onMouseUp={this.doMouseUp}
            onMouseLeave={this.doMouseLeave}
            onTouchStart={this.doTouchStart}
            onTouchMove={this.doTouchMove}
            onTouchEnd={this.doTouchEnd}
            onTouchCancel={this.doTouchCancel}
            onSelectItem={this.onSelectItem}
            onUpdateTask={this.props.onUpdateTask}
            onTaskChanging={this.onTaskChanging}
            onStartCreateLink={this.onStartCreateLink}
            onFinishCreateLink={this.onFinishCreateLink}
            boundaries={{
              lower: this.state.scrollLeft,
              upper: this.state.scrollLeft + this.state.size.width
            }}
            onSize={this.onSize}
          />
          <LinkViewPort
            scrollLeft={this.state.scrollLeft}
            scrollTop={this.state.scrollTop}
            startRow={this.state.startRow}
            endRow={this.state.endRow}
            data={this.props.data}
            nowposition={this.state.nowposition}
            dayWidth={this.state.dayWidth}
            interactiveMode={this.state.interactiveMode}
            taskToCreate={this.state.taskToCreate}
            onFinishCreateLink={this.onFinishCreateLink}
            changingTask={this.state.changingTask}
            selectedItem={this.props.selectedItem}
            onSelectItem={this.onSelectItem}
            itemheight={this.props.itemheight}
            onSelectItem={this.onSelectItem}
            links={this.props.links}
          />
        </div>
      </div>
    );
  }
}

TimeLine.propTypes = {
  itemheight: PropTypes.number.isRequired,
  dayWidth: PropTypes.number.isRequired,
  nonEditableName: PropTypes.bool
};

TimeLine.defaultProps = {
  itemheight: 20,
  dayWidth: 24,
  nonEditableName: false
};

export default TimeLine;
