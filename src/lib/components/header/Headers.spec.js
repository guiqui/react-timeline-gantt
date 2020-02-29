import React from 'react';
import Headers from './Headers';
import { BUFFER_DAYS } from 'libs/Const';
import { VIEW_MODE_MONTH, VIEW_MODE_YEAR } from 'libs/Const';
import { addDays, differenceInMonths, differenceInDays } from 'date-fns';
import { shallow } from 'enzyme';

describe('Header Init ', () => {
  it('It mount properly when no property is given', () => {
    const wrapper = shallow(<Headers />);
    expect(wrapper.find('.header-top').children()).toHaveLength(0);
    expect(wrapper.find('.header-middle').children()).toHaveLength(0);
    expect(wrapper.find('.header-bottom').children()).toHaveLength(0);
  });

  it('When mode is year it draws correctly', () => {
    //calculateMonthData(start,end,now,dayWidth)
    let now = 0;
    let dayWidth = 30;
    const wrapper = shallow(
      <Headers numVisibleDays={30} currentday={0} nowposition={now} dayWidth={dayWidth} mode={VIEW_MODE_YEAR} scrollLeft={0} />
    );
    let startDate = addDays(new Date(), -BUFFER_DAYS);
    let endDate = addDays(new Date(), 30 + BUFFER_DAYS);
    let years = getYear(endDate) - getYear(startDate) + 1;
    expect(wrapper.find('.header-top').children()).toHaveLength(years);
    let months = differenceInMonths(endDate, startDate);
    expect(wrapper.find('.header-middle').children()).toHaveLength(months);
    let weeks = differenceInWeeks(endDate, startDate);
    expect(wrapper.find('.header-bottom').children()).toHaveLength(weeks);
  });
  it('When mode is month it draws correctly', () => {
    //calculateMonthData(start,end,now,dayWidth)
    let now = 0;
    let dayWidth = 30;
    const wrapper = shallow(
      <Headers numVisibleDays={30} currentday={0} nowposition={now} dayWidth={dayWidth} mode={VIEW_MODE_MONTH} scrollLeft={0} />
    );
    let startDate = addDays(new Date(), -BUFFER_DAYS);
    let endDate = addDays(new Date(), 30 + BUFFER_DAYS);
    let months = differenceInMonths(endDate, startDate);
    expect(wrapper.find('.header-top').children()).toHaveLength(months);
    let days = Math.trunc(differenceInDays(startDate, endDate));
    expect(wrapper.find('.header-middle').children()).toHaveLength(days);

    expect(wrapper.find('.header-bottom').children()).toHaveLength(days);
  });
});
