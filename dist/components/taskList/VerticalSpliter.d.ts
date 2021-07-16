import { Component } from 'react';
export default class VerticalSpliter extends Component<any, any> {
    draggingPosition: any;
    constructor(props: any);
    doMouseDown(e: {
        button: number;
        clientX: any;
    }): void;
    componentDidUpdate(props: any, state: {
        dragging: any;
    }): void;
    doMouseMove(e: {
        stopPropagation: () => void;
        clientX: number;
    }): void;
    doMouseUp(e: any): void;
    render(): JSX.Element;
}
