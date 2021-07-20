import React from "react";
import { PureComponent } from "react";
import styled from "styled-components";

export interface HeaderItemProps{
    left?: number;
    width: number;
    label?: string | number;
    mode?: string;

    className?: string;
  }
  
  export const BaseHeaderItem : React.FC<HeaderItemProps> = (props) => {

      return (
        <div
            className={props.className}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderLeft: 'solid 1px rgb(216, 217, 218)',
            position: 'absolute',
            height: 20,
            left: props.left,
            width: props.width,
            cursor: 'pointer'
          }}
        >
          <div>{props.label}</div>
        </div>
      );
    
  }
  
  export const HeaderItem = styled(BaseHeaderItem)`
  
    &:hover{
        background: rgba(127, 127, 127, 0.3);
    }
  `