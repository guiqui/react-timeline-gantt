import React from "react";
export interface HeaderItemProps {
    left?: number;
    width: number;
    label?: string | number;
    mode?: string;
}
export declare const HeaderItem: React.FC<HeaderItemProps>;
