import React, { Component } from 'react';
export default class DataTask extends Component<any, any> {
    draggingPosition: any;
    constructor(props: any);
    onCreateLinkMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, position: string) => void;
    onCreateLinkMouseUp: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, position: any) => void;
    onCreateLinkTouchStart: (e: React.TouchEvent<HTMLDivElement>, position: string) => void;
    onCreateLinkTouchEnd: (e: React.TouchEvent<HTMLDivElement>, position: any) => void;
    componentDidUpdate(props: any, state: {
        dragging: any;
    }): void;
    dragStart(x: any, mode: any): void;
    dragProcess(x: number): void;
    dragEnd(): void;
    doMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, mode: number) => void;
    doMouseMove: (e: {
        stopPropagation: () => void;
        clientX: any;
    }) => void;
    doMouseUp: () => void;
    doTouchStart: (e: React.TouchEvent<HTMLDivElement>, mode: number) => void;
    doTouchMove: (e: any) => void;
    doTouchEnd: (e: any) => void;
    calculateStyle(): any;
    render(): JSX.Element;
}
