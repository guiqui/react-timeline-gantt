import {BUFFER_DAYS} from 'libs/Const'
import moment  from 'moment'  
const MIL_IN_HOUR=1000*3600;
class DateHelper{
    constructor(){
        month:{};
    }

    dateToPixel(input,nowposition,daywidth){
        let nowDate=new Date();
        let inputTime=new Date(input);
        let timeDiff = inputTime.getTime() - nowDate.getTime();
        let pixelWeight=daywidth/24;
        return Math.ceil((timeDiff / (MIL_IN_HOUR )*pixelWeight))+nowposition;
    }
    pixelToDate(position,nowposition,daywidth){
        let hoursInPixel=24/daywidth;
        let pixelsFromNow=position-nowposition;
        let milisecondsFromNow=new Date().getTime()+pixelsFromNow*hoursInPixel*MIL_IN_HOUR;
        return new Date(milisecondsFromNow);
    }

    monthDiff(start,end){
        return  end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear()));
    }

    calculateMonthData(start,end,now,dayWidth){
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