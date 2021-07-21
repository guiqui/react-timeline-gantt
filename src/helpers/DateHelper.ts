const MIL_IN_HOUR = 1000 * 3600;
class DateHelper {
  dateToPixel(input: any, nowposition: number, daywidth: number) {
    let nowDate = this.getToday(); //
    let inputTime = new Date(input);

    //Day light saving patch
    let lightSavingDiff = (inputTime.getTimezoneOffset() - nowDate.getTimezoneOffset()) * 60 * 1000;
    let timeDiff = inputTime.getTime() - nowDate.getTime() - lightSavingDiff;
    let pixelWeight = daywidth / 24; //Value in pixels of one hour
    return (timeDiff / MIL_IN_HOUR) * pixelWeight + nowposition;
  }
  pixelToDate(position: number, nowposition: number, daywidth: number) {
    let hoursInPixel = 24 / daywidth;
    let pixelsFromNow = position - nowposition;
    let today = this.getToday();
    let milisecondsFromNow = today.getTime() + pixelsFromNow * hoursInPixel * MIL_IN_HOUR;
    let result = new Date(milisecondsFromNow);
    let lightSavingDiff = (result.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
    result.setTime(result.getTime() + lightSavingDiff);
    return result;
  }
  getToday() {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }
  monthDiff(start: any, end: any) {
    return Math.abs(end.getMonth() - start.getMonth() + 12 * (end.getFullYear() - start.getFullYear()));
  }

  daysInMonth(month: any, year: any) {
    return new Date(year, month, 0).getDate();
  }

  dayToPosition = (day: any, now: number, dayWidth: number) => {
    return day * dayWidth + now;
  };

  daysInYear = (year: number) => {
    return this.isLeapYear(year) ? 366 : 365;
  };

  isLeapYear(year: number) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }
}
const helper = new DateHelper();
export default helper;
