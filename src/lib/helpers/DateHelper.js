class DateHelper{

    dateToPixel(input,nowposition,daywidth){
        let nowDate=new Date();
        let inputTime=new Date(input);
        let timeDiff = inputTime.getTime() - nowDate.getTime();
        let pixelWeight=daywidth/24;
        return Math.ceil((timeDiff / (1000 * 3600 )*pixelWeight))+nowposition;
    }
    pixelToDate(position,nowposition){
        let pixelsFromNow=position-nowposition;
        let milisecondsFromNow=new Date().getTime()+pixelsFromNow*1000 * 3600 ;
        return new Date(milisecondsFromNow);
    }
}
const helper=new DateHelper();
export default helper;