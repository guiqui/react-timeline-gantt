
# react-gantt-timeline
A react timeline gantt component.

[![npm](https://img.shields.io/npm/v/react-gantt-timeline.svg?style=flat-square)](http://npm.im/react-gantt-timeline)
[![MIT License](https://img.shields.io/npm/l/react-list.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Travis](https://travis-ci.org/guiqui/react-timeline.svg?branch=master)](https://travis-ci.org/guiqui/react-timeline)
[![codecov](https://codecov.io/gh/guiqui/react-timeline/branch/master/graph/badge.svg)](https://codecov.io/gh/guiqui/react-timeline)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9149e301e65b44cebf2e7b49316aee10)](https://www.codacy.com/app/gquiman/react-timeline?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=guiqui/react-timeline&amp;utm_campaign=Badge_Grade)

## Intro

![alt text](https://guiqui.github.io/react-timeline/demo.gif)

- Here is a demo [video](https://youtu.be/VXURUDmfTR0)

An awesome blazing fast timeline component.
- Super fast. 😛
- Infinite scrolling.
- Made to be use with Redux.
- Task update and resizing.
- Support paging.
- Can render more than a 100k records.
- Implemented with virtual rendering.
- Support Day Week and Month view.

## Under test
- Gantt lines and constrains.
## Under development
- Hierachical data.
## Road Map
- Full Test coverage.
- Zoom to task

## Demo
Check out a working demo [here](https://guiqui.github.io/react-timeline/index.html)

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
| onNeedData    | start:Date,end :date   | Is trigger everytime the timeline load a new period, provide the start and end date of the period to load, this method is useful for implementing pagin or filter your data to only show tasks for the relevant period      |
| onSelectItem  | item:Object    | This even is trigger when a item is selected by the time line           |
| onUpdateItem  | item:Object,props:Object  |  This even is trigger when a item has been updated, it recive the item to be updated and the properties and values to by apply|

## Other properties 
| Property      | value   | Descriptions                        |
| ------------- |:-------:| -----------------------------------:|
| mode          | string    |set the zoom lever of the timeline.The possible values are:"month","week","day"  |
| itemHeigth    | number    | The height of the row 30px by default           |


## Some Demo Code
- [![Edit n09l7m400j](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n09l7m400j) Crud Demo.
- Coming up a redux demo.
