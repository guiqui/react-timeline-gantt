import React,{PureComponent} from 'react'
import moment from  'moment'
import {HEADERS_MONTH_BUFFER_DAYS,HEADERS_YEAR_BUFFER_DAYS,DATA_CONTAINER_WIDTH} from 'libs/Const'
import {VIEW_MODE_DAY,VIEW_MODE_WEEK,VIEW_MODE_MONTH,VIEW_MODE_YEAR}from 'libs/Const'
import {HOUR_DAY_WEEK,HOUR_DAY_DAY}from 'libs/Const'
import Config from 'libs/helpers/config/Config'
import DateHelper from 'libs/helpers/DateHelper'
import './Header.css'


// export class HeaderDayItem extends PureComponent{
//     constructor(props){
//         super(props);
//     }
//     getFormat=()=>{
//         return this.props.mode==VIEW_MODE_MONTH?'dd':'dddd D';
//     }

//     renderMonthMode=()=>{
//         let style=  Config.values.header.dayTime.style;
//         style=this.props.day == 0 ?{...style,...Config.values.header.dayTime.selectedStyle}:style
//         return  <div className="timeLine-main-header-day-month" style={style}>
//                     {moment().add(this.props.day , 'days').format('D')}
//                 </div>  
//     }

//     renderWeekMode=()=>{
//         let result=[]
//         for(let i=0;i<24;i++){
//             result.push(<div key={i} className="timeLine-main-header-time-item" style={{...Config.values.header.dayTime.style,width:HOUR_DAY_WEEK}}>{i}</div>)
//         }
//         return result;
//     }

//     renderTimeWeek=()=>{
//         return <div className="timeLine-main-header-time">
//                 {this.renderWeekMode()}
//             </div>  
//     }

//     renderDayMode=()=>{
//         let result=[]
//         for(let i=0;i<24;i++){
//             result.push(<div key={i} className="timeLine-main-header-time-item" style={{...Config.values.header.dayTime.style,width:HOUR_DAY_DAY}}>{`${i}:00`}</div>)
//         }
//         return result;
//     }


//     renderBottomInfo=()=>{
//         switch(this.props.mode){
//             case VIEW_MODE_YEAR:
//                 //return this.renderYearMode()
//             case VIEW_MODE_MONTH:
//                 return this.renderMonthMode()
//             case VIEW_MODE_WEEK:
//                 return <div className="timeLine-main-header-time">
//                         {this.renderWeekMode()}
//                         </div>  
//             case VIEW_MODE_DAY:
//                 return <div className="timeLine-main-header-time">
//                         {this.renderDayMode()}
//                         </div>  
//             default:
//                 return this.renderMonthMode()
//         }
//     }

//     render(){
//         return (
//         <div className="timeLine-main-header-day-item" style={{ left:this.props.left,width:this.props.width}}>
//             <div className="timeLine-main-header-day-week"  style={Config.values.header.dayOfWeek.style} >
//             {moment().add(this.props.day , 'days').format(this.getFormat())}
//             </div>    
//             {this.renderBottomInfo()} 
 
//         </div>)
          
//     }
// }

export class HeaderItem extends PureComponent{
    constructor(props){
        super(props);
        
    }
    render(){
        return (
        <div  style={{ display: 'flex',justifyContent:'center',alignItems:'center', borderLeft:'solid 1px white',position:'absolute',height:20,left:this.props.left,width:this.props.width}}>
            <div>
            {this.props.label}
            </div>
        </div>)
    }
}


export default class Header extends PureComponent {
    constructor (props){
        super(props)
    }




    getFormat(mode,position){

        switch (mode){
            case 'year':
                return 'YYYY'
            case 'month':
                if (position =='top')
                    return 'M-YYYY'
                else
                    return 'MMMM' 
            case 'week':
                if (position =='top')
                    return 'ww M-YYYY'
                else
                    return 'ww'
            case 'dayweek':
                return 'dd'
            case 'daymonth':
                return 'D'
            
        }

       

    }

    getModeIncrement(date,mode){
        switch (mode){
            case 'year':
                return DateHelper.daysInYear(date.year())
            case 'month':
                return date.daysInMonth()
            case 'week':
                return 7;
            default: 
                return 1;
        }
    }


    getStartDate=(date,mode)=>{
        let year=null;
        switch (mode){
            case 'year':
                year=date.year();
                return moment([year, 0, 1]);
            case 'month':
                year=date.year();
                let month=date.month();
                return moment([year, month, 1]);
            case 'week':
               
                return date.subtract(date.day(), 'days')
            default:
                return date
        
        }
    }



    getBox(date,mode,lastLeft){
        let increment=this.getModeIncrement(date,mode)*this.props.dayWidth
        if(!lastLeft){
            let starDate=this.getStartDate(date,mode)
            starDate=starDate.startOf('day')
            let now =moment().startOf('day')
            let daysInBetween=starDate.diff(now,'days');
            lastLeft=DateHelper.dayToPosition(daysInBetween,this.props.nowposition,this.props.dayWidth);
     
                
        }
        
        return {left:lastLeft,width:increment} 
    }

    renderHeaderRows=(top,middle,bottom)=>{
        let result ={"top":[],"middle":[],"bottom":[]}
        let lastLeft ={}
        let currentTop=""
        let currentMiddle=""
        let currentBottom=""
        let currentDate=null;
        let box=null

        let start=this.props.currentday;
        let end=start+this.props.numVisibleDays;
       
        for (let i=start-HEADERS_YEAR_BUFFER_DAYS;i<end+HEADERS_YEAR_BUFFER_DAYS;i++ ){
            //The unit of iteration is day 
            currentDate=moment().add(i, 'days')       
            if (currentTop!=currentDate.format(this.getFormat(top),'top')){
                currentTop=currentDate.format(this.getFormat(top),'top');
                box=this.getBox(currentDate,top,lastLeft.top)
                lastLeft.top=box.left+box.width;
                result.top.push(<HeaderItem key={i} left={box.left}   width={box.width}  label={currentTop}/>)
            }

            if (currentMiddle!=currentDate.format(this.getFormat(middle))){
                currentMiddle=currentDate.format(this.getFormat(middle));
                box=this.getBox(currentDate,middle,lastLeft.middle)
                lastLeft.middle=box.left+box.width;
                result.middle.push(<HeaderItem key={i} left={box.left}   width={box.width}  label={currentMiddle}/>)
            }

            if (currentBottom!=currentDate.format(this.getFormat(bottom))){
                currentBottom=currentDate.format(this.getFormat(bottom));
                box=this.getBox(currentDate,bottom,lastLeft.bottom)
                lastLeft.bottom=box.left+box.width;
                result.bottom.push(<HeaderItem key={i} left={box.left}   width={box.width}  label={currentBottom}/>)
            }            
    
        }

        return (<div  className="timeLine-main-header-container" style={{width:DATA_CONTAINER_WIDTH,maxWidth:DATA_CONTAINER_WIDTH}}>
                    <div className="header-top"  style={{...Config.values.header.top.style}}>
                        {result.top}
                    </div>
                    <div className="header-middle" style={{...Config.values.header.middle.style}} >
                        {result.middle}
                    </div>
                    <div className="header-bottom" style={{...Config.values.header.bottom.style}}>
                        {result.bottom}
                    </div>
                </div>
                )
        
        

    }

    renderHeader=()=>{
        switch (this.props.mode){
            case VIEW_MODE_DAY:
                return this.renderHeaderRows('week','dayweek','fulltime')
            case VIEW_MODE_WEEK:
                return this.renderHeaderRows('week','dayweek','shorttime')
            case VIEW_MODE_MONTH:
                return  this.renderHeaderRows('month','dayweek','daymonth')
            case VIEW_MODE_YEAR:
                return this.renderHeaderRows('year','month','week')
        }
        
    }

    render(){
        if (this.refs.Header)
            this.refs.Header.scrollLeft=this.props.scrollLeft;
    
        return  <div id="timeline-header" ref="Header"  className="timeLine-main-header-viewPort">
                    {this.renderHeader()}
                </div>
    }
}

