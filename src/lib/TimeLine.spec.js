import React from 'react';
import TimeLine from './TimeLine';
import { BUFFER_DAYS, DATA_CONTAINER_WIDTH } from 'libs/Const';
import { shallow, mount } from 'enzyme';

describe('TimeLine Initialization ', function() {
  it('Initilise properly when all properties are null', () => {
    const wrapper = shallow(<TimeLine />);
    expect(wrapper.find('.timeLine')).toBeDefined();
    expect(wrapper.find('.timeLine-main')).toBeDefined();
  });

  it('Initialise on Size', () => {
    let itemheight = 30;
    let data = [{ name: `Task Today`, start: new Date(), end: new Date().setDate(new Date().getDate(), 5), color: 'red' }];
    let onNeedData = (start, end) => {
      return data;
    };
    const wrapper = shallow(<TimeLine data={data} itemheight={itemheight} onNeedData={onNeedData} />);
    //This needs to be improve
    expect(wrapper.state().currentday).toBe(0);
    expect(wrapper.state().nowposition).toBe(0);
    expect(wrapper.state().startRow).toBe(0);
    expect(wrapper.state().endRow).toBe(1);
    expect(wrapper.state().scrollLeft).toBe(0);
    expect(wrapper.state().numVisibleRows).toBe(40);
    expect(wrapper.state().numVisibleDays).toBe(60);
    expect(wrapper.instance().initialise).toBe(false);
    wrapper.instance().onSize({ width: 500, height: 500 });
    expect(wrapper.instance().initialise).toBe(true);
    expect(wrapper.state().startRow).toBe(0);
    expect(wrapper.state().numVisibleRows).toBe(Math.ceil(500 / itemheight));
    expect(wrapper.state().numVisibleDays).toBe(Math.ceil(500 / 24) + BUFFER_DAYS);
    expect(wrapper.instance().pxToScroll).toBe((1 - 500 / DATA_CONTAINER_WIDTH) * DATA_CONTAINER_WIDTH - 1);
    wrapper.instance().onSize({ width: 500, height: 1000 });
    expect(wrapper.state().numVisibleRows).toBe(Math.ceil(1000 / itemheight));
    expect(wrapper.state().endRow).toBe(1);
  });
});

describe('TimeLine Scroll left ', function() {
  it('Initilise properly when all properties are null', () => {
    const wrapper = shallow(<TimeLine />);
    expect(wrapper.find('.timeLine')).toBeDefined();
    expect(wrapper.find('.timeLine-main')).toBeDefined();
  });

  it('Render and handle mouse move right and Right', () => {
    let itemheight = 30;

    let data = [{ name: `Task Today`, start: new Date(), end: new Date().setDate(new Date().getDate(), 5), color: 'red' }];
    let onNeedData = (start, end) => {
      return data;
    };
    const wrapper = mount(<TimeLine data={data} itemheight={itemheight} links={[]} onNeedData={onNeedData} />);
    wrapper.instance().onSize({ width: 500, height: 500 });
    expect(wrapper.state().nowposition).toBe(0);
    expect(wrapper.state().scrollLeft).toBe(0);
    expect(wrapper.instance().dragging).toBe(false);
    wrapper.instance().doMouseDown({ clientX: 0 });
    expect(wrapper.instance().dragging).toBe(true);
    wrapper.instance().doMouseMove({ clientX: -10 });
    expect(wrapper.state().nowposition).toBe(0);
    expect(wrapper.state().scrollLeft).toBe(10);
    wrapper.instance().doMouseMove({ clientX: -20 });
    expect(wrapper.state().nowposition).toBe(0);
    expect(wrapper.state().scrollLeft).toBe(20);
    wrapper.instance().doMouseMove({ clientX: -5000 });
    expect(wrapper.state().nowposition).toBe(-4999);
    expect(wrapper.state().scrollLeft).toBe(0);
    wrapper.instance().doMouseMove({ clientX: 10 });
    expect(wrapper.state().nowposition).toBe(0);
    expect(wrapper.state().scrollLeft).toBe(4999);
    wrapper.instance().doMouseMove({ clientX: 5020 });
    expect(wrapper.state().nowposition).toBe(4999);
    expect(wrapper.state().scrollLeft).toBe(4999);
    wrapper.instance().doMouseMove({ clientX: 5030 });
    expect(wrapper.state().nowposition).toBe(4999);
    expect(wrapper.state().scrollLeft).toBe(4989);
    wrapper.instance().doMouseUp();
    expect(wrapper.instance().dragging).toBe(false);

    wrapper.instance().doMouseDown({ clientX: 0 });
    expect(wrapper.instance().dragging).toBe(true);
    wrapper.instance().doMouseMove({ clientX: -10 });
    expect(wrapper.state().nowposition).toBe(4999);
    expect(wrapper.state().scrollLeft).toBe(4999);
    wrapper.instance().doMouseLeave();
    expect(wrapper.instance().dragging).toBe(false);
    wrapper.unmount();
  });
});

