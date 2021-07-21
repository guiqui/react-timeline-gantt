import React, { useContext } from "react";

import { TimelineContext } from '../../context'
export interface ModeSelectorProps {
    onChange?: (mode: string) => void;
}

export const ModeSelector : React.FC<ModeSelectorProps> = (props) => {

    const { mode, changeMode } = useContext(TimelineContext)

    const onChange = (mode: string) => {
        changeMode?.(mode)
        props.onChange?.(mode)
    }

    const getButtonStyle = (value: string) => {
        return mode == value ? { backgroundColor: 'grey', boder: 'solid 1px #223344' } : {};  
    }

    return (
        <div className="mode-container">
            <div
              className="mode-container-item mode-container-item-left"
              onClick={(e) => onChange?.('day')}
              style={getButtonStyle('day')}
            >
              Day
            </div>
            <div className="mode-container-item" onClick={(e) => onChange?.('week')} style={getButtonStyle('week')}>
              Week
            </div>
            <div className="mode-container-item" onClick={(e) => onChange?.('month')} style={getButtonStyle('month')}>
              Month
            </div>
            <div
              className="mode-container-item mode-container-item-right"
              onClick={(e) => onChange?.('year')}
              style={getButtonStyle('year')}
            >
              Year
            </div>
        
          </div>
    )
}