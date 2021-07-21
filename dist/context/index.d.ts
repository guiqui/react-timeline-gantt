import React from "react";
import { Link, Task, TimelineStyle } from "../types";
export interface ITimelineContext {
    moveTimeline?: (new_x: number) => void;
    scrollLeft?: number;
    style?: TimelineStyle;
    mode?: string;
    links?: Link[];
    data?: Task[];
    dayWidth?: number;
    changeMode?: (mode: string) => void;
}
export declare const TimelineContext: React.Context<ITimelineContext>;
