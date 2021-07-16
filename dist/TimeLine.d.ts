import { Component } from 'react';
import PropTypes from 'prop-types';
import './TimeLine.css';
declare class TimeLine extends Component<any, any> {
    dragging: boolean;
    draggingPosition: number;
    dc: any;
    initialise: boolean;
    pxToScroll: number;
    scrollData: any;
    static propTypes: {
        itemheight: PropTypes.Validator<number>;
        dayWidth: PropTypes.Validator<number>;
        nonEditableName: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        itemheight: number;
        dayWidth: number;
        nonEditableName: boolean;
    };
    constructor(props: any);
    getDayWidth(mode: any): 4 | 24 | 20 | 1440;
    onSize: (size: {
        width: any;
        height: number;
    }) => void;
    verticalChange: (scrollTop: any) => void;
    calculateStartEndRows: (numVisibleRows: number, data: string | any[], scrollTop: number) => {
        start: number;
        end: number;
    };
    setStartEnd: () => void;
    horizontalChange: (newScrollLeft: number) => void;
    calculateVerticalScrollVariables: (size: {
        width: number;
    }) => void;
    onHorizonChange: (lowerLimit: any, upLimit: any) => void;
    doMouseDown: (e: {
        clientX: number;
    }) => void;
    doMouseMove: (e: {
        clientX: number;
    }) => void;
    doMouseUp: (e: any) => void;
    doMouseLeave: (e: any) => void;
    doTouchStart: (e: {
        touches: {
            clientX: number;
        }[];
    }) => void;
    doTouchEnd: (e: any) => void;
    doTouchMove: (e: {
        touches: {
            clientX: number;
        }[];
    }) => void;
    doTouchCancel: (e: any) => void;
    onTaskListSizing: (delta: number) => void;
    onSelectItem: (item: any) => void;
    onStartCreateLink: (task: any, position: any) => void;
    onFinishCreateLink: (task: {
        id: any;
    }, position: any) => void;
    onTaskChanging: (changingTask: any) => void;
    calcNumVisibleDays: (size: {
        width: number;
    }) => number;
    checkMode(): void;
    checkNeeeData: () => void;
    render(): JSX.Element;
}
export default TimeLine;
