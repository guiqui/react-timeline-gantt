import DateHelper from '../helpers/DateHelper';
const HORIZON_BUFFER = 1000;
const HORIZON_BUFFER_ALERT = 750;

export default class DataController {
  lower_limit: number;
  upper_limit: number;
  _dataToRender: never[];
  nowposition: any;
  daywidth: any;
  lower_data_limit: any;
  upper_data_limit: any;
  onHorizonChange(lowerLimit: any, upLimit: any) {
    throw new Error('Method not implemented.');
  }
  
  constructor() {
    this.lower_limit = 0;
    this.upper_limit = 0;
    this._dataToRender = [];
  }
  initialise = (start: any, end: any, nowposition: any, daywidth: number) => {
    this.nowposition = nowposition;
    this.daywidth = daywidth;
    this.setLimits(start, end);
    this.loadDataHorizon();
  };

  //OnScroll
  setStartEnd = (start: any, end: any, nowposition: any, daywidth: number) => {
    this.nowposition = nowposition;
    this.daywidth = daywidth;
    if (this.needData(start, end)) {
      this.setLimits(start, end);
      this.loadDataHorizon();
    }
  };

  needData = (start: any, end: any) => {
    return start < this.lower_data_limit || end > this.upper_data_limit;
  };

  setLimits = (start: any, end: any) => {
    this.lower_limit = start - HORIZON_BUFFER;
    this.lower_data_limit = start - HORIZON_BUFFER_ALERT;
    this.upper_limit = end + HORIZON_BUFFER;
    this.upper_data_limit = end + HORIZON_BUFFER_ALERT;
  };

  //OnScroll
  loadDataHorizon = () => {
    let lowerLimit = DateHelper.pixelToDate(this.lower_limit, this.nowposition, this.daywidth);
    let upLimit = DateHelper.pixelToDate(this.upper_limit, this.nowposition, this.daywidth);
    this.onHorizonChange(lowerLimit, upLimit);
  };
}
