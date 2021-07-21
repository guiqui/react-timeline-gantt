import React, { PureComponent, useContext, useRef } from 'react';
import moment from 'moment';
import { BUFFER_DAYS, DATA_CONTAINER_WIDTH } from '../../Const';
import { VIEW_MODE_DAY, VIEW_MODE_WEEK, VIEW_MODE_MONTH, VIEW_MODE_YEAR } from '../../Const';
import { Box } from 'grommet'
import Config from '../../helpers/config/Config';
import DateHelper from '../../helpers/DateHelper';
import './Header.css';
import { HeaderItem } from './HeaderItem';
import { TimelineContext } from '../../context';
import { BackgroundStripe } from './BackgroundStripe'

export interface HeaderProps {
  nowposition?: number;
  scrollLeft?: number;
  currentday?: number;
  mode?: string;
  dayWidth?: number;
  currentDate?: Date;
  numVisibleDays?: number;
  headerData?: any;
  currentPosition?: {x: number, y: number};
}

const Header : React.FC<HeaderProps> = (props) => {
  const headerRef = useRef<HTMLDivElement>(null)

  const { mode, dayWidth } = useContext(TimelineContext)
  
  const getFormat = (mode: string, position?: string) => {
    switch (mode) {
      case 'year':
        return 'YYYY';
      case 'month':
        if (position == 'top') return 'MMMM YYYY';
        else return 'MMMM';
      case 'week':
        if (position == 'top') return 'ww MMMM YYYY';
        else return 'ww';
      case 'dayweek':
        return 'dd';
      case 'daymonth':
        return 'D';
    }
  }

  const getModeIncrement = (date : any, mode : string) => {
    switch (mode) {
      case 'year':
        return DateHelper.daysInYear(date.year());
      case 'month':
        return date.daysInMonth();
      case 'week':
        return 7;
      default:
        return 1;
    }
  }

  //TODO mode
 const getStartDate = (date: moment.Moment, mode: string) => {
    let year = null;
    switch (mode) {
      case 'year':
        year = date.year();
        return moment([year, 0, 1]);
      case 'month':
        year = date.year();
        let month = date.month();
        return moment([year, month, 1]);
      case 'week':
        return date.clone().startOf('week');
      default:
        return date;
    }
  };

  //TODO change mode type to timeline mode (also make timeline mode dynamic)
  const renderTime = (left: number, width: number, mode: string, key: any ) => {
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

  //TODO make mode timelinemode
  const getBox = (date: moment.Moment, mode: string, lastLeft: number = 0) => {
    let increment = getModeIncrement(date, mode) * (dayWidth || 0);
    if (!lastLeft) {
      let starDate = getStartDate(date, mode);
      starDate = starDate.startOf('day');
      let now = moment().startOf('day');
      let daysInBetween = starDate.diff(now, 'days');
      lastLeft = DateHelper.dayToPosition(daysInBetween, (props.nowposition||0), (dayWidth|| 0));
    }

    return { left: lastLeft, width: increment };
  }

  //TODO change type to enum of options
  const renderHeaderRows = (top : string, middle: string, bottom: string) => {
    let result : any = { top: [], middle: [], bottom: [], background: [] };
    let lastLeft : any = {};
    let currentTop = '';
    let currentMiddle = '';
    let currentBottom = '';
    let currentDate = null;
    let box : any = null;

    let start = props.currentday;
    let end =( props.currentday || 0) + (props.numVisibleDays||0);

    for (let i = (start||0) - BUFFER_DAYS; i < end + BUFFER_DAYS; i++) {
      //The unit of iteration is day
      currentDate = moment().add(i, 'days');
      if (currentTop != currentDate.format(getFormat(top, 'top'))) {
        currentTop = currentDate.format(getFormat(top, 'top'));
        box = getBox(currentDate, top, lastLeft.top);
        lastLeft.top = box.left + box.width;
        result.top.push(<HeaderItem key={i} left={box.left} width={box.width} label={currentTop} />);
      }

      if (currentMiddle != currentDate.format(getFormat(middle))) {
        currentMiddle = currentDate.format(getFormat(middle));
        box = getBox(currentDate, middle, lastLeft.middle);
        lastLeft.middle = box.left + box.width;
        result.middle.push(<HeaderItem key={i} left={box.left} width={box.width} label={currentMiddle} />);
      }

      if (currentBottom != currentDate.format(getFormat(bottom))) {
        currentBottom = currentDate.format(getFormat(bottom));
        box = getBox(currentDate, bottom, lastLeft.bottom);
        lastLeft.bottom = box.left + box.width;
        if (bottom == 'shorttime' || bottom == 'fulltime') {
          let stripes = Array.apply(null, Array(24)).map(function () {}).map((x, ix) => (
            <BackgroundStripe key={`tile-${i}-${ix}`} background={ix % 2 == 0 ? '#5d9634' : '#538c2b'} left={box.left + ((box.width / 24) * ix)} width={box.width / 24} />
          ))
          result.background.push(stripes)
          result.bottom.push(renderTime(box.left, box.width, bottom, i));
        } else {
          result.background.push(<BackgroundStripe key={`tile-${i}`} left={box.left} width={box.width} background={i % 2 == 0 ? '#5d9634' : '#538c2b'} />)
          result.bottom.push(<HeaderItem key={i} left={box.left} width={box.width} label={currentBottom} />);
        }

        
      }
    }

    return (
      <div className="timeLine-main-header-container" style={{ width: DATA_CONTAINER_WIDTH, maxWidth: DATA_CONTAINER_WIDTH }}>
        <div className="header-top" style={{ ...Config.values.header.top.style as any }}>
          {result.top}
        </div>
        <div className="header-middle" style={{ ...Config.values.header.middle.style }}>
          {result.middle}
        </div>
        <div className="header-bottom" style={{ ...Config.values.header.bottom.style }}>
          {result.bottom}
        </div>
        <div className="header-bottom" style={{height: '100%', ...Config.values.header.bottom.style}}>
          {result.background}
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    switch (mode || props.mode) {
      case VIEW_MODE_DAY:
        return renderHeaderRows('week', 'dayweek', 'fulltime');
      case VIEW_MODE_WEEK:
        return renderHeaderRows('month', 'week', 'dayweek');
      case VIEW_MODE_MONTH:
        return renderHeaderRows('month', 'dayweek', 'daymonth');
      case VIEW_MODE_YEAR:
        return renderHeaderRows('year', 'month', 'week');
    }
  };

  /*
  const setBoundaries = () => {
    this.start = this.props.currentday - BUFFER_DAYS;
    this.end = this.props.currentday + this.props.numVisibleDays + BUFFER_DAYS;
  };

  const needToRender = () => {
    return this.props.currentday < this.start || this.props.currentday + this.props.numVisibleDays > this.end;
  };*/

    if (headerRef.current) headerRef.current.scrollLeft = (props.scrollLeft||0);
    //Check boundaries to see if wee need to recalcualte header
    // if (this.needToRender()|| !this.cache){
    //     this.cache=this.renderHeader();
    //     this.setBoundaries();
    // }
    return (
      <div id="timeline-header" ref={headerRef} className="timeLine-main-header-viewPort">
        {renderHeader()}
      </div>
    );
  
}

export default Header;
