import React, { PureComponent } from 'react';
import { BUFFER_DAYS, DATA_CONTAINER_WIDTH } from 'libs/Const';
import { VIEW_MODE_DAY, VIEW_MODE_WEEK, VIEW_MODE_MONTH, VIEW_MODE_YEAR } from 'libs/Const';
import Config from 'libs/helpers/config/Config';
import DateHelper from 'libs/helpers/DateHelper';
import './Header.css';
import { startOfWeek, startOfMonth, startOfYear, format, addDays, getDaysInMonth, startOfDay, differenceInCalendarDays } from 'date-fns';

export class HeaderItem extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderLeft: 'solid 1px white',
          position: 'absolute',
          height: 20,
          left: this.props.left,
          width: this.props.width
        }}
      >
        <div>{this.props.label}</div>
      </div>
    );
  }
}

export default class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.setBoundaries();
  }

  getFormat(mode, position) {
    switch (mode) {
      case 'year':
        return 'yyyy';
      case 'month':
        if (position == 'top') return 'mmmm yyyy';
        else return 'mmmm';
      case 'week':
        if (position == 'top') return 'ww mmmm yyyy';
        else return 'ww';
      case 'dayweek':
        return 'dd';
      case 'daymonth':
        return 'd';
    }
  }

  getModeIncrement(date, mode) {
    switch (mode) {
      case 'year':
        return DateHelper.daysInYear(date.year());
      case 'month':
        return getDaysInMonth(date);
      case 'week':
        return 7;
      default:
        return 1;
    }
  }

  getStartDate = (date, mode) => {
    switch (mode) {
      case 'year':
        return startOfYear(date);
      case 'month':
        return startOfMonth(date);
      case 'week':
        return startOfWeek(date)
      default:
        return date;
    }
  };

  renderTime = (left, width, mode, key) => {
    let result = [];
    let hourWidth = width / 24;
    let iterLeft = 0;
    for (let i = 0; i < 24; i++) {
      result.push(<HeaderItem key={i} left={iterLeft} width={hourWidth} label={mode == 'shorttime' ? i : `${i}:00`} />);
      iterLeft = iterLeft + hourWidth;
    }
    return (
      <div key={key} style={{ position: 'absolute', height: 20, left: left, width: width }}>
        {' '}
        {result}
      </div>
    );
  };
  getBox(date, mode, lastLeft) {
    let increment = this.getModeIncrement(date, mode) * this.props.dayWidth;
    if (!lastLeft) {
      let starDate = this.getStartDate(date, mode);
      starDate = startOfDay(starDate);
      let now = startOfDay(new Date());
      let daysInBetween = differenceInCalendarDays(starDate, now);
      lastLeft = DateHelper.dayToPosition(daysInBetween, this.props.nowposition, this.props.dayWidth);
    }

    return { left: lastLeft, width: increment };
  }

  renderHeaderRows = (top, middle, bottom) => {
    let result = { top: [], middle: [], bottom: [] };
    let lastLeft = {};
    let currentTop = '';
    let currentMiddle = '';
    let currentBottom = '';
    let currentDate = null;
    let box = null;

    let start = this.props.currentday;
    let end = this.props.currentday + this.props.numVisibleDays;

    for (let i = start - BUFFER_DAYS; i < end + BUFFER_DAYS; i++) {
      //The unit of iteration is day
      currentDate = addDays(new Date(), i);
      if (currentTop != format(currentDate, this.getFormat(top, 'top'))) {
        currentTop = format(currentDate, this.getFormat(top, 'top'));
        box = this.getBox(currentDate, top, lastLeft.top);
        lastLeft.top = box.left + box.width;
        result.top.push(<HeaderItem key={i} left={box.left} width={box.width} label={currentTop} />);
      }

      if (currentMiddle != format(currentDate, this.getFormat(middle))) {
        currentMiddle = format(currentDate, this.getFormat(middle));
        box = this.getBox(currentDate, middle, lastLeft.middle);
        lastLeft.middle = box.left + box.width;
        result.middle.push(<HeaderItem key={i} left={box.left} width={box.width} label={currentMiddle} />);
      }

      if (currentBottom != format(currentDate, this.getFormat(bottom))) {
        currentBottom = format(currentDate, this.getFormat(bottom));
        box = this.getBox(currentDate, bottom, lastLeft.bottom);
        lastLeft.bottom = box.left + box.width;
        if (bottom == 'shorttime' || bottom == 'fulltime') {
          result.bottom.push(this.renderTime(box.left, box.width, bottom, i));
        } else {
          result.bottom.push(<HeaderItem key={i} left={box.left} width={box.width} label={currentBottom} />);
        }
      }
    }

    return (
      <div className="timeLine-main-header-container" style={{ width: DATA_CONTAINER_WIDTH, maxWidth: DATA_CONTAINER_WIDTH }}>
        <div className="header-top" style={{ ...Config.values.header.top.style }}>
          {result.top}
        </div>
        <div className="header-middle" style={{ ...Config.values.header.middle.style }}>
          {result.middle}
        </div>
        <div className="header-bottom" style={{ ...Config.values.header.bottom.style }}>
          {result.bottom}
        </div>
      </div>
    );
  };

  renderHeader = () => {
    switch (this.props.mode) {
      case VIEW_MODE_DAY:
        return this.renderHeaderRows('week', 'dayweek', 'fulltime');
      case VIEW_MODE_WEEK:
        return this.renderHeaderRows('week', 'dayweek', 'shorttime');
      case VIEW_MODE_MONTH:
        return this.renderHeaderRows('month', 'dayweek', 'daymonth');
      case VIEW_MODE_YEAR:
        return this.renderHeaderRows('year', 'month', 'week');
    }
  };

  setBoundaries = () => {
    this.start = this.props.currentday - BUFFER_DAYS;
    this.end = this.props.currentday + this.props.numVisibleDays + BUFFER_DAYS;
  };

  needToRender = () => {
    return this.props.currentday < this.start || this.props.currentday + this.props.numVisibleDays > this.end;
  };

  render() {
    if (this.refs.Header) this.refs.Header.scrollLeft = this.props.scrollLeft;
    //Check boundaries to see if wee need to recalcualte header
    // if (this.needToRender()|| !this.cache){
    //     this.cache=this.renderHeader();
    //     this.setBoundaries();
    // }
    return (
      <div id="timeline-header" ref="Header" className="timeLine-main-header-viewPort">
        {this.renderHeader()}
      </div>
    );
  }
}
