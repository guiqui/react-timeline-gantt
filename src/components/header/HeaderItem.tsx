import React from "react";
import { PureComponent } from "react";

export interface HeaderItemProps{
    left?: number;
    width: number;
    label?: string | number;
    mode?: string;
  }
  
  export const HeaderItem : React.FC<HeaderItemProps> = (props) => {

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderLeft: 'solid 1px white',
            position: 'absolute',
            height: 20,
            left: props.left,
            width: props.width
          }}
        >
          <div>{props.label}</div>
        </div>
      );
    
  }
  