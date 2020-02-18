import DateHelper from 'libs/helpers/DateHelper';
const DAY_WIDTH = 24;

describe('Test DateToPixel Fuctionality', () => {
  test('Test get today ', () => {
    let result = DateHelper.getToday();
    let today = new Date();
    expect(result.getDay()).toBe(today.getDay());
    expect(result.getMonth()).toBe(today.getMonth());
    expect(result.getFullYear()).toBe(today.getFullYear());
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
  });

  test('When Today and now position  0', () => {
    let result = DateHelper.dateToPixel(DateHelper.getToday(), 0, DAY_WIDTH);
    expect(result).toBe(0);
  });
  test('When Today and now position  100 ', () => {
    let result = DateHelper.dateToPixel(DateHelper.getToday(), 100, DAY_WIDTH);
    expect(result).toBe(100);
  });
  test('When tomorrow and now position 0', () => {
    let tomorrow = DateHelper.getToday();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let result = DateHelper.dateToPixel(tomorrow, 0, DAY_WIDTH);
    expect(result).toBe(DAY_WIDTH);
  });
  test('When tomorrow and now position 100', () => {
    let tomorrow = DateHelper.getToday();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let result = DateHelper.dateToPixel(tomorrow, 100, DAY_WIDTH);
    expect(result).toBe(124);
  });
  test('When yesterday and now position 0', () => {
    let yesterday = DateHelper.getToday();
    yesterday.setDate(yesterday.getDate() - 1);
    let result = DateHelper.dateToPixel(yesterday, 0, DAY_WIDTH);
    expect(result).toBe(-DAY_WIDTH);
  });
  test('When yesterday and now position 100', () => {
    let yesterday = DateHelper.getToday();
    yesterday.setDate(yesterday.getDate() - 1);
    let result = DateHelper.dateToPixel(yesterday, 100, DAY_WIDTH);
    expect(result).toBe(76);
  });
});

describe('Test DateToPixel Fuctionality', () => {
  test('When Today and now position  0', () => {
    let now = DateHelper.getToday();
    let result = DateHelper.dateToPixel(now, 0, DAY_WIDTH);
    result = DateHelper.pixelToDate(result, 0, DAY_WIDTH);
    expect(now.getTime() - result.getTime() < 10).toBe(true);
  });
  test('When Today and now position  100 ', () => {
    let now = DateHelper.getToday();
    let result = DateHelper.dateToPixel(now, 100, DAY_WIDTH);
    result = DateHelper.pixelToDate(result, 100, DAY_WIDTH);
    expect(now.getTime() - result.getTime() < 10).toBe(true);
  });
  test('When tomorrow and now position 0', () => {
    let tomorrow = DateHelper.getToday();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let result = DateHelper.dateToPixel(tomorrow, 0, DAY_WIDTH);
    result = DateHelper.pixelToDate(result, 0, DAY_WIDTH);
    expect(tomorrow.getTime() - result.getTime() < 10).toBe(true);
  });
  test('When tomorrow and now position 100', () => {
    let tomorrow = DateHelper.getToday();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let result = DateHelper.dateToPixel(tomorrow, 100, DAY_WIDTH);
    result = DateHelper.pixelToDate(result, 100, DAY_WIDTH);
    expect(tomorrow.getTime() - result.getTime() < 10).toBe(true);
  });
});

describe('Test date difference', () => {
  test('Test with in the same month', () => {
    //(start,end,now,dayWidth)
    let start = new Date(2018, 9, 8);
    let end = new Date(2018, 9, 18);
    let result = DateHelper.monthDiff(start, end);
    expect(result).toBe(0);
  });

  test('Test different month same year', () => {
    //(start,end,now,dayWidth)
    let start = new Date(2018, 9, 8);
    let end = new Date(2018, 11, 18);
    let result = DateHelper.monthDiff(start, end);
    expect(result).toBe(2);
  });
  test('Test different month same year', () => {
    //(start,end,now,dayWidth)
    let start = new Date(2018, 9, 8);
    let end = new Date(2019, 11, 18);
    let result = DateHelper.monthDiff(start, end);
    expect(result).toBe(14);
  });
  test('Test different  start > end', () => {
    //(start,end,now,dayWidth)
    let start = new Date(2019, 9, 8);
    let end = new Date(2018, 11, 18);
    let result = DateHelper.monthDiff(start, end);
    expect(result).toBe(10);
  });
});
