import React from 'react'
import CreateLink from './CreateLink'
import { shallow } from 'enzyme';


describe('Testing Firing Events ', function () {
    it('Initialise Properly and not null pointer',()=>{
        let position={x:10,y:10}
        const wrapper =shallow(<CreateLink  start={position} />);
        expect(wrapper.instance().lastX).toBe(-1)
        expect(wrapper.instance().lastY).toBe(-1)
        expect(wrapper.state().x).toBe(10)
        expect(wrapper.state().y).toBe(10)
        expect(wrapper.instance().init).toBe(false)
    })


    it('It handle mousmove and mouse up',()=>{
        let onFinishCreateLink=jest.fn();
        let position={x:10,y:10}
        const wrapper =shallow(<CreateLink  start={position} onFinishCreateLink={onFinishCreateLink}/>);
        wrapper.instance().doMouseMove({clientX:1,clientY:2});
        expect(wrapper.instance().lastX).toBe(1)
        expect(wrapper.instance().lastY).toBe(2)
        expect(wrapper.state().x).toBe(10)
        expect(wrapper.state().y).toBe(10)
        expect(wrapper.instance().init).toBe(true)
        wrapper.instance().doMouseMove({clientX:2,clientY:3});
        expect(wrapper.state().x).toBe(11)
        expect(wrapper.state().y).toBe(11)
        wrapper.instance().doMouseUp();
        expect(onFinishCreateLink.mock.calls.length).toBe(1);
    })
})

//