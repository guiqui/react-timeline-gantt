class DateHelper{

    dateToPixel(input,nowposition){
        let nowDate=new Date();
        let inputTime=new Date(input);
        let timeDiff = inputTime.getTime() - nowDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 ))+nowposition;
    }
    pixelToDate(position,nowposition){
        let pixelsFromNow=position-nowposition;
        let milisecondsFromNow=new Date().getTime()+pixelsFromNow*1000 * 3600 ;
        return new Date(milisecondsFromNow);
    }
}
const helper=new DateHelper();
export default helper;