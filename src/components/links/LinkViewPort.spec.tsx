import React from 'react';
import LinkViewPort from './LinkViewPort';
import { shallow, mount } from 'enzyme';
import { Link, Task } from '../../types';

describe('Testing LinksViewPort ', function() {
  it('Initialise Properly and not null pointer', () => {
    const wrapper = shallow<any>(<LinkViewPort />);
    expect(wrapper.state().data).toBeUndefined();
    expect(wrapper.state().links).toBeUndefined();
    expect(wrapper.instance().cache).toHaveLength(0);
  });

  it('Render properly when data is pass', () => {
    let data :Task[] = [];
    for (let i = 0; i < 20; i++) {
      let endDate = new Date()
      endDate.setDate(new Date().getDate() + 5)
  
      data.push({ name: `Task Today`, id: i, start: new Date(), end: endDate, color: 'red' });
    }
    //Registry.registerData(data);
    
    let links : Link[] = [];
    for (let i = 0; i < 20; i++) {
      links.push({ id: i, source: i, target: i });
    }
  
    //  Registry.registerLinks(data);
  
  const wrapper = mount<any>(<LinkViewPort startRow={0} endRow={0} data={data} nowposition={0} dayWidth={30} links={links} />);
    expect(wrapper.instance().cache).toHaveLength(20);
    let renderItems = wrapper.instance().cache;
    expect(wrapper.find('.timeline-link')).toHaveLength(20);
    // wrapper.find('.timeline-link').forEach((node)=>{
    //     expect(node).toHaveLength(20)
    // })
  });
});
