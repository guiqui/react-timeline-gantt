import { Component } from 'react';
export declare class VerticalLine extends Component<any, any> {
    constructor(props: any);
    render(): JSX.Element;
}
export declare class TaskRow extends Component<any, any> {
    constructor(props: any);
    onChange: (value: any) => void;
    render(): JSX.Element;
}
export default class TaskList extends Component<any, any> {
    private taskViewRef;
    containerStyle?: {
        height: number;
    };
    constructor(props: any);
    getContainerStyle(rows: number): {
        height: number;
    };
    renderTaskRow(data: {
        [x: string]: any;
    }): JSX.Element[];
    doScroll: () => void;
    render(): JSX.Element;
}
