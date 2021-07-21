export default App;
declare class App extends React.Component<any, any, any> {
    constructor(props: any);
    genID(): string;
    getRandomDate(): Date;
    getRandomColor(): string;
    createLink(start: any, end: any): {
        id: string;
        start: any;
        end: any;
    };
    onUpdateTask: (item: any, props: any) => void;
    onCreateLink: (item: any) => void;
    onSelectItem: (item: any) => void;
    addTask: () => void;
    delete: () => void;
}
import React from "react";