describe('TimeLine Scroll Up ', function() {
  it('Calculate Num of visible rows properly', () => {
    let itemheight = 30;

    let data = [];
    for (let i = 0; i < 20; i++) {
      data.push({ name: `Task Today`, start: new Date(), end: new Date().setDate(new Date().getDate(), 5), color: 'red' });
    }
    let onNeedData = (start, end) => {
      return data;
    };
    const wrapper = shallow(<TimeLine data={data} itemheight={itemheight} onNeedData={onNeedData} />);
    wrapper.instance().onSize({ width: 500, height: 500 });
    expect(wrapper.state().nowposition).toBe(0);
    expect(wrapper.state().scrollTop).toBe(0);
    expect(wrapper.state().startRow).toBe(0);
    expect(wrapper.state().endRow).toBe(17);
    expect(wrapper.state().size.width).toBe(500);
    let numVisibleRows = Math.ceil(500 / itemheight);
    expect(wrapper.state().numVisibleRows).toBe(numVisibleRows);
    //Test moving 10
    wrapper.instance().verticalChange(10);
    expect(wrapper.state().scrollTop).toBe(10);
    expect(wrapper.state().startRow).toBe(0);
    expect(wrapper.state().endRow).toBe(numVisibleRows);
    //Tes send same scroll
    expect(wrapper.state().scrollTop).toBe(10);
    expect(wrapper.state().startRow).toBe(0);
    expect(wrapper.state().endRow).toBe(numVisibleRows);
    wrapper.instance().verticalChange(31);
    expect(wrapper.state().scrollTop).toBe(31);
    expect(wrapper.state().startRow).toBe(1);
    expect(wrapper.state().endRow).toBe(numVisibleRows + 1);
    wrapper.instance().verticalChange(61);
    expect(wrapper.state().scrollTop).toBe(61);
    expect(wrapper.state().startRow).toBe(2);
    expect(wrapper.state().endRow).toBe(numVisibleRows + 2);
    wrapper.instance().verticalChange(451);
    expect(wrapper.state().scrollTop).toBe(451);
    expect(wrapper.state().startRow).toBe(15);
    expect(wrapper.state().endRow).toBe(numVisibleRows + 3);
    wrapper.instance().verticalChange(481);
    expect(wrapper.state().scrollTop).toBe(481);
    expect(wrapper.state().startRow).toBe(16);
    expect(wrapper.state().endRow).toBe(numVisibleRows + 3);
  });
});

