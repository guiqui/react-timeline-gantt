

# react-gantt-timeline
[![npm](https://img.shields.io/npm/v/react-gantt-timeline.svg?style=flat-square)](http://npm.im/react-gantt-timeline)
[![MIT License](https://img.shields.io/npm/l/react-list.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Travis](https://travis-ci.org/guiqui/react-timeline-gantt.svg?branch=master)](https://travis-ci.org/guiqui/react-timeline)
[![codecov](https://codecov.io/gh/guiqui/react-timeline-gantt/branch/master/graph/badge.svg)](https://codecov.io/gh/guiqui/react-timeline-gantt)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9149e301e65b44cebf2e7b49316aee10)](https://www.codacy.com/app/gquiman/react-timeline-gantt?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=guiqui/react-timeline-gantt&amp;utm_campaign=Badge_Grade)

A react timeline gantt component.

![alt text](https://github.com/guiqui/react-timeline-gantt/blob/master/docs/demo.gif)

## Intro
React-timeline-gantt is an awesome blazing fast timeline - gantt component 😛.
These are the feature currently supported:
- Virtual rendering. Can render really fast a huge number of records.
- Infinite scrolling.
- Calendar View
- Zoom mode can be set to Day ,week or Month.
- Redux Compatible.Implement all necessary call backs to trigger actions and update store.
- Task update and resizing.
- Task dependencies.
- Support paging.

 Here is a demo  [video](https://youtu.be/ASGD1FXOafw) that shows how to use the component.
 Here is a working  [demo](https://guiqui.github.io/react-timeline-gantt/index.html) .


## Road Map
- Hierarchical tasks.(currently under development)
- Style customisation.(currently under development)
- Zoom to task.Plan for release 4.~

## Installation
```javascript
npm install react-gantt-timeline
```
## Timeline Data
The timeline data can be set with the data property of the time line.
The data needs to be an array of object.
Each item of the array needs to contain the following elements.

| Property      | value   | Descriptions                        |
| ------------- |:-------:| -----------------------------------:|
| start         | date    | The start date of the task          |
| end           | date    | The end date of the task            |
| name          | string  | The name of the task to be diplayed |

```javascript
 let data=[ {start:new Date(), end:new Date()+1 ,name:'Demo Task'}]
```

## Timeline Events
| name      | params   | Descriptions                        |
| ------------- |:-------:| -----------------------------------:|
| onNeedData    | start:Date,end :date   | Is trigger every time the timeline load a new period, provide the start and end date of the period to load, this method is useful for implementing paging or filter your data to only show tasks for the relevant period      |
| onSelectItem  | item:Object    | This even is trigger when a item is selected by the time line           |
| onUpdateItem  | item:Object,props:Object  |  This even is trigger when a item has been updated, it receive the item to be updated and the properties and values to by apply|

## Other properties 
| Property      | value   | Descriptions                        |
| ------------- |:-------:| -----------------------------------:|
| mode          | string    |set the zoom lever of the timeline.The possible values are:"month","week","day"  |
| itemHeigth    | number    | The height of the row 30px by default           |


## Some Demo Code
- [![Edit n09l7m400j](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n09l7m400j) Crud Demo.
- Coming up a redux demo.
