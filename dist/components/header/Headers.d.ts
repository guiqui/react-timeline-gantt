import React from 'react';
import './Header.css';
export interface HeaderProps {
    nowposition?: number;
    scrollLeft?: number;
    currentday?: number;
    mode?: string;
    dayWidth?: number;
    currentDate?: Date;
    numVisibleDays?: number;
    headerData?: any;
    currentPosition?: {
        x: number;
        y: number;
    };
}
declare const Header: React.FC<HeaderProps>;
export default Header;
