import React,{Component} from 'react'
import PropTypes from 'prop-types'
import moment  from 'moment'  
import TimeDataProvider from 'libs/provider/TimeDataProvider'
import VerticalSpliter from 'libs/components/VerticalSpliter'
import Header from 'libs/components/Headers'
import DataViewPort from 'libs/components/data/DataViewPort'
import TaskList,{VerticalLine} from 'libs/components/data/TaskList'
import {BUFFER_DAYS,DATA_CONTAINER_WIDTH} from 'libs/Const'
import './TimeLine.css'



class TimeLine extends Component{
    constructor(props){
        super(props);
        this.dragging=false;
        this.draggingPosition=0;
        //Initianlising Data Provider
        this.dataProvider=new TimeDataProvider();
        this.dataProvider.onPageLoad=this.onPageLoad;

        //This variable define the number of pixels the viewport can scroll till arrive to the end of the context
        this.pxToScroll=1900;
        //Initialising state
        this.state={
            currentday:0,//define what days is in the top-left of the view port      
            nowposition:0,//      
            startRow:0,//
            endRow:30,
            data:this.dataProvider.data,
            months:this.calculateMonthData(0,30,0),
            sideStyle:{width:200},
            scrollLeft:0,
            scrollTop:0,
            numVisibleRows:30,
            numVisibleDays:60,
            intialise:false
        }
    }

    componentDidMount(){
        let newdata=this.getDataToRender(this.state.months)
        let new_end =this.state.numVisibleRows>=newdata.length?newdata.length-1:this.state.numVisibleRows;//Duplication need centraise
        this.setState((prevState) => {
            let result={...prevState};
            result.data=newdata;
            result.endRow=new_end;
            return result;
        })
        this.dataProvider.setCurrentPage(this.state.months.data[1].key);
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


    calculateVerticalScrollVariables=(size)=>{
        //The pixel to scroll verically is equal to the pecentage of what the viewport represent in the context multiply by the context width
        this.pxToScroll=(1-(size.width/DATA_CONTAINER_WIDTH)) * DATA_CONTAINER_WIDTH-1;
    }
    
    onSize = size => {
        console.log('Resizing ', size.width)
        //If size has changed
        this.calculateVerticalScrollVariables(size);
        // if (!this.state.initialise)
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
        this.setState({
            numVisibleRows:Math.trunc(size.height / this.props.rowheight),
            numVisibleDays:Math.trunc(size.width / this.props.dayWidth)+BUFFER_DAYS
        })
    }
    //Interaction Events 
    verticalChange=(scrollTop)=>{ ///Needs serious refactoring to be able to centralise changes 
        if (scrollTop==this.state.scrollTop)
            return;
        //Check if we have scrolling rows
        let new_start=Math.trunc(scrollTop/this.props.itemheight)
        let new_end =new_start+this.state.numVisibleRows>=this.state.data.length?this.state.data.length-1:new_start+this.state.numVisibleRows;
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


    horizontalChange=(newScrollLeft)=>{
        let needUpdate=false;
        let new_nowposition=this.state.nowposition;
        let new_left=-1;
        let renderData=this.state.data;
        let months=this.state.months;
        let new_start=this.state.startRow;
        let new_end =this.state.endRow;
        
        //Check if we have run out of scroll
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
        //Check if we have are changing date
        let currentIndx=Math.trunc((newScrollLeft-this.state.nowposition) /this.props.dayWidth)
        // ++ when infinite scrolling OFfset
        if (currentIndx!==this.state.currentday){//We change days

        }
        
        //Check if we need to change moths and load new data
        if (this.changingMonth(currentIndx,currentIndx+this.state.numVisibleDays)){
            months=this.calculateMonthData(currentIndx,currentIndx+this.state.numVisibleDays,new_nowposition)
            this.dataProvider.setCurrentPage(months.data[1].key)
            renderData=this.getDataToRender(months);
        }else{ 
            if(new_left !=-1)
                months=this.calculateMonthData(currentIndx,currentIndx+this.state.numVisibleDays,new_nowposition)
        }


        new_start=Math.trunc(this.state.scrollTop/this.props.itemheight)
        new_end =new_start+this.state.numVisibleRows>=renderData.length?renderData.length-1:new_start+this.state.numVisibleRows;
        //If we need updates then change the state and the scroll position
        //Got you
        this.setState(
            this.state={
                currentday:currentIndx,
                nowposition:new_nowposition,
                data:renderData,
                months:months,
                scrollLeft: new_left,
                startRow:new_start,
                endRow:new_end,
        })
        
    }
    
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
    onChangeSize=(delta)=>{
        this.setState((prevState) => {
            let result={...prevState};
            result.sideStyle={width:result.sideStyle.width-delta};
            return result;
        })
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
        let new_end =this.state.numVisibleRows>=newdata.length?newdata.length-1:this.state.numVisibleRows;//Duplication need centraise
        this.setState({
                data:newdata,
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
                    data={this.state.data}
                    onScroll={this.verticalChange}/>
                <VerticalSpliter onChangeSize={this.onChangeSize}/>
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
                    data={this.state.data}
                    onScroll={this.scrollData}  
                    onMouseDown={this.doMouseDown} 
                    onMouseMove={this.doMouseMove}
                    onMouseUp={this.doMouseUp} 
                    onMouseLeave ={this.doMouseLeave}
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