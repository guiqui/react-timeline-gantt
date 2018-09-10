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
}
const helper=new DateHelper();
export default helper;