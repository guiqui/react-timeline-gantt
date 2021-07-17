import React, { Component, useContext, useEffect } from 'react';
import Registry from '../../helpers/registry/Registry';
import {Link, Task} from '../../types/index';
import CreateLink from './CreateLink';
import DateHelper from '../../helpers/DateHelper';
import LinkComponent from './Link';
import { TimelineContext } from '../../context';
import { useState } from 'react';


export interface LinkViewPortProps {
  selectedItem: any;
  onSelectItem: (item: any) => void;

  itemheight: number;

  scrollLeft: number;
  scrollTop: number;

  links: Link[];
  data: Task[];

  nowposition: number;

  startRow?: number;
  endRow?: number;

  interactiveMode: any;
  changingTask: any;
  taskToCreate: {task: Task, position: any};
  onFinishCreateLink: any;
}

export interface LinkViewPortState {
  links: Link[];
  data: Task[];
  selectedItem: any
  dayWidth?: number;
  changingTask?: any;
}


 const LinkViewPort : React.FC<LinkViewPortProps> = (props) => {
   
  const { links, data, dayWidth } = useContext(TimelineContext)

  const [ selectedItem, setSelectedItem ] = useState<any>(null)
  const [ changingTask, setChangingTask ] = useState<any>()

  const [ cache, setCache ] = useState<any[]>([])

  const renderLink = (startItem: { index: any; item: { end: any; }; }, endItem: { index?: any; item?: any; }, link: any, key: React.Key | null | undefined) => {
    let startPosition = getItemPosition(startItem.index, startItem.item.end);
    let endPosition = getItemPosition(endItem.index, endItem.item.start);
    return (
      <LinkComponent
        key={key}
        item={link}
        start={{ x: startPosition.x, y: startPosition.y }}
        end={{ x: endPosition.x, y: endPosition.y }}
        isSelected={props.selectedItem == link}
        onSelectItem={props.onSelectItem}
      />
    );
  }

  const getItemPosition = (index: number, date: any) => {
    let x = DateHelper.dateToPixel(date, 0, dayWidth || 0);
    let y = index * props.itemheight + props.itemheight / 2;
    return { x: x, y: y };
  };

  const renderLinks = () => {
    setCache([])
    let renderLinks : any = {};
    let startItem,
      endItem = {};
    if (data?.length == 0) return;
    for (let i = 0; i < (links || []).length; i++) {
      let link = links?.[i];
      if (!link) return;
      if (renderLinks[link.id]) continue;
      startItem = Registry.getTask(link.start);
      if (!startItem) {
        setCache(cache.concat([null]))
        continue;
      }
      endItem = Registry.getTask(link.end);
      if (!endItem) {
        setCache(cache.concat([null]))
        continue;
      }

      setCache(cache.concat(renderLinks(startItem, endItem, link, i)))
      renderLinks[link.id] = '';
    }
  }

 

  const renderCreateLink = () => {
    if (props.interactiveMode) {
      let record = Registry.getTask(props.taskToCreate.task?.id);
      let position = getItemPosition(record?.index, record?.item.end);
      return <CreateLink start={position} onFinishCreateLink={props.onFinishCreateLink} />;
    }
  };

  const renderChangingTaskLinks = () => {
    if (props.changingTask != changingTask) {
      setChangingTask(props.changingTask)
      //Get Links from task
      let links = Registry.getLinks(props.changingTask.item.id);
      if (!links) return;
      let item = null;
      let startItem = null;
      let endItem = null;
      let startPosition : any = {};
      let endPosition : any = {};
      for (let i = 0; i < links.length; i++) {
        item = links[i];
        startItem = Registry.getTask(item.link.start);
        if (!startItem) continue;
        endItem = Registry.getTask(item.link.end);
        if (!endItem) continue;
        startPosition = getItemPosition(startItem.index, startItem.item.end);
        if (changingTask.item.id == item.link.start) startPosition.x = changingTask.position.end;
        endPosition = getItemPosition(endItem.index, endItem.item.start);
        if (changingTask.item.id == item.link.end) endPosition.x = changingTask.position.start;

        cache[item.index] = (
          <LinkComponent
            key={-i - 1}
            item={item}
            start={{ x: startPosition.x, y: startPosition.y }}
            end={{ x: endPosition.x, y: endPosition.y }}
            isSelected={props.selectedItem == item}
            onSelectItem={props.onSelectItem}
          />
        );
       
        setCache(cache)
      }
    }
  };

  useEffect(() => {

    renderChangingTaskLinks();
  },[props.changingTask])

    return (
      <svg x={0} y={0} width="100%" pointerEvents="none" style={{ position: 'absolute', top: 60, userSelect: 'none', height: '100%' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" strokeLinejoin="round" />
          </marker>
        </defs>
        <g transform={`matrix(1,0,0,1,${-(props.scrollLeft - props.nowposition)},${-props.scrollTop})`}>
          {cache}
          {renderCreateLink()}
        </g>
      </svg>
    );
  
}
export default LinkViewPort