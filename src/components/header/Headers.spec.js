import React from 'react';
import Headers from './Headers';
import DateHelper from '../../helpers/DateHelper';
import { BUFFER_DAYS } from '../../Const';
import { VIEW_MODE_DAY, VIEW_MODE_WEEK, VIEW_MODE_MONTH, VIEW_MODE_YEAR } from '../../Const';
import moment from 'moment';
import { shallow, mount } from 'enzyme';

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
    let startDate = moment().add(-BUFFER_DAYS, 'days');
    let endDate = moment().add(30 + BUFFER_DAYS, 'days');
    let years = endDate.year() - startDate.year() + 1;
    expect(wrapper.find('.header-top').children()).toHaveLength(years);
    let months = Math.ceil(endDate.diff(startDate, 'months', true));
    expect(wrapper.find('.header-middle').children()).toHaveLength(months);
    let weeks = Math.ceil(endDate.diff(startDate, 'weeks', true));
    expect(wrapper.find('.header-bottom').children()).toHaveLength(weeks+1);
  });
  it('When mode is month it draws correctly', () => {
    //calculateMonthData(start,end,now,dayWidth)
    let now = 0;
    let dayWidth = 30;
    const wrapper = shallow(
      <Headers numVisibleDays={30} currentday={0} nowposition={now} dayWidth={dayWidth} mode={VIEW_MODE_MONTH} scrollLeft={0} />
    );
    let startDate = moment().add(-BUFFER_DAYS, 'days');
    let endDate = moment().add(30 + BUFFER_DAYS, 'days');
    let months = Math.ceil(endDate.diff(startDate, 'months', true));
    expect(wrapper.find('.header-top').children()).toHaveLength(months);
    let days = Math.trunc(endDate.diff(startDate, 'days', true));
    expect(wrapper.find('.header-middle').children()).toHaveLength(days);

    expect(wrapper.find('.header-bottom').children()).toHaveLength(days);
  });
});
