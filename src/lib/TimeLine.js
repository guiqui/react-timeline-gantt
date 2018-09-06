import React,{Component} from 'react'
import PropTypes from 'prop-types'
import moment  from 'moment'  
import './TimeLine.css'
import TimeDataProvider from './TimeDataProvider'
//import { listTask } from '../../store/Actions';


//TimeHeader Components

class VerticalSpliter extends Component{
    constructor(props){
        super(props);
        this.doMouseMove=this.doMouseMove.bind(this)
        this.doMouseDown=this.doMouseDown.bind(this)
        this.doMouseUp=this.doMouseUp.bind(this)
        this.state={dragging:false}
    }

    doMouseDown(e){
        if (e.button === 0){
            this.draggingPosition=e.clientX;
            this.setState({dragging:true})
        }
    }

    componentDidUpdate(props, state) {
        if (this.state.dragging && !state.dragging) {
          document.addEventListener('mousemove', this.doMouseMove)
          document.addEventListener('mouseup', this.doMouseUp)
        } else if (!this.state.dragging && state.dragging) {
          document.removeEventListener('mousemove', this.doMouseMove)
          document.removeEventListener('mouseup', this.doMouseUp)
        }
      }

    doMouseMove(e){
       if(this.state.dragging){
            e.stopPropagation();
            let delta=this.draggingPosition-e.clientX;
            this.draggingPosition=e.clientX;
            this.props.onChangeSize(delta)
        }
    }

    doMouseUp(e){

        this.setState({dragging:false})
    }

    render(){
        return (
            <div className="verticalResizer"                 
                onMouseDown={this.doMouseDown}>   
                <div className="squareGrip"></div>
                <div className="squareGrip"></div>
                <div className="squareGrip"></div>
                <div className="squareGrip"></div>
            </div>)
    }
    
}


class HeaderMonthItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <div className="timeLine-main-header-month-item" style={{ left:this.props.left,width:this.props.width}}>
            {this.props.label}
        </div>)
    }
}


class HeaderDayItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <div className="timeLine-main-header-day-item" style={{ left:this.props.left}}>
            <div className="timeLine-main-header-day-week">
            {moment().add(this.props.day , 'days').format('dd')}
            </div>    
            <div className={this.props.day == 0 ? "timeLine-main-header-day-month timeLine-main-header-day-selected": "timeLine-main-header-day-month" }   >
            {moment().add(this.props.day , 'days').format('D')}
            </div>     
 
        </div>)
          
    }
}


//Data Components

class VerticalLine extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div className="timeLine-main-data-verticalLine" style={{left:this.props.left}}>
        </div> )
    }

}

class DataRow extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
        <div className="timeLine-main-data-row" 
            style={{top:this.props.top,height:this.props.itemheight}}>
        {this.props.children}
        </div>)    
    }
}



class DataTask extends React.Component{
    constructor(props){
        super(props);
        this.doMouseMove=this.doMouseMove.bind(this)
        this.doMouseDown=this.doMouseDown.bind(this)
        this.doMouseUp=this.doMouseUp.bind(this)
        this.calculateStyle=this.calculateStyle.bind(this)
        this.state={dragging:false}
    }

    doMouseDown(e){
        if (e.button === 0){
            console.log('Child Click')
            this.props.onChildDrag(true)
            this.draggingPosition=e.clientX;
            this.setState({dragging:true,
                           left:this.props.left});

        }
    }

    componentDidUpdate(props, state) {
        if (this.state.dragging && !state.dragging) {
          document.addEventListener('mousemove', this.doMouseMove)
          document.addEventListener('mouseup', this.doMouseUp)
        } else if (!this.state.dragging && state.dragging) {
          document.removeEventListener('mousemove', this.doMouseMove)
          document.removeEventListener('mouseup', this.doMouseUp)
        }
      }

    doMouseMove(e){
       if(this.state.dragging){
            let delta=this.draggingPosition-e.clientX;
            this.setState({left:this.state.left-delta})
            this.draggingPosition=e.clientX;
        }
    }

    doMouseUp(e){
        this.props.onChildDrag(false)
        this.setState({dragging:false})
    }
    
    calculateStyle(){

        if(this.state.dragging){
            return {backgroundColor: this.props.color,left:this.state.left,width:this.props.width}
        }else{
            return {backgroundColor: this.props.color,left:this.props.left,width:this.props.width}
        }
     
    }
    render(){
        return (
        <div className="timeLine-main-data-task" 
            onMouseDown={this.doMouseDown}
            style={this.calculateStyle()}>
            {/* {this.props.label} */}
        </div>)
          
    }
}



//Side Components
class SideRow extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <div className="timeLine-side-task-row" style={{top:this.props.top}}>
            {this.props.label}
        </div>)    
    }
}


const PxinDay=24;
const BUFFER_DAYS=2;
const LEFT_BOUNDARIES=3000;

/// The vertical scroll handler size  is  equal = (viewportLegnth/Contentlengh) * viewportLegnth
///                                                 Percentage of what vl represent * (multipli the percentage)
// we are in the middle of the content when the handler position is equal =(Contentlengh/2)-(handlerwidth/2)
class TimeLine extends Component{
    constructor(props){
        super(props);
        this.dragging=false;
        this.draggingPosition=0;

        //Binding the functions
        this.doMouseMove=this.doMouseMove.bind(this)
        this.doMouseDown=this.doMouseDown.bind(this)
        this.doMouseUp=this.doMouseUp.bind(this)
        this.doMouseLeave=this.doMouseLeave.bind(this)
        this.scollPos=this.scollPos.bind(this)
        this.dayToPosition=this.dayToPosition.bind(this)
        this.onChangeSize=this.onChangeSize.bind(this)
        this.onPageLoad=this.onPageLoad.bind(this)
        this.getDataToRender=this.getDataToRender.bind(this)
        this.changingMonth=this.changingMonth.bind(this)
        this.onChildDrag=this.onChildDrag.bind(this)
        this.calculateVerticalScrollVariables=this.calculateVerticalScrollVariables.bind(this)

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
            containerStyle:{height:10}
        }
    }

    componentDidMount(){
        this.numVisibleRows=Math.trunc(this.refs.dataViewPort.clientHeight / this.props.rowheight);
        this.numVisibleDays=Math.trunc(this.refs.dataViewPort.clientWidth / PxinDay)+BUFFER_DAYS;

        this.calculateVerticalScrollVariables();

        let middleScrollPosition=this.pxToScroll/2;
        //For middleNowPosition we get middleScrollPosition and we add half of the bar of the scroll
        let middleNowPosition=this.refs.dataContainer.clientWidth/2;
        ///Initialise bar to the middle and now position
        this.refs.dataViewPort.scrollLeft=middleScrollPosition;
        this.refs.timeHeaderViewPort.scrollLeft=this.refs.dataViewPort.scrollLeft;
        this.nowPosition=middleNowPosition;
        this.setState((prevState) => {
            let result={...prevState};
            result.nowposition=middleNowPosition
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
                width:currentMonth.daysInMonth()*PxinDay

            })
            result['keys'][currentKey]=currentKey;
            i=i+currentMonth.daysInMonth()-currentMonth.date();
        }
        return result;
    }

    changingMonth(start,end){
        let startMonth=moment().add(start, 'days').format("M-YYYY");  
        let endMonth=moment().add(end, 'days').format("M-YYYY");
        return (!(startMonth in this.state.months.keys) || !(endMonth in this.state.months.keys))
    }

    dayToPosition(day,now){
        return day * PxinDay +now;

    }
    dateToPixel(input){
        let nowDate=new Date();
        let inputTime=new Date(input);
        let timeDiff = inputTime.getTime() - nowDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 ))+this.state.nowposition;
    }

    calculateVerticalScrollVariables(){
        //The pixel to scroll verically is equal to the pecentage of what the viewport represent in the context multiply by the context width
        this.pxToScroll=(1-(this.refs.dataViewPort.clientWidth/this.refs.dataContainer.clientWidth)) * this.refs.dataContainer.clientWidth-1;
    }
    

    //Interaction Events 
    scollPos(e){ ///Needs serious refactoring to be able to centralise changes 
        e.preventDefault();
        this.refs.timeHeaderViewPort.scrollLeft=this.refs.dataViewPort.scrollLeft;
        this.refs.taskViewPort.scrollTop=this.refs.dataViewPort.scrollTop;
        let needUpdate=false;
        let new_nowposition=this.state.nowposition;
        let new_left=-1;
        let renderData=this.state.data;
        let months=this.state.months;
        let new_containerStyle=this.state.containerStyle;
        
        //Check if we have run out of scroll
        if (this.refs.dataViewPort.scrollLeft>this.pxToScroll){//ContenLegnth-viewportLengt
            needUpdate=true;
            new_nowposition=this.state.nowposition-this.pxToScroll
            new_left=0;
        } else{
            if (this.refs.dataViewPort.scrollLeft===0){//ContenLegnth-viewportLengt
                needUpdate=true;//This bug will be fixed once data to draw is filtered
                new_nowposition=this.state.nowposition+this.pxToScroll
                new_left=this.pxToScroll;
            }
        }
        //Check if we have are changing date
        let currentIndx=Math.trunc((this.refs.dataViewPort.scrollLeft-this.state.nowposition) /PxinDay)// ++ when infinite scrolling OFfset
        if (currentIndx!==this.state.currentday){//We change days
            needUpdate=true;
        }
        //Check if we have scrolling rows
        let new_start=Math.trunc(this.refs.dataViewPort.scrollTop/this.props.itemheight)
        let new_end =new_start+this.numVisibleRows>=this.state.data.length?this.state.data.length-1:new_start+this.numVisibleRows;
        if (new_start!==this.state.start){
            needUpdate=true;
        }
        //Check if we need to change moths and load new data
        if (this.changingMonth(currentIndx,currentIndx+this.numVisibleDays)){
            console.log('We need to change Month')
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
                    containerStyle:new_containerStyle
                }
            )
            if(new_left !==-1){
                this.refs.timeHeaderViewPort.scrollLeft=new_left;
                this.refs.dataViewPort.scrollLeft=new_left;
            }
        }
    }

    doMouseDown(e){
        if ((e.button === 0) && (!this.childDragging)) {
            this.dragging=true;
            this.draggingPosition=e.clientX;
            console.log('Parent Click')
        }
    }

    doMouseMove(e){
        if(this.dragging){
            let delta=this.draggingPosition-e.clientX;
            this.draggingPosition=e.clientX;
            this.refs.dataViewPort.scrollLeft=this.refs.dataViewPort.scrollLeft+delta;
        }
    }

    doMouseUp(e){
        this.dragging=false;
    }

    doMouseLeave(e){
        this.dragging=false;
    }

    //Child communicating states
    onChangeSize(delta){
      
        this.setState((prevState) => {
            let result={...prevState};
            result.sideStyle={width:result.sideStyle.width-delta};
            return result;
        })
        this.calculateVerticalScrollVariables()
    }

    onChildDrag(dragging){
        this.childDragging=dragging;
    }

    getContainerStyle(rows){
        let new_height=rows>0?rows * this.props.itemheight:10;
        return {height:new_height}
    }


    // DATA CHANGE

    getDataToRender(months){
        //For all visible months
        let result=[]
        months.data.forEach( item=>{
            result=[ ...result, ...this.dataProvider.getPage(item.key)] 

        })
        return result;
    }

    onPageLoad(){
        let newdata=this.getDataToRender(this.state.months)
        let new_end =this.numVisibleRows>=newdata.length?newdata.length-1:this.numVisibleRows;//Duplication need centraise
        this.setState({
                data:newdata,
                containerStyle:this.getContainerStyle(newdata.length),
                endRow:new_end
                
            }
        )
    }

    //Render Methods
    renderMonth(){
        return this.state.months.data.map(item=>{
            return <HeaderMonthItem key={item.month} left={item.left}   width={item.width}  label={item.month}/>
        })

    }
    renderTimeHeader(){
        let result=[];
        for (let i=-BUFFER_DAYS;i<this.numVisibleDays;i++){
            let leftvalue =(this.state.currentday+i)*PxinDay+this.state.nowposition;
            result.push(<HeaderDayItem key={this.state.currentday+i} day={this.state.currentday+i}   left={leftvalue}/>);
        }
        return result;
    }
    renderRows(){
        let result=[];
        for (let i=this.state.startRow;i<this.state.endRow+1;i++){
            let item=this.state.data[i];
            if(!item) break
            let new_position=this.dateToPixel(item.start);
            let new_width=this.dateToPixel(item.end)-new_position;
            if (new_position<LEFT_BOUNDARIES){
                result.push(<DataRow key={i} label={item.name} top={i*this.props.itemheight} left={20} itemheight={this.props.itemheight} ><DataTask label={item.name}  color={item.color} left={new_position} width={new_width} onChildDrag={this.onChildDrag} > </DataTask> </DataRow>);
            }else{
                result.push(<DataRow key={i} label={item.name} top={i*this.props.itemheight} left={20} itemheight={this.props.itemheight} > </DataRow>);
            }
        }
        return result;
    }
    renderSiderow(){
        let result=[];
        for (let i=this.state.startRow;i<this.state.endRow+1;i++){
            let item=this.state.data[i];
            if(!item) break
            result.push(<SideRow key={i} label={item.name} top={i*this.props.itemheight} itemheight={this.props.itemheight} ></SideRow>);
        }
        return result;
    }
   
    render(){
        console.log("Rendering")
        return (
        <div className="timeLine">   
            <div className="timeLine-side-main" style={this.state.sideStyle}> 
                <div className="timeLine-side"> 
                    <div className="timeLine-side-title">
                        <div>
                            My tasks todo
                        </div>  
                    </div>    
                    <div ref="taskViewPort"  className="timeLine-side-task-viewPort" >                
                        <div className="timeLine-side-task-container" style={this.state.containerStyle}>                   
                            { this.renderSiderow() }
                        </div> 
                    </div>
                </div> 
                <VerticalSpliter onChangeSize={this.onChangeSize}/>
            </div>       
            <div className="timeLine-main">
                <div ref="timeHeaderViewPort" className="timeLine-main-header-viewPort">
                    <div  className="timeLine-main-header-container">
                        {this.renderMonth()} 
                        {this.renderTimeHeader()} 
                    </div>
                </div>
                <div ref="dataViewPort"  className="timeLine-main-data-viewPort" onScroll={this.scollPos}  
                    onMouseDown={this.doMouseDown} 
                    onMouseMove={this.doMouseMove}
                    onMouseUp={this.doMouseUp} 
                    onMouseLeave ={this.doMouseLeave}>                
                    <div ref="dataContainer" className="timeLine-main-data-container" style={this.state.containerStyle}>                   
                        {this.renderRows()} 
                    </div>
                </div>
            </div>
        </div>)
    }

}

TimeLine.propTypes = {
    itemheight: PropTypes.number.isRequired
  };

TimeLine.defaultProps = {
    itemheight:20
  };

export default TimeLine