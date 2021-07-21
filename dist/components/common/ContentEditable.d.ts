import { Component } from 'react';
export default class ContentEditable extends Component<any, any> {
    private textInput;
    isFocus: boolean;
    constructor(props: any);
    componentDidUpdate(prevProps: any, prevState: any): void;
    onFocus: () => void;
    onBlur: () => void;
    handleKey: (e: {
        keyCode: any;
        which: any;
    }) => void;
    finishEditing: () => void;
    handleChange: (e: {
        target: {
            value: any;
        };
    }) => void;
    renderDiv: () => JSX.Element;
    shouldComponentUpdate(nextProps: {
        value: any;
    }, nextState: any): boolean;
    renderEditor: () => JSX.Element;
    render(): JSX.Element;
}
