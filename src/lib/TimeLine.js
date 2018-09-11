import React,{Component} from 'react'
import PropTypes from 'prop-types'
import moment  from 'moment'  
import VerticalSpliter from 'libs/components/VerticalSpliter'
import Header from 'libs/components/header/Headers'
import DataViewPort from 'libs/components/viewport/DataViewPort'
import TaskList from 'libs/components/taskList/TaskList'
import {BUFFER_DAYS,DATA_CONTAINER_WIDTH} from 'libs/Const'
import DataController from 'libs/controller/DataController'
import DateHelper from 'libs/helpers/DateHelper'
import './TimeLine.css'

class TimeLine extends Component{
    constructor(props){
        super(props);
        this.dragging=false;
        this.draggingPosition=0;
        //Initianlising Data Provider
        //this.dataProvider=new TimeDataProvider();
        this.dc=new DataController();
        this.dc.onNeedData=this.onNeedData;
        //this.dataProvider.onPageLoad=this.onPageLoad;
        this.initialise=false;
        //This variable define the number of pixels the viewport can scroll till arrive to the end of the context
        this.pxToScroll=1900;
        //Initialising state
        this.state={
            currentday:0,//define what days is in the top-left of the view port      
            nowposition:0,//      
            startRow:0,//
            endRow:30,
            months:DateHelper.calculateMonthData(0,30,0,this.props.dayWidth),
            sideStyle:{width:200},
            scrollLeft:0,
            scrollTop:0,
            numVisibleRows:30,
            numVisibleDays:60,
            size:{width:1}
        }
    }

    onSize = size => {
        //If size has changed
        this.calculateVerticalScrollVariables(size);
         if (!this.initialise){
            this.dc.initialise(this.state.scrollLeft+this.state.nowposition,
                this.state.scrollLeft+this.state.nowposition+size.width,
                this.state.nowposition,this.props.dayWidth
            )
            this.initialise=true;

         }
        // {

        // }else{
        //      let middlescrollLeftition=this.pxToScroll/2;
        //     //For middleNowPosition we get middlescrollLeftition and we add half of the bar of the scroll
        //     let middleNowPosition=DATA_CONTAINER_WIDTH/2;
        //     ///Initialise bar to the middle and now position
        //     //this.refs.dataViewPort.refs.this.state.scrollLeft=middlescrollLeftition;
        //     //this.refs.timeHeaderViewPort.scrollLeft=this.refs.dataViewPort.refs.this.state.scrollLeft;
        //     this.nowPosition=middleNowPosition;  

        // }
        this.setStartEnd();
        this.setState({
            numVisibleRows:Math.ceil(size.height / this.props.itemheight),
            numVisibleDays:Math.ceil(size.width / this.props.dayWidth)+BUFFER_DAYS,
            size:size
        })
    }
    
      /////////////////////////
     //   VIEWPORT CHANGES  //
    /////////////////////////

    verticalChange=(scrollTop)=>{ ///Needs serious refactoring to be able to centralise changes 
        if (scrollTop==this.state.scrollTop)
            return;
        //Check if we have scrolling rows
        let new_start=Math.trunc(scrollTop/this.props.itemheight)
        let new_end =new_start+this.state.numVisibleRows>=this.props.data.length?this.props.data.length-1:new_start+this.state.numVisibleRows;
        if (new_start!==this.state.start){
            //Got you
            this.setState(
                this.state={
                    scrollTop:scrollTop,
                    startRow:new_start,
                    endRow:new_end,
            })
        }
    }

    
    setStartEnd=()=>{
        this.dc.setStartEnd(this.state.scrollLeft,
                            this.state.scrollLeft+this.state.size.width,
                            this.state.nowposition,
                            this.props.dayWidth)
    }


    horizontalChange=(newScrollLeft)=>{
        let new_nowposition=this.state.nowposition;
        let new_left=-1;
        let months=this.state.months;
        let new_startRow=this.state.startRow;
        let new_endRow=this.state.endRow;
        
        //Calculating if we need to roll up the scroll
        if (newScrollLeft>this.pxToScroll){//ContenLegnth-viewportLengt
            new_nowposition=this.state.nowposition-this.pxToScroll
            new_left=0;
        } else{
            if (newScrollLeft<=0){//ContenLegnth-viewportLengt
                new_nowposition=this.state.nowposition+this.pxToScroll
                new_left=this.pxToScroll;
            }else{
                new_left=newScrollLeft;
            }
        }

        //Get the day of the left position
        let currentIndx=Math.trunc((newScrollLeft-this.state.nowposition) /this.props.dayWidth)
 
        //Check if we need to change moths and load new data
        if (this.changingMonth(currentIndx,currentIndx+this.state.numVisibleDays)){
            months=DateHelper.calculateMonthData(currentIndx,currentIndx+this.state.numVisibleDays,new_nowposition,this.props.dayWidth)
        }else{ 
            if(new_left !=-1)
                months=DateHelper.calculateMonthData(currentIndx,currentIndx+this.state.numVisibleDays,new_nowposition,this.props.dayWidth)
        }

        //Calculate rows to render
        new_startRow=Math.trunc(this.state.scrollTop/this.props.itemheight)
        new_endRow =new_startRow+this.state.numVisibleRows>=this.props.data.length?this.props.data.length-1:new_startRow+this.state.numVisibleRows;
        //If we need updates then change the state and the scroll position
        //Got you
        this.setStartEnd();
        this.setState(
            this.state={
                currentday:currentIndx,
                nowposition:new_nowposition,
                months:months,
                scrollLeft: new_left,
                startRow:new_startRow,
                endRow:new_endRow,
        })
        
    }

