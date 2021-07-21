export default class DataController {
    lower_limit: number;
    upper_limit: number;
    _dataToRender: never[];
    nowposition: any;
    daywidth: any;
    lower_data_limit: any;
    upper_data_limit: any;
    onHorizonChange(lowerLimit: any, upLimit: any): void;
    constructor();
    initialise: (start: any, end: any, nowposition: any, daywidth: number) => void;
    setStartEnd: (start: any, end: any, nowposition: any, daywidth: number) => void;
    needData: (start: any, end: any) => boolean;
    setLimits: (start: any, end: any) => void;
    loadDataHorizon: () => void;
}
