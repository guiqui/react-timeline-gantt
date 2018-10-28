  
const MIL_IN_HOUR=1000*3600;
class DateHelper{


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


    dayToPosition=(day,now,dayWidth)=>{
        return day * dayWidth +now;

    }

    daysInYear=(year)=> 
    {
        return this.isLeapYear(year) ? 366 : 365;
    }

    isLeapYear(year) {
        return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    }


}
const helper=new DateHelper();
export default helper;