    changingMonth=(start,end)=>{
        let startMonth=moment().add(start, 'days').format("M-YYYY");  
        let endMonth=moment().add(end, 'days').format("M-YYYY");
        return (!(startMonth in this.state.months.keys) || !(endMonth in this.state.months.keys))
    }

  

    calculateVerticalScrollVariables=(size)=>{
        //The pixel to scroll verically is equal to the pecentage of what the viewport represent in the context multiply by the context width
        this.pxToScroll=(1-(size.width/DATA_CONTAINER_WIDTH)) * DATA_CONTAINER_WIDTH-1;
    }

    onNeedData=(lowerLimit,upLimit)=>{
        if (this.props.onNeedData)
            this.props.onNeedData(lowerLimit,upLimit)
    }
    
      /////////////////////
     //   MOUSE EVENTS  //
    /////////////////////

    doMouseDown=(e)=>{
        this.dragging=true;
        this.draggingPosition=e.clientX;
    }

    doMouseMove=(e)=>{
        if(this.dragging){
            let delta=this.draggingPosition-e.clientX;
            if (delta!==0){
                this.draggingPosition=e.clientX;
                this.horizontalChange(this.state.scrollLeft+delta);
            }
        }
    }

    doMouseUp=(e)=>{
        this.dragging=false;
    }

    doMouseLeave=(e)=>{
        this.dragging=false;
    }

    //Child communicating states
    onTaskListSizing=(delta)=>{
        this.setState((prevState) => {
            let result={...prevState};
            result.sideStyle={width:result.sideStyle.width-delta};
            return result;
        })
    }

      /////////////////////
     //   ITEMS EVENTS  //
    /////////////////////
    
    onSelectItem=(item)=>{
        if (this.props.onSelectItem)
            this.props.onSelectItem(item)
    }

    onUpdateItem=(item,props)=>{
        if (this.props.onUpdateItem)
            this.props.onUpdateItem(item,props)
    }
   
    render(){
        return (
        <div className="timeLine">   
            <div className="timeLine-side-main" style={this.state.sideStyle}> 
                <TaskList
                    ref='taskViewPort'
                    itemheight={this.props.itemheight} 
                    startRow={this.state.startRow}
                    endRow={this.state.endRow}
                    data={this.props.data}
                    selectedItem={this.props.selectedItem}
                    onSelectItem={this.onSelectItem}
                    onUpdateItem={this.onUpdateItem}
                    onScroll={this.verticalChange}/>
                <VerticalSpliter onTaskListSizing={this.onTaskListSizing}/>
            </div>       
            <div className="timeLine-main">
                <Header months={this.state.months} 
                        numVisibleDays={this.state.numVisibleDays}
                        currentday={this.state.currentday}
                        nowposition={this.state.nowposition}
                        dayWidth={this.props.dayWidth}
                        scrollLeft={this.state.scrollLeft}/>
                <DataViewPort 
                    ref='dataViewPort'
                    scrollLeft={this.state.scrollLeft}
                    scrollTop={this.state.scrollTop}
                    itemheight={this.props.itemheight}
                    nowposition={this.state.nowposition}
                    startRow={this.state.startRow}
                    endRow={this.state.endRow}
                    data={this.props.data}
                    selectedItem={this.props.selectedItem}
                    dayWidth={this.props.dayWidth}
                    onScroll={this.scrollData}  
                    onMouseDown={this.doMouseDown} 
                    onMouseMove={this.doMouseMove}
                    onMouseUp={this.doMouseUp} 
                    onMouseLeave ={this.doMouseLeave}
                    onSelectItem={this.onSelectItem}
                    onUpdateItem={this.onUpdateItem}
                    boundaries={{lower:this.state.scrollLeft,upper:this.state.scrollLeft+this.state.size.width}}
                    onSize={this.onSize}/>
            </div>
        </div>)
    }

}

TimeLine.propTypes = {
    itemheight: PropTypes.number.isRequired,
    dayWidth:PropTypes.number.isRequired
  };

TimeLine.defaultProps = {
    itemheight:20,
    dayWidth:24
  };



export default TimeLine