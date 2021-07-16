import React from 'react';
import './Header.css';
export interface HeaderProps {
    mode: string;
    nowposition: number;
    scrollLeft: number;
    dayWidth: number;
    currentday: number;
    currentDate?: Date;
    numVisibleDays: number;
    headerData: any;
    currentPosition?: {
        x: number;
        y: number;
    };
}
declare const Header: React.FC<HeaderProps>;
export default Header;
