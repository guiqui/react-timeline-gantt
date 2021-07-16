import React, { Component } from 'react';
export declare class DataViewPort extends Component<any, any> {
    dataViewRef: React.RefObject<HTMLDivElement>;
    childDragging: boolean;
    constructor(props: any);
    getContainerHeight(rows: number): number;
    onChildDrag: (dragging: boolean) => void;
    renderRows: () => JSX.Element[];
    doMouseDown: (e: {
        button: number;
    }) => void;
    doMouseMove: (e: any) => void;
    doTouchStart: (e: any) => void;
    doTouchMove: (e: any) => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
declare const _default: any;
export default _default;
