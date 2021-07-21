export default App;
declare class App extends React.Component<any, any, any> {
    constructor(props: any);
    data: any[];
    handleDayWidth: (e: any) => void;
    handleItemHeight: (e: any) => void;
    onHorizonChange: (start: any, end: any) => void;
    onSelectItem: (item: any) => void;
    onUpdateTask: (item: any, props: any) => void;
    onCreateLink: (item: any) => void;
    getbuttonStyle(value: any): {
        backgroundColor: string;
        boder: string;
    } | {
        backgroundColor?: undefined;
        boder?: undefined;
    };
    modeChange: (value: any) => void;
    genID(): string;
    getRandomDate(): Date;
    getRandomColor(): string;
    addTask: () => void;
    delete: () => void;
}
import React from "react";
