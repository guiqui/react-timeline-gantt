import React, { Component, useRef, useState } from 'react';
import styled from 'styled-components';
import Config from '../../helpers/config/Config';
import { CaretLeftFill, CaretRightFill } from 'grommet-icons'
import { useDrag } from 'beautiful-react-hooks'

export interface VerticalSplitterProps {
  className?: string;
  onTaskListSizing?: (delta: number) => void;
}

const VerticalSpliter : React.FC<VerticalSplitterProps> = (props) => {
  const verticalRef = useRef<HTMLDivElement>(null)

  const dragging = useRef<boolean>(false)

  const [ isDragging, _setDragging ] = useState<boolean>(false)

  const setDragging = (val: boolean) => {
    dragging.current = val;
    _setDragging(val)
  }
  const draggingPosition = useRef<any>(0);


  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      console.log("MOUSE DOWN")

      draggingPosition.current = e.clientX;
      setDragging(true)

      const cleanup = () => {
        console.log("CLEANUP")
        setDragging(false)
        window.removeEventListener('mousemove', onMouseMove as EventListenerOrEventListenerObject)
        window.removeEventListener('mouseup', cleanup)
      }
      window.addEventListener('mousemove', onMouseMove as EventListenerOrEventListenerObject)
      window.addEventListener('mouseup', cleanup)
    }
  }


  const onMouseMove = (e: MouseEvent) => {
    if(dragging.current){ 
      e.stopPropagation();
      console.log("MOUSEMOVE", e)
      let bounds = draggingPosition.current || 0
      let delta = bounds - e.clientX;//
      draggingPosition.current = e.clientX;

    if(delta > 0) console.log("delta", delta)
      props.onTaskListSizing?.(e.clientX + 6);
    }
    
  }

  console.log("Dragging", dragging.current)

    return (
      <div 
        ref={verticalRef}
        className={`${props.className} ${isDragging == true ? 'dragging': ''}`} 
        style={Config.values.taskList.verticalSeparator.style} 
        onMouseDown={onMouseDown}
        >
          <CaretLeftFill />
          <CaretRightFill />
      
      </div>
    );
  
}


export default styled(VerticalSpliter)`
  width: 5px;
  transition: width 100ms ease-out;
  cursor: col-resize;

  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;

  & svg{
    transition opacity 100ms ease-out;
  }
  &:not(:hover) svg{
    opacity: 0;
  }

  &:hover svg{
    opacity: 1;
  }

  &:hover{
    width: 13px;
  }
  &.dragging{
    width: 13px;
  }
`