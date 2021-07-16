import React from 'react';
import DataTask from './DataTask';
import DateHelper from '../../helpers/DateHelper';
import { MODE_NONE, MODE_MOVE, MOVE_RESIZE_LEFT, MOVE_RESIZE_RIGHT } from '../../Const';
import { LINK_POS_LEFT, LINK_POS_RIGHT } from '../../Const';
import { shallow } from 'enzyme';

describe('Testing Firing Events ', function() {
  it('Initialise Properly and not null pointer', () => {
    const wrapper = shallow(<DataTask item={{}} />);
    expect(wrapper.find('.timeLine-main-data-task')).toBeDefined();
  });

  it('Initialise Properly and not null pointer', () => {
    const wrapper = shallow(<DataTask left={0} item={{}} width={80} color="red" />);
    let style = wrapper.instance().calculateStyle();
    expect(style.left).toBe(0);
    expect(style.width).toBe(80);
    expect(style.backgroundColor).toBe('red');
    // expect(wrapper.instance().containerStyle.height).toBe(10);
  });

  it('Move and handle mouse event properly', () => {
    let onChildDrag = jest.fn();
    let onUpdateTask = jest.fn();
    let onTaskChanging = jest.fn();
    let item = { name: 'this Item' };
    let dayWidth = 30;
    let nowposition = 0;
    let stopPropagation = jest.fn();
    const wrapper = shallow(
      <DataTask
        nowposition={nowposition}
        dayWidth={dayWidth}
        onChildDrag={onChildDrag}
        onUpdateTask={onUpdateTask}
        onTaskChanging={onTaskChanging}
        item={item}
        left={0}
        width={80}
        color="red"
      />
    );
    expect(wrapper.state().dragging).toBe(false);
    wrapper.instance().doMouseDown({ button: 1, clientX: 10, stopPropagation: stopPropagation }, MODE_MOVE);
    expect(wrapper.state().mode).toBe(MODE_NONE);
    expect(wrapper.state().dragging).toBe(false);
    wrapper.instance().doMouseDown({ button: 0, clientX: 10, stopPropagation: stopPropagation }, MODE_MOVE);
    expect(wrapper.state().mode).toBe(MODE_MOVE);
    expect(wrapper.state().dragging).toBe(true);
    expect(wrapper.state().left).toBe(0);
    expect(wrapper.instance().draggingPosition).toBe(10);
    expect(onChildDrag.mock.calls.length).toBe(1);
    expect(onChildDrag.mock.calls[0][0]).toBe(true);

    wrapper.instance().doMouseMove({ button: 0, clientX: 20, stopPropagation: stopPropagation });
    expect(wrapper.state().left).toBe(10);
    expect(wrapper.instance().draggingPosition).toBe(20);
    let style = wrapper.instance().calculateStyle();
    expect(style.left).toBe(10);
    expect(style.width).toBe(80);
    expect(style.backgroundColor).toBe('red');
    wrapper.instance().doMouseUp();
    expect(wrapper.state().mode).toBe(MODE_NONE);
    expect(onChildDrag.mock.calls.length).toBe(2);
    expect(onChildDrag.mock.calls[1][0]).toBe(false);
    expect(onUpdateTask.mock.calls.length).toBe(1);
    expect(onUpdateTask.mock.calls[0][0]).toBe(item);
    let new_start_date = DateHelper.pixelToDate(10, nowposition, dayWidth);
    let new_end_date = DateHelper.pixelToDate(90, nowposition, dayWidth);

    expect(new_start_date.getTime() - onUpdateTask.mock.calls[0][1].start.getTime() < 10).toBe(true);
    expect(new_end_date.getTime() - onUpdateTask.mock.calls[0][1].end.getTime() < 10).toBe(true);
  });
  it('Resize Left and handle mouse event properly', () => {
    let onChildDrag = jest.fn();
    let onUpdateTask = jest.fn();
    let onTaskChanging = jest.fn();
    let stopPropagation = jest.fn();
    let item = { name: 'this Item' };
    let dayWidth = 30;
    let nowposition = 0;
    const wrapper = shallow(
      <DataTask
        nowposition={nowposition}
        dayWidth={dayWidth}
        onChildDrag={onChildDrag}
        onUpdateTask={onUpdateTask}
        onTaskChanging={onTaskChanging}
        item={item}
        left={0}
        width={80}
        color="red"
      />
    );
    expect(wrapper.state().dragging).toBe(false);
    wrapper.instance().doMouseDown({ button: 1, clientX: 10, stopPropagation: stopPropagation }, MOVE_RESIZE_LEFT);
    expect(wrapper.state().dragging).toBe(false);
    expect(wrapper.state().mode).toBe(MODE_NONE);
    wrapper.instance().doMouseDown({ button: 0, clientX: 10, stopPropagation: stopPropagation }, MOVE_RESIZE_LEFT);
    expect(wrapper.state().mode).toBe(MOVE_RESIZE_LEFT);
    expect(wrapper.state().dragging).toBe(true);
    expect(wrapper.state().left).toBe(0);
    expect(wrapper.instance().draggingPosition).toBe(10);
    expect(onChildDrag.mock.calls.length).toBe(1);
    expect(onChildDrag.mock.calls[0][0]).toBe(true);

    wrapper.instance().doMouseMove({ button: 0, clientX: 20, stopPropagation: stopPropagation });
    expect(wrapper.state().left).toBe(10);
    expect(wrapper.instance().draggingPosition).toBe(20);
    let style = wrapper.instance().calculateStyle();
    expect(style.left).toBe(10);
    expect(style.width).toBe(70);
    expect(style.backgroundColor).toBe('red');
    wrapper.instance().doMouseUp();
    expect(wrapper.state().mode).toBe(MODE_NONE);
    expect(onChildDrag.mock.calls.length).toBe(2);
    expect(onChildDrag.mock.calls[1][0]).toBe(false);
    expect(onUpdateTask.mock.calls.length).toBe(1);
    expect(onUpdateTask.mock.calls[0][0]).toBe(item);
    let new_start_date = DateHelper.pixelToDate(10, nowposition, dayWidth);
    let new_end_date = DateHelper.pixelToDate(70, nowposition, dayWidth);

    expect(new_start_date.getTime() - onUpdateTask.mock.calls[0][1].start.getTime() < 10).toBe(true);
    expect(new_end_date.getTime() - onUpdateTask.mock.calls[0][1].end.getTime() < 10).toBe(true);
  });
  it('Resize Right and handle mouse event properly', () => {
    let onChildDrag = jest.fn();
    let onUpdateTask = jest.fn();
    let onTaskChanging = jest.fn();
    let item = { name: 'this Item' };
    let dayWidth = 30;
    let nowposition = 0;
    let stopPropagation = jest.fn();
    const wrapper = shallow(
      <DataTask
        nowposition={nowposition}
        dayWidth={dayWidth}
        onChildDrag={onChildDrag}
        onUpdateTask={onUpdateTask}
        onTaskChanging={onTaskChanging}
        item={item}
        left={0}
        width={80}
        color="red"
      />
    );
    expect(wrapper.state().dragging).toBe(false);
    wrapper.instance().doMouseDown({ button: 1, clientX: 10, stopPropagation: stopPropagation }, MOVE_RESIZE_RIGHT);
    expect(wrapper.state().dragging).toBe(false);
    expect(wrapper.state().mode).toBe(MODE_NONE);
    wrapper.instance().doMouseDown({ button: 0, clientX: 10, stopPropagation: stopPropagation }, MOVE_RESIZE_RIGHT);
    expect(wrapper.state().mode).toBe(MOVE_RESIZE_RIGHT);
    expect(wrapper.state().dragging).toBe(true);
    expect(wrapper.state().left).toBe(0);
    expect(wrapper.instance().draggingPosition).toBe(10);
    expect(onChildDrag.mock.calls.length).toBe(1);
    expect(onChildDrag.mock.calls[0][0]).toBe(true);

    wrapper.instance().doMouseMove({ button: 0, clientX: 20, stopPropagation: stopPropagation });
    expect(wrapper.state().left).toBe(0);
    expect(wrapper.instance().draggingPosition).toBe(20);
    let style = wrapper.instance().calculateStyle();
    expect(style.left).toBe(0);
    expect(style.width).toBe(90);
    expect(style.backgroundColor).toBe('red');
    wrapper.instance().doMouseUp();
    expect(wrapper.state().mode).toBe(MODE_NONE);
    expect(onChildDrag.mock.calls.length).toBe(2);
    expect(onChildDrag.mock.calls[1][0]).toBe(false);
    expect(onUpdateTask.mock.calls.length).toBe(1);
    expect(onUpdateTask.mock.calls[0][0]).toBe(item);
    let new_start_date = DateHelper.pixelToDate(0, nowposition, dayWidth);
    let new_end_date = DateHelper.pixelToDate(90, nowposition, dayWidth);

    expect(new_start_date.getTime() - onUpdateTask.mock.calls[0][1].start.getTime() < 10).toBe(true);
    expect(new_end_date.getTime() - onUpdateTask.mock.calls[0][1].end.getTime() < 10).toBe(true);
  });

  it('Starting Creation of Task', () => {
    let onStartCreateLink = jest.fn();
    let stopPropagation = jest.fn();
    let item = { name: 'this Item' };
    let dayWidth = 30;
    let nowposition = 0;
    const wrapper = shallow(
      <DataTask
        nowposition={nowposition}
        dayWidth={dayWidth}
        onStartCreateLink={onStartCreateLink}
        item={item}
        left={0}
        width={80}
        color="red"
      />
    );
    expect(wrapper.state().dragging).toBe(false);
    let taskSide = wrapper.find('.timeLine-main-data-task-side-linker');
    expect(taskSide.length).toBe(2);
    taskSide.first().simulate('mousedown', { button: 0, stopPropagation: stopPropagation });
    expect(onStartCreateLink.mock.calls.length).toBe(0);

    taskSide.last().simulate('mousedown', { button: 0, stopPropagation: stopPropagation });
    expect(onStartCreateLink.mock.calls.length).toBe(1);
    expect(onStartCreateLink.mock.calls[0][0]).toBe(item);
    expect(onStartCreateLink.mock.calls[0][1]).toBe(LINK_POS_RIGHT);
    expect(stopPropagation.mock.calls.length).toBe(1);
  });
  it('Finishing Creation of Task', () => {
    let onFinishCreateLink = jest.fn();
    let stopPropagation = jest.fn();
    let item = { name: 'this Item' };
    let dayWidth = 30;
    let nowposition = 0;
    const wrapper = shallow(
      <DataTask
        nowposition={nowposition}
        dayWidth={dayWidth}
        onFinishCreateLink={onFinishCreateLink}
        item={item}
        left={0}
        width={80}
        color="red"
      />
    );
    expect(wrapper.state().dragging).toBe(false);
    let taskSide = wrapper.find('.timeLine-main-data-task-side-linker');
    expect(taskSide.length).toBe(2);
    taskSide.first().simulate('mouseup', { button: 0, stopPropagation: stopPropagation });
    expect(onFinishCreateLink.mock.calls.length).toBe(1);
    expect(onFinishCreateLink.mock.calls[0][0]).toBe(item);
    expect(onFinishCreateLink.mock.calls[0][1]).toBe(LINK_POS_LEFT);
    expect(stopPropagation.mock.calls.length).toBe(1);
    //This side dont accept mouse up
    taskSide.last().simulate('mouseup', { button: 0, stopPropagation: stopPropagation });
    expect(onFinishCreateLink.mock.calls.length).toBe(1);
  });
});
