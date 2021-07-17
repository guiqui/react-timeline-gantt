import React from 'react';
import { Link, Task } from '../../types/index';
export interface LinkViewPortProps {
    selectedItem?: any;
    onSelectItem?: (item: any) => void;
    dayWidth?: number;
    itemheight?: number;
    scrollLeft?: number;
    scrollTop?: number;
    links?: Link[];
    data?: Task[];
    nowposition?: number;
    startRow?: number;
    endRow?: number;
    interactiveMode?: any;
    changingTask?: any;
    taskToCreate?: {
        task: Task;
        position: any;
    };
    onFinishCreateLink?: any;
}
export interface LinkViewPortState {
    links: Link[];
    data: Task[];
    selectedItem: any;
    dayWidth?: number;
    changingTask?: any;
}
declare const LinkViewPort: React.FC<LinkViewPortProps>;
export default LinkViewPort;
