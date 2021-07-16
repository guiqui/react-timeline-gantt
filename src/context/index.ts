import React from "react";

export interface ITimelineContext {
    moveTimeline?: (new_x: number) => void;
    scrollLeft?: number;

    mode?: string;
}   

export const TimelineContext = React.createContext<ITimelineContext>({})