import {BUFFER_DAYS} from 'libs/Const'
import Config from 'libs/helpers/config/Config'
import moment  from 'moment'  
const MIL_IN_HOUR=1000*3600;
class DateHelper{
    constructor(){
        month:{};
    }

    dateToPixel(input,nowposition,daywidth){
        let nowDate=this.getToday();//
        let inputTime=new Date(input);

        //Day light saving patch
        let lightSavingDiff=(inputTime.getTimezoneOffset()-nowDate.getTimezoneOffset())*60*1000
        let timeDiff = inputTime.getTime() - nowDate.getTime()-lightSavingDiff;
        let pixelWeight=daywidth/24;//Value in pixels of one hour
        return (timeDiff / MIL_IN_HOUR )*pixelWeight+nowposition;
    }
    pixelToDate(position,nowposition,daywidth){
        let hoursInPixel=24/daywidth;
        let pixelsFromNow=position-nowposition;
        let today=this.getToday();
        let milisecondsFromNow=today.getTime()+pixelsFromNow*hoursInPixel*MIL_IN_HOUR;
        let result =new Date(milisecondsFromNow)
        let lightSavingDiff=(result.getTimezoneOffset()-today.getTimezoneOffset())*60*1000
        result.setTime(result.getTime() + lightSavingDiff);
        return result;
    }
    getToday(){
        let date =new Date()
        date.setHours(0,0,0,0);
        return date
    }
    monthDiff(start,end){
        return  Math.abs(end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear())));
    }

    daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }

    calculateCalendar(start,end,now,dayWidth){
        //startMonth daysinMonth 
        let result={}
        result['data']=[]
        result['keys']={}
    
        result.startLimit=this.dayToPosition((start-BUFFER_DAYS) ,now,dayWidth)
        result.endLimit=this.dayToPosition((end+BUFFER_DAYS) ,now,dayWidth)
        let currentMonth='';
        let currentKey='';
        for (let i=start-BUFFER_DAYS;i<end+BUFFER_DAYS;i++ ){
            currentMonth=moment().add(i, 'days')       ;
            currentKey=currentMonth.format("M-YYYY")     
            result['data'].push({
                key:currentKey,
                month:currentMonth.format(Config.values.header.month.dateFormat),
                left:this.dayToPosition(i-currentMonth.date()+1,now,dayWidth),
                width:currentMonth.daysInMonth()*dayWidth

            })
            result['keys'][currentKey]=currentKey;
            i=i+currentMonth.daysInMonth()-currentMonth.date();
        }
        return result;
    }

    dayToPosition=(day,now,dayWidth)=>{
        return day * dayWidth +now;

    }

}
const helper=new DateHelper();
export default helper;