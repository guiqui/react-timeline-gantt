

# react-gantt-timeline
[![npm](https://img.shields.io/npm/v/react-gantt-timeline.svg?style=flat-square)](http://npm.im/react-gantt-timeline)
[![MIT License](https://img.shields.io/npm/l/react-list.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Travis](https://travis-ci.org/guiqui/react-timeline-gantt.svg?branch=master)](https://travis-ci.org/guiqui/react-timeline)
[![codecov](https://codecov.io/gh/guiqui/react-timeline-gantt/branch/master/graph/badge.svg)](https://codecov.io/gh/guiqui/react-timeline-gantt)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9149e301e65b44cebf2e7b49316aee10)](https://www.codacy.com/app/gquiman/react-timeline-gantt?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=guiqui/react-timeline-gantt&amp;utm_campaign=Badge_Grade)

A react timeline gantt component.

![alt text](https://github.com/guiqui/react-timeline-gantt/blob/master/docs/demo.gif)

## About
React-timeline-gantt is a component built to display and manage calendar gantt charts.
It use virtual rendering to be reactive an efficient.

The component is capable of:
- Can handle 100  thousands 
- Infinite calendar scrolling
- Three Zoom levels : day, week, month
- Fully customizable.
- Support all CRUD operations.
- Task and Link creation.
- Support Paging.
- Can be easily integrated with Redux


 To watch a demo take a look at [video](https://youtu.be/ASGD1FXOafw) that shows how to use the component.
 
 To play with a live [demo](https://guiqui.github.io/react-timeline-gantt/index.html) .


## Installation
```javascript
npm install react-gantt-timeline
```
The component has the following dependencies: moment, react-sizeme

## Getting started
The first thing to once the component has been install and all it dependencies is create the data that the timeline component consume.The time line has two data providers **data** and **links**.

**Data** :is an array of objects that contains the task to be shown. Each one of the object that are part of the array need to have the following compulsory fields

| Property      | value   | Descriptions                        |
| ------------- |:-------:| :-----------------------------------|
| id            | String/Number    | An unique identifier for the class|
| start         | Date    | The start date of the task          |
| end           | Date    | The end date of the task            |
| name          | String  | The name of the task to be diplayed |

An example of data definition:
```javascript
 let data=[ {id:1,start:new Date(), end:new Date()+1 ,name:'Demo Task 1'},
			{id:2,start:new Date(), end:new Date()+1 ,name:'Demo Task 2'}]
```

**Links** :is also an array of objects that contains links between task. Each one of the object that are part of the array need to have the following compulsory fields:

| Property      | value   | Descriptions                        |
| ------------- |:-------:| :-----------------------------------|
| id            | String/Number    | An unique identifier for the class|
| start         | String/Number      | The id of the start task        |
| end           | String/Number      | The id of the end task          |

An example of data definition:
```javascript
 let links=[ {id:1,start:1, end:2},
			{id:2,start:1, end:3}]
```

Once the data is define we just need to declare the component and populate it with both data providers.

```javascript

<TimeLine  data={data} links={links}/>);
```
Here is the demo code:

 [![Edit 1y2on87jj](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1y2on87jj)

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
