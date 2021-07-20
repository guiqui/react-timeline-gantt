import React, { Component, useContext, useEffect } from 'react';
import {Link, Task} from '../../types/index';
import CreateLink from './CreateLink';
import DateHelper from '../../helpers/DateHelper';
import LinkComponent from './Link';
import { TimelineContext } from '../../context';
import { useState } from 'react';
import { useLink, useLinks, useTaskLinks } from '../../hooks/useLinks'
import { useData, useDataItem } from '../../hooks/useData'

export interface LinkViewPortProps {
  selectedItem?: any;
  onSelectItem?: (item: any) => void;

  dayWidth?: number;
  itemheight?: number;

  scrollLeft?: number;
  scrollTop?: number;

  links?: Link[];
  data?: Task[];

  nowposition?: number;

  startRow?: number;
  endRow?: number;

  interactiveMode?: any;
  changingTask?: any;
  taskToCreate?: {task: Task, position: any};
  onFinishCreateLink?: any;
}

export interface LinkViewPortState {
  links: Link[];
  data: Task[];
  selectedItem: any
  dayWidth?: number;
  changingTask?: any;
}

type LinkViewType = Component<LinkViewPortProps, LinkViewPortState>


 const LinkViewPort : React.FC<LinkViewPortProps> = (props) => {
   
  const taskToCreate = useDataItem(props.taskToCreate?.task?.id || '')
  const link = useLink(props.taskToCreate?.task?.id)

  const links = useLinks()
  const { data, dayWidth } = useContext(TimelineContext)

  const [ selectedItem, setSelectedItem ] = useState<any>(null)
  const [ changingTask, setChangingTask ] = useState<any>()

  const [ cache, setCache ] = useState<any[]>([])

  const renderLink = (startItem: { index: any } & Task, endItem: { index?: any; } & Task, link: Link, key: React.Key | null | undefined) => {
    let startPosition = getItemPosition(startItem.index, startItem.end);
    let endPosition = getItemPosition(endItem.index, endItem.start);
    return (
      <LinkComponent
        key={link.id}
        item={link}
        start={{ x: startPosition.x, y: startPosition.y }}
        end={{ x: endPosition.x, y: endPosition.y }}
        isSelected={props.selectedItem == link}
        onSelectItem={props.onSelectItem}
      />
    );
  }

  const getItemPosition = (index: number, date: Date) => {
    let itemHeight = (props.itemheight || 0 )+ 5

    let x = DateHelper.dateToPixel(date, 0, dayWidth || 0);
    let y = (index * (itemHeight)) + (itemHeight / 2);
    return { x: x, y: y };
  };

  const renderLinks = () => {
    let ret : any[] = [];

    let startItem: any = {}
    let endItem: any = {};

    if (data?.length == 0) return;
    for (let i = 0; i < (links || []).length; i++) {
      let link = links?.[i];
      if (!link) return;
     // if (renderLinks[link.id]) continue;

      startItem = useDataItem(link.source)
    
      if (!startItem) {
        //ret.concat([null])
        continue;
      }
      endItem = useDataItem(link.target || '')

      if (!endItem) {
      //  setCache(cache.concat([null]))
        continue;
      }

      ret = ret.concat([renderLink(startItem, endItem, link, i)])
     // renderLinks[link.id] = '';
    }
    return ret;
  }

 

  const renderCreateLink = () => {
    if (props.interactiveMode && props.taskToCreate?.task.id) {

      if(!taskToCreate)return console.error("No link")
  
      let position = getItemPosition(taskToCreate?.index, taskToCreate?.end);
      return <CreateLink start={position} onFinishCreateLink={props.onFinishCreateLink} />;
    }
  };

  // useEffect(() => {
  //   if(props.changingTask != changingTask){
  //     let view_links = [];
  //     const links = useTaskLinks(props.changingTask.id)
  //     let startPosition : any = {};
  //     let endPosition : any = {};
     
  //     for (let i = 0; i < links.length; i++) {
  //       let link = links[i];
  //       const startItem = useDataItem(link.source)
  //       //startItem = Registry.getTask(link.start);
  //       const endItem = useDataItem(link.target || '')
  //       //  endItem = Registry.getTask(item.link.end);
  //       if(!startItem?.end || !endItem?.end) return;
  //       startPosition = getItemPosition(startItem?.index ||0 , startItem?.end);
  //       if (changingTask.item.id == link.source) startPosition.x = changingTask.position.end;
  //       endPosition = getItemPosition(endItem?.index ||0, endItem?.start);
  //       if (changingTask.item.id == link.target) endPosition.x = changingTask.position.start;

  //   }
  // }, [props.changingTask])

  // const renderChangingTaskLinks = () => {
  //   let ret = [];
  //   if (props.changingTask != changingTask) {
      
  //     setChangingTask(props.changingTask)
  //     //Get Links from task
      
  //     const links = useTaskLinks(props.changingTask.id)
  //     if (!links) return;
  //     let item = null;
  //     //let startItem = null;
  //    // let endItem = null;
  //     let startPosition : any = {};
  //     let endPosition : any = {};
     
  //     for (let i = 0; i < links.length; i++) {
  //       let link = links[i];
  //       const startItem = useDataItem(link.source)
  //       //startItem = Registry.getTask(link.start);
  //       const endItem = useDataItem(link.target || '')
  //       //  endItem = Registry.getTask(item.link.end);
  //       if(!startItem?.end || !endItem?.end) return;
  //       startPosition = getItemPosition(startItem?.index ||0 , startItem?.end);
  //       if (changingTask.item.id == link.source) startPosition.x = changingTask.position.end;
  //       endPosition = getItemPosition(endItem?.index ||0, endItem?.start);
  //       if (changingTask.item.id == link.target) endPosition.x = changingTask.position.start;

  //       ret[link.index] = (
  //         <LinkComponent
  //           key={`link`}
  //           item={item}
  //           start={{ x: startPosition.x, y: startPosition.y }}
  //           end={{ x: endPosition.x, y: endPosition.y }}
  //           isSelected={props.selectedItem == item}
  //           onSelectItem={props.onSelectItem}
  //         />
  //       );
       
      
  //   }
  //   return ret;
  // }
  
  


  // useEffect(() => {

  //   renderChangingTaskLinks();
    
  // }, [props.changingTask])

    return (
      <svg x={0} y={0} width="100%" pointerEvents="none" style={{ position: 'absolute', top: 0, userSelect: 'none', height: '100%' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" strokeLinejoin="round" />
          </marker>
        </defs>
        <g transform={`matrix(1,0,0,1,${-((props.scrollLeft || 0) - (props.nowposition||0))},${-(props.scrollTop||0)})`}>
          {renderLinks()}
          {renderCreateLink()}
        </g>
      </svg>
    );
  
}
export default LinkViewPort