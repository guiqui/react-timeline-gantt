import React from 'react'
import TaskList from './TaskList'
import { shallow,mount } from 'enzyme';
describe('Testing Firing Events ', function () {
    it('Initialise Properly and not null pointer',()=>{
        const wrapper =shallow(<TaskList />);
        expect(wrapper.instance().containerStyle.height).toBe(10);

    })    

    it('It render and interact properly',()=>{
        let itemheight=30;
        let data=[]
        const onSelectItem=jest.fn();
        for(let i=0;i<20;i++){
        data.push({name: `Task Today`,start:new Date(),end:new Date().setDate(new Date().getDate(),5) ,color:'red'})
        }
        const wrapper =mount(<TaskList data={data}
                                        startRow={0}
                                        endRow={17}
                                        onSelectItem={onSelectItem}
                                        itemheight={itemheight}/>);
        expect(wrapper.instance().containerStyle.height).toBe(itemheight*data.length);
        
        expect(wrapper.find('.timeLine-side-task-row')).toHaveLength(18)
        var count=0;
        wrapper.find('.timeLine-side-task-row').forEach((node) => {
            expect(node.props().style.top).toBe(count*itemheight);
            node.simulate('click');
            count=count+1;
        })

        expect(onSelectItem.mock.calls.length).toBe(18);
        for(let i=0;i<18;i++){
            expect(onSelectItem.mock.calls[i][0]).toBe(data[i])
       }

        wrapper.unmount()

    })    

    
})