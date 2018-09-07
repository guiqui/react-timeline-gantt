import React,{Component} from 'react'
import PropTypes from 'prop-types'
import moment  from 'moment'  
import './TimeLine.css'
import TimeDataProvider from 'libs/provider/TimeDataProvider'
import VerticalSpliter from 'libs/components/VerticalSpliter'
import Header from 'libs/components/Headers'
import DataViewPort from 'libs/components/data/DataViewPort'
import DataTask from 'libs/components/data/DataTask'
import TaskList,{VerticalLine} from 'libs/components/data/TaskList'
import {BUFFER_DAYS,LEFT_BOUNDARIES} from 'libs/Const'



class TimeLine extends Component{
    constructor(props){
        super(props);
        this.dragging=false;
        this.draggingPosition=0;
        //Initianlising Data Provider
        this.dataProvider=new TimeDataProvider();
        this.dataProvider.onPageLoad=this.onPageLoad;

        //Initialising Drawing variables
        this.numVisibleRows=30; 
        this.numVisibleDays=60;
        ///Child Management
        this.childDragging=false
        //This variable define the number of pixels the viewport can scroll till arrive to the end of the context
        this.pxToScroll=1900;
        //Initialising state
        this.state={
            currentday:0,//define what days is in the top-left of the view port      
            nowposition:0,//      
            startRow:0,//
            endRow:this.numVisibleRows ,
            data:this.dataProvider.data,
            months:this.calculateMonthData(0,this.numVisibleDays,0),
            sideStyle:{width:200},
            containerStyle:{height:10},
            scrollPos:0
        }
    }

    componentDidMount(){
        this.numVisibleRows=Math.trunc(this.refs.dataViewPort.refs.dataViewPort.clientHeight / this.props.rowheight);
        this.numVisibleDays=Math.trunc(this.refs.dataViewPort.refs.dataViewPort.clientWidth / this.props.dayWidth)+BUFFER_DAYS;
        this.calculateVerticalScrollVariables();

        let middleScrollPosition=this.pxToScroll/2;
        //For middleNowPosition we get middleScrollPosition and we add half of the bar of the scroll
        let middleNowPosition=this.refs.dataViewPort.refs.dataContainer.clientWidth/2;
        ///Initialise bar to the middle and now position
        this.refs.dataViewPort.refs.dataViewPort.scrollLeft=middleScrollPosition;
        //this.refs.timeHeaderViewPort.scrollLeft=this.refs.dataViewPort.refs.dataViewPort.scrollLeft;
        this.nowPosition=middleNowPosition;
        let newdata=this.getDataToRender(this.state.months)
        let new_end =this.numVisibleRows>=newdata.length?newdata.length-1:this.numVisibleRows;//Duplication need centraise
        this.setState((prevState) => {
            let result={...prevState};
            result.nowposition=middleNowPosition;
            result.scrollPos=middleScrollPosition;
            result.data=newdata;
            result.endRow=new_end;
            return result;
        })
        //Provider
        this.dataProvider.setCurrentPage(this.state.months.data[1].key);
    }

    getSafeValue(obj,key,defaultValue){
        return obj[key]?obj[key]:defaultValue;

    }

    // Helper Fuctions for time and drawing calculations
    calculateMonthData(start,end,now){
        //startMonth daysinMonth 
        let result={}
        result['data']=[]
        result['keys']={}
        let currentMonth='';
        let currentKey='';
        for (let i=start-BUFFER_DAYS;i<end+BUFFER_DAYS;i++ ){
            currentMonth=moment().add(i, 'days')       ;
            currentKey=currentMonth.format("M-YYYY")     
            result['data'].push({
                key:currentKey,
                month:currentMonth.format("MMM  YYYY"),
                left:this.dayToPosition(i-currentMonth.date()+1,now),
                width:currentMonth.daysInMonth()*this.props.dayWidth

            })
            result['keys'][currentKey]=currentKey;
            i=i+currentMonth.daysInMonth()-currentMonth.date();
        }
        return result;
    }

    changingMonth=(start,end)=>{
        let startMonth=moment().add(start, 'days').format("M-YYYY");  
        let endMonth=moment().add(end, 'days').format("M-YYYY");
        return (!(startMonth in this.state.months.keys) || !(endMonth in this.state.months.keys))
    }

    dayToPosition=(day,now)=>{
        return day * this.props.dayWidth +now;

    }


    calculateVerticalScrollVariables=()=>{
        //The pixel to scroll verically is equal to the pecentage of what the viewport represent in the context multiply by the context width
        this.pxToScroll=(1-(this.refs.dataViewPort.refs.dataViewPort.clientWidth/this.refs.dataViewPort.refs.dataContainer.clientWidth)) * this.refs.dataViewPort.refs.dataContainer.clientWidth-1;
    }
    

