import { Component } from 'react';
export default class CreateLink extends Component<any, any> {
    init: boolean;
    lastX: number;
    lastY: number;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    doMouseMove: (e: {
        clientX: number;
        clientY: number;
    }) => void;
    doMouseUp: (e: any) => void;
    render(): JSX.Element;
}
