import React,{Component} from 'react'
import moment from  'moment'
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
