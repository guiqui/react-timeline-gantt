import React from 'react';
import ContentEditable from './ContentEditable';
import { shallow ,mount} from 'enzyme';


describe('ContentEditable Initialise propertly ',()=>{
    it ('It mount properly when no property is given',()=>{
        const wrapper = shallow(<ContentEditable value='Test' />);
        expect(wrapper.find('div').html()).toBe('<div style=\"width:100%\"> Test</div>');
    })
    it ('Change to input when focus',()=>{
        const wrapper = shallow(<ContentEditable value='Test' />);
        expect(wrapper.state().editing).toBe(false);
        wrapper.find('div').simulate('click');
        expect(wrapper.state().editing).toBe(true);
        expect(wrapper.find('input').html()).toBe('<input type=\"text\" style=\"width:100%;outline-color:black;outline-style:oinset\" name=\"name\" value=\"Test\"/>');
    })
    it ('Update state when entering data',()=>{
        const wrapper = shallow(<ContentEditable value='Test' />);
        wrapper.find('div').simulate('click');
        expect(wrapper.state().value).toBe('Test');
        wrapper.find('input').simulate('change', { target:{value:'a'}})
        expect(wrapper.state().value).toBe('a');
       
    })

    it ('On press enter go back to not edit mode',()=>{
        const wrapper = shallow(<ContentEditable value='Test' />);
        wrapper.find('div').simulate('click');
        expect(wrapper.state().editing).toBe(true);
        wrapper.find('input').simulate('keyUp', { keyCode:13})
        expect(wrapper.state().editing).toBe(false);
        expect(wrapper.find('div').html()).toBe('<div style=\"width:100%\"> Test</div>');
       
    })
    it ('On Blur enter go back to not edit mode',()=>{
        const wrapper = shallow(<ContentEditable value='Test' />);
        wrapper.find('div').simulate('click');
        expect(wrapper.state().editing).toBe(true);
        wrapper.find('input').simulate('blur')
        expect(wrapper.state().editing).toBe(false);
        expect(wrapper.find('div').html()).toBe('<div style=\"width:100%\"> Test</div>');
       
    })

    it ('Call onChange call back when loose focus',()=>{
        let mockCallback = jest.fn(value => `recived${value}`);
        const wrapper = shallow(<ContentEditable value='Test'  onChange={mockCallback}/>);
        wrapper.find('div').simulate('click');
        expect(wrapper.state().editing).toBe(true);
        wrapper.find('input').simulate('change', { target:{value:'Callback'}})
        wrapper.find('input').simulate('keyUp', { keyCode:13})
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.results[0].value).toBe('recivedCallback');
    })
    
})
