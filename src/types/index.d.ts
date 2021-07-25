import React from "react";



export type TimelineBackground = {background?: string, backgroundPosition?: string, backgroundSize?: string } | string 

export type TimelineHeader = {format: string, item?: (date: Date) => any}

export type TimelineStyle = {
    background?: (mode: string, dayWidth: number) => TimelineBackground | TimelineBackground
    header?: TimelineHeader[]
}


export type Task = {
    id: string | number;
    start: Date;
    end: Date;
    name: string;
    color?: string;
};

export type Link = {
    id: string | number;
    source: string | number;
    sourceHandle?: string;
    target: string | number;
    targetHandle?: string;
};

export type Config = Partial<{
    header: Partial<{
        top: Partial<{
            style: React.CSSProperties;
        }>;
        middle: Partial<{
            style: React.CSSProperties;
            selectedStyle: React.CSSProperties;
        }>;
        bottom: Partial<{
            style: React.CSSProperties;
            selectedStyle: React.CSSProperties;
        }>;
    }>;
    taskList: Partial<{
        title: Partial<{
            label: string;
            style: React.CSSProperties;
        }>;
        task: Partial<{
            style: React.CSSProperties;
        }>;
        verticalSeparator: Partial<{
            style: React.CSSProperties;
            grip: Partial<{
                style: React.CSSProperties;
            }>;
        }>;
    }>;
    dataViewPort: Partial<{
        rows: Partial<{
            style: React.CSSProperties;
        }>;
        task: Partial<{
            showLabel: boolean;
            style: React.CSSProperties;
            selectedStyle: React.CSSProperties;
        }>;
    }>;
    links: Partial<{
        color: string;
        selectedColor: string;
    }>;
}>;
