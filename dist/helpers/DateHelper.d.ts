declare class DateHelper {
    dateToPixel(input: any, nowposition: number, daywidth: number): number;
    pixelToDate(position: number, nowposition: number, daywidth: number): Date;
    getToday(): Date;
    monthDiff(start: any, end: any): number;
    daysInMonth(month: any, year: any): number;
    dayToPosition: (day: any, now: number, dayWidth: number) => number;
    daysInYear: (year: number) => 366 | 365;
    isLeapYear(year: number): boolean;
}
declare const helper: DateHelper;
export default helper;