describe('Testing onTaskListSizing ', function() {
  it('recalculate width properly whe moving vertical Bar', () => {
    let itemheight = 30;
    let data = [];
    for (let i = 0; i < 20; i++) {
      data.push({ name: `Task Today`, start: new Date(), end: new Date().setDate(new Date().getDate(), 5), color: 'red' });
    }
    let onNeedData = (start, end) => {
      return data;
    };
    const wrapper = shallow(<TimeLine data={data} itemheight={itemheight} onNeedData={onNeedData} />);
    wrapper.instance().onSize({ width: 500, height: 500 });
    expect(wrapper.state().sideStyle.width).toBe(200);
    wrapper.instance().onTaskListSizing(10);
    expect(wrapper.state().sideStyle.width).toBe(190);
    wrapper.instance().onTaskListSizing(-20);
    expect(wrapper.state().sideStyle.width).toBe(210);
  });
});

describe('Testing Mode change ', function() {
  it('It change mode properly when the component has not scroll ', () => {
    let itemheight = 30;
    let data = [];
    for (let i = 0; i < 20; i++) {
      data.push({ name: `Task Today`, start: new Date(), end: new Date().setDate(new Date().getDate(), 5), color: 'red' });
    }
    let onNeedData = (start, end) => {
      return data;
    };
    const wrapper = shallow(<TimeLine data={data} itemheight={itemheight} onNeedData={onNeedData} />);
    wrapper.instance().onSize({ width: 500, height: 500 });
    expect(wrapper.state().nowposition).toBe(0);
    expect(wrapper.state().scrollLeft).toBe(0);
    expect(wrapper.state().numVisibleDays).toBe(51);
    expect(wrapper.state().numVisibleRows).toBe(17);
    expect(wrapper.state().mode).toBe('month');
    wrapper.setProps({ mode: 'week' });
    wrapper.instance().checkMode();
    expect(wrapper.state().nowposition).toBe(-0);
    expect(wrapper.state().scrollLeft).toBe(0);
    expect(wrapper.state().numVisibleRows).toBe(17);
    expect(wrapper.state().numVisibleDays).toBe(32);
    wrapper.setProps({ mode: 'day' });
    wrapper.instance().checkMode();
    expect(wrapper.state().mode).toBe('day');
    expect(wrapper.state().nowposition).toBe(-0);
    expect(wrapper.state().scrollLeft).toBe(0);
    expect(wrapper.state().numVisibleRows).toBe(17);
    expect(wrapper.state().numVisibleDays).toBe(31);
  });

  it('It change mode properly when the component has scroll left', () => {
    let itemheight = 30;
    let data = [];
    for (let i = 0; i < 20; i++) {
      data.push({ name: `Task Today`, start: new Date(), end: new Date().setDate(new Date().getDate(), 5), color: 'red' });
    }
    let onNeedData = (start, end) => {
      return data;
    };
    const wrapper = shallow(<TimeLine data={data} itemheight={itemheight} onNeedData={onNeedData} />);
    wrapper.instance().onSize({ width: 500, height: 500 });
    wrapper.instance().doMouseDown({ clientX: 0 });
    wrapper.instance().doMouseMove({ clientX: 501 });
    wrapper.instance().doMouseUp();
    expect(wrapper.state().nowposition).toBe(4499);
    expect(wrapper.state().scrollLeft).toBe(4499);
    expect(wrapper.state().numVisibleDays).toBe(51);
    expect(wrapper.state().numVisibleRows).toBe(17);
    expect(wrapper.state().mode).toBe('month');
    wrapper.setProps({ mode: 'week' });
    wrapper.instance().checkMode();
    expect(wrapper.state().nowposition).toBe(13497);
    expect(wrapper.state().scrollLeft).toBe(3897);
    expect(wrapper.state().numVisibleRows).toBe(17);
    expect(wrapper.state().numVisibleDays).toBe(32);
    wrapper.setProps({ mode: 'day' });
    wrapper.instance().checkMode();
    expect(wrapper.state().mode).toBe('day');
    expect(wrapper.state().nowposition).toBe(31493);
    expect(wrapper.state().scrollLeft).toBe(2693);
    expect(wrapper.state().numVisibleRows).toBe(17);
    expect(wrapper.state().numVisibleDays).toBe(31);
  });
});