    //Interaction Events 
    scollPos=(e)=>{ ///Needs serious refactoring to be able to centralise changes 
        e.preventDefault();
        //this.refs.timeHeaderViewPort.scrollLeft=this.refs.dataViewPort.refs.dataViewPort.scrollLeft;
        this.refs.taskViewPort.refs.taskViewPort.scrollTop=this.refs.dataViewPort.refs.dataViewPort.scrollTop;
        let needUpdate=false;
        let new_nowposition=this.state.nowposition;
        let new_left=-1;
        let renderData=this.state.data;
        let months=this.state.months;
        let new_containerStyle=this.state.containerStyle;
        
        //Check if we have run out of scroll
        if (this.refs.dataViewPort.refs.dataViewPort.scrollLeft>this.pxToScroll){//ContenLegnth-viewportLengt
            needUpdate=true;
            new_nowposition=this.state.nowposition-this.pxToScroll
            new_left=0;
        } else{
            if (this.refs.dataViewPort.refs.dataViewPort.scrollLeft===0){//ContenLegnth-viewportLengt
                needUpdate=true;//This bug will be fixed once data to draw is filtered
                new_nowposition=this.state.nowposition+this.pxToScroll
                new_left=this.pxToScroll;
            }
        }
        //Check if we have are changing date
        let currentIndx=Math.trunc((this.refs.dataViewPort.refs.dataViewPort.scrollLeft-this.state.nowposition) /this.props.dayWidth)// ++ when infinite scrolling OFfset
        if (currentIndx!==this.state.currentday){//We change days
            needUpdate=true;
        }
        //Check if we have scrolling rows
        let new_start=Math.trunc(this.refs.dataViewPort.refs.dataViewPort.scrollTop/this.props.itemheight)
        let new_end =new_start+this.numVisibleRows>=this.state.data.length?this.state.data.length-1:new_start+this.numVisibleRows;
        if (new_start!==this.state.start){
            needUpdate=true;
        }
        //Check if we need to change moths and load new data
        if (this.changingMonth(currentIndx,currentIndx+this.numVisibleDays)){
            months=this.calculateMonthData(currentIndx,currentIndx+this.numVisibleDays,new_nowposition)
            this.dataProvider.setCurrentPage(months.data[1].key)
            renderData=this.getDataToRender(months);
            if(renderData.length>0)
                new_containerStyle= this.getContainerStyle(renderData.length)
            needUpdate=true;
            
        }else{ 
            if(new_left !==-1)
                months=this.calculateMonthData(currentIndx,currentIndx+this.numVisibleDays,new_nowposition)
        }
        //If we need updates then change the state and the scroll position
        if (needUpdate){
            //Got you
            this.setState(
                this.state={
                    currentday:currentIndx,
                    nowposition:new_nowposition,
                    data:renderData,
                    startRow:new_start,
                    endRow:new_end,
                    months:months,
                    containerStyle:new_containerStyle,
                    scrollPos:this.refs.dataViewPort.refs.dataViewPort.scrollLeft
                }
            )
            if(new_left !==-1){
                this.state={
                    scrollPos:new_left
                }
                this.refs.dataViewPort.refs.dataViewPort.scrollLeft=new_left;
            }
        }
    }

    doMouseDown=(e)=>{
        if ((e.button === 0) && (!this.childDragging)) {
            this.dragging=true;
            this.draggingPosition=e.clientX;
        }
    }

    doMouseMove=(e)=>{
        if(this.dragging){
            let delta=this.draggingPosition-e.clientX;
            this.draggingPosition=e.clientX;
            this.refs.dataViewPort.refs.dataViewPort.scrollLeft=this.refs.dataViewPort.refs.dataViewPort.scrollLeft+delta;
        }
    }

    doMouseUp=(e)=>{
        this.dragging=false;
    }

    doMouseLeave=(e)=>{
        this.dragging=false;
    }

    //Child communicating states
    onChangeSize=(delta)=>{
      
        this.setState((prevState) => {
            let result={...prevState};
            result.sideStyle={width:result.sideStyle.width-delta};
            return result;
        })
        this.calculateVerticalScrollVariables()
    }

    onChildDrag=(dragging)=>{
        this.childDragging=dragging;
    }

    getContainerStyle(rows){
        let new_height=rows>0?rows * this.props.itemheight:10;
        return {height:new_height}
    }


    // DATA CHANGE

    getDataToRender=(months)=>{
        //For all visible months
        let result=[]
        months.data.forEach( item=>{
            result=[ ...result, ...this.dataProvider.getPage(item.key)] 

        })
        return result;
    }

    onPageLoad=()=>{
        let newdata=this.getDataToRender(this.state.months)
        let new_end =this.numVisibleRows>=newdata.length?newdata.length-1:this.numVisibleRows;//Duplication need centraise
        this.setState({
                data:newdata,
                containerStyle:this.getContainerStyle(newdata.length),
                endRow:new_end
                
            }
        )
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
                    data={this.state.data}/>
                <VerticalSpliter onChangeSize={this.onChangeSize}/>
            </div>       
            <div className="timeLine-main">
                <Header months={this.state.months} 
                        numVisibleDays={this.numVisibleDays}
                        currentday={this.state.currentday}
                        nowposition={this.state.nowposition}
                        dayWidth={this.props.dayWidth}
                        scrollPos={this.state.scrollPos}/>
                <DataViewPort 
                    ref='dataViewPort'
                    itemheight={this.props.itemheight}
                    nowposition={this.state.nowposition}
                    startRow={this.state.startRow}
                    endRow={this.state.endRow}
                    data={this.state.data}
                    onScroll={this.scollPos}  
                    onMouseDown={this.doMouseDown} 
                    onMouseMove={this.doMouseMove}
                    onMouseUp={this.doMouseUp} 
                    onMouseLeave ={this.doMouseLeave}/>
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