import React from 'react';
import VerticalSpliter from './VerticalSpliter';
import { shallow } from 'enzyme';
describe('Testing Firing Events ', function() {
  it('Initialise Properly', () => {
    const wrapper = shallow<any>(<VerticalSpliter />);

    expect(wrapper.state().dragging).toBe(false);
    expect(wrapper.find('.squareGrip')).toHaveLength(4);
  });

  it('Handle mouse events', () => {
    const mockCallback = jest.fn();
    const stopPropagation = jest.fn();
    const wrapper = shallow<any>(<VerticalSpliter onTaskListSizing={mockCallback} />);

    expect(wrapper.state().dragging).toBe(false);
    expect(wrapper.instance().doMouseDown({ button: 1 } as any));
    expect(wrapper.state().dragging).toBe(false);
    expect(wrapper.instance().doMouseDown({ button: 0, clientX: 10 }));
    expect(wrapper.state().dragging).toBe(true);
    expect(wrapper.instance().draggingPosition).toBe(10);
    expect(mockCallback.mock.calls.length).toBe(0);
    wrapper.instance().doMouseMove({ clientX: 20, stopPropagation: stopPropagation });
    expect(wrapper.instance().draggingPosition).toBe(20);
    expect(stopPropagation.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe(-10);
    wrapper.instance().doMouseUp({});
    expect(wrapper.state().dragging).toBe(false);
  });
});
