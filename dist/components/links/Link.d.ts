import { Component } from 'react';
declare class Link extends Component<any, any> {
    constructor(props: any);
    calcNormCoordinates: () => {
        cpt1: {
            x: number;
            y: number;
        };
        cpt2: {
            x: number;
            y: number;
        };
    };
    calcSCoordinates: () => {
        cpt1: {
            x: any;
            y: any;
        };
        cpt2: {
            x: any;
            y: any;
        };
        cpt3: {
            x: number;
            y: any;
        };
        cpt4: {
            x: number;
            y: any;
        };
    };
    getPath: (coords?: any) => string;
    onSelect: (e: any) => void;
    render(): JSX.Element;
}
export default Link;
