import React, { Component } from 'react';
export interface DataTaskProps {
    dayWidth?: number;
    item?: any;
    label?: any;
    left?: number;
    width?: number;
    onStartCreateLink?: (item: any, pos: any) => void;
    onChildDrag?: any;
    onTaskChanging?: any;
    onFinishCreateLink?: any;
    onUpdateTask?: any;
    isSelected?: boolean;
    color?: any;
    onSelectItem?: any;
    height?: any;
    nowposition?: any;
}
export interface DataTaskState {
    dragging: boolean;
    left: number;
    width: number;
    mode: any;
}
export default class DataTask extends Component<DataTaskProps, DataTaskState> {
    draggingPosition: any;
    constructor(props: DataTaskProps);
    onCreateLinkMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, position: string) => void;
    onCreateLinkMouseUp: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, position: any) => void;
    onCreateLinkTouchStart: (e: React.TouchEvent<HTMLDivElement>, position: string) => void;
    onCreateLinkTouchEnd: (e: React.TouchEvent<HTMLDivElement>, position: any) => void;
    componentDidUpdate(props: any, state: {
        dragging: any;
    }): void;
    updatePosition(): void;
    dragStart(x: any, mode: any): void;
    dragProcess(x: number): void;
    dragEnd(): void;
    doMouseDown: (e: React.MouseEvent<HTMLDivElement>, mode: number) => void;
    doMouseMove: (e: MouseEvent) => void;
    doMouseUp: () => void;
    doTouchStart: (e: React.TouchEvent<HTMLDivElement>, mode: number) => void;
    doTouchMove: (e: any) => void;
    doTouchEnd: (e: any) => void;
    calculateStyle(): any;
    render(): JSX.Element;
}
