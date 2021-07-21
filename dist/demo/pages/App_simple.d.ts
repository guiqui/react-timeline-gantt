export default App;
declare class App extends React.Component<any, any, any> {
    constructor(props: any);
    data: {
        id: number;
        start: Date;
        end: Date;
        name: string;
    }[];
    links: {
        id: number;
        start: number;
        end: number;
    }[];
}
import React from "react";
