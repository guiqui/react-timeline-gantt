import React from "react";
export interface HeaderItemProps {
    left?: number;
    width: number;
    label?: string | number;
    mode?: string;
    className?: string;
}
export declare const BaseHeaderItem: React.FC<HeaderItemProps>;
export declare const HeaderItem: import("styled-components").StyledComponent<React.FC<HeaderItemProps>, any, {}, never>;
