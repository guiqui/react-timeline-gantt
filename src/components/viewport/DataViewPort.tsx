import React, { createRef, useEffect, useRef, useState } from 'react';
import { DATA_CONTAINER_WIDTH } from '../../Const';
import DataTask from './DataTask';
import DataRow from './DataRow';
import DateHelper from '../../helpers/DateHelper';
import Config from '../../helpers/config/Config';
import { useContext } from 'react';
import { getBackgroundPosition, getBackgroundWidth } from '../../utils'
import { TimelineContext } from '../../context'
import styled from 'styled-components'
import useResizeAware from 'react-resize-aware'

export const BaseDataViewPort : React.FC<any> = (props) => {

  const dataViewRef = useRef<HTMLDivElement>(null)

  const { mode, style, dayWidth, moveTimeline, scrollLeft } = useContext(TimelineContext)

  const [ childDragging, setChildDragging ] = useState<boolean>(false) 
  

  const reporter = (target?: HTMLElement | null) => {
    let dimensions = {width: target?.clientWidth || null, height: target?.clientHeight || null}
    if(dimensions.width && dimensions.height) props.onSize?.(dimensions)
    return dimensions
  }

  const [ resizeListener, sizes ] = useResizeAware(reporter)

  const getContainerHeight = (rows: number) => {
    let new_height = rows > 0 ? rows * props.itemheight : 10;
    return new_height;
  }
  const onChildDrag = (dragging: boolean) => {
    setChildDragging(dragging)
  };

  const renderRows = () => {
    let result = [];
    for (let i = props.startRow; i < props.endRow + 1; i++) {
      let item = props.data[i];
      if (!item) break;
      //FIXME PAINT IN BOUNDARIES

      let new_position = DateHelper.dateToPixel(item.start, props.nowposition, dayWidth || 0);
      let new_width = DateHelper.dateToPixel(item.end, props.nowposition, dayWidth || 0) - new_position;
      result.push(
        <DataRow
          isSelected={props.selectedItem == item}
           key={i} 
           label={item.name} 
           top={i * (props.itemheight + 5)} 
           left={20} 
           itemheight={(props.itemheight + 5)}>
          <DataTask
            item={item}
            label={item.name}
            nowposition={props.nowposition}
            dayWidth={dayWidth}
            color={item.color}
            left={new_position}
            width={new_width}
            height={props.itemheight}
            onChildDrag={onChildDrag}
            isSelected={props.selectedItem == item}
            onSelectItem={props.onSelectItem}
            onStartCreateLink={props.onStartCreateLink}
            onFinishCreateLink={props.onFinishCreateLink}
            onTaskChanging={props.onTaskChanging}
            onUpdateTask={props.onUpdateTask}
          >
            {' '}
          </DataTask>
        </DataRow>
      );
    }
    return result;
  };

  const doMouseDown = (e: { button: number; }) => {
    if (e.button === 0 && !childDragging) {
      props.onMouseDown(e);
    }
  };
  const doMouseMove = (e: any) => {
    props.onMouseMove(e, dataViewRef.current);
  };

  const doTouchStart = (e: any) => {
    if (!childDragging) {
      props.onTouchStart(e);
    }
  };
  const doTouchMove = (e: any) => {
    props.onTouchMove(e, dataViewRef.current);
  };

  useEffect(() => {
    if(dataViewRef.current) dataViewRef.current.scrollLeft = 0;
  }, [])

  useEffect(() => {
    if (dataViewRef.current) {
      dataViewRef.current.scrollLeft = props.scrollLeft;
      dataViewRef.current.scrollTop = props.scrollTop;
    }
  }, [props.scrollLeft, props.scrollTop])

  const backgroundStyle : any = (mode && style?.background) ? style?.background?.(mode, dayWidth || 0) :  {
    background: `linear-gradient(
      to right,
      #5d9634,
      #5d9634 50%,
      #538c2b 50%,
      #538c2b
    )`,
    backgroundSize: `${(getBackgroundWidth(props.mode || 'month') * (dayWidth || 0)) * 2}px 100%`,
    backgroundPositionX: getBackgroundPosition(props.mode || 'month'),
  } 
    let height = getContainerHeight(props.data.length);
    return (
      <div
        ref={dataViewRef}
        id="timeLinedataViewPort"
        className={`${props.className} timeLine-main-data-viewPort`}
        onWheel={(evt) => {
          //
          moveTimeline?.((scrollLeft || 0) + evt.deltaX)
        }}
        onMouseDown={doMouseDown}
        onMouseMove={doMouseMove}
        onMouseUp={props.onMouseUp}
        onMouseLeave={props.onMouseLeave}
        onTouchStart={doTouchStart}
        onTouchMove={doTouchMove}
        onTouchEnd={props.onTouchEnd}
        onTouchCancel={props.onTouchCancel}
      >
        {resizeListener}
        <div
          className="timeLine-main-data-container"
          style={{ 
            background: 'transparent',
            height: '100%', 
            width: DATA_CONTAINER_WIDTH,
            maxWidth: DATA_CONTAINER_WIDTH }}
        >
          {renderRows()}
        </div>
      </div>
    );
  
}

export const DataViewPort = styled(BaseDataViewPort)`
.timeLine-main-data-container{
  background: ;
  }

`

export default DataViewPort; 


//sizeMe({ monitorWidth: true, monitorHeight: true })(DataViewPort);
