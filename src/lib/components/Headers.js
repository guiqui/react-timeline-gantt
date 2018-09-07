import React,{Component} from 'react'
import moment from  'moment'
import {BUFFER_DAYS} from 'libs/Const'


export class HeaderMonthItem extends Component{
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


export class HeaderDayItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <div className="timeLine-main-header-day-item" style={{ left:this.props.left,width:this.props.width}}>
            <div className="timeLine-main-header-day-week">
            {moment().add(this.props.day , 'days').format('dd')}
            </div>    
            <div className={this.props.day == 0 ? "timeLine-main-header-day-month timeLine-main-header-day-selected": "timeLine-main-header-day-month" }   >
            {moment().add(this.props.day , 'days').format('D')}
            </div>     
 
        </div>)
          
    }
}
export default class Header extends Component {
    constructor (props){
        super(props)
    }
        //Render Methods
    renderMonth(){
        
        
        return this.props.months.data.map(item=>{
            return <HeaderMonthItem key={item.month} left={item.left}   width={item.width}  label={item.month}/>
        })

    }
    renderTimeHeader(){
        let result=[];
        for (let i=-BUFFER_DAYS;i<this.props.numVisibleDays;i++){
            let leftvalue =(this.props.currentday+i)*this.props.dayWidth+this.props.nowposition;
            result.push(<HeaderDayItem key={this.props.currentday+i} day={this.props.currentday+i} width={this.props.dayWidth}  left={leftvalue}/>);
        }
        return result;
    }
    render(){
        if (this.refs.Header)
            this.refs.Header.scrollLeft=this.props.scrollPos;
        
        return  <div ref="Header" 
                    className="timeLine-main-header-viewPort">
                    <div  className="timeLine-main-header-container">
                        {this.renderMonth()} 
                        {this.renderTimeHeader()} 
                    </div>
                </div>
    }
}