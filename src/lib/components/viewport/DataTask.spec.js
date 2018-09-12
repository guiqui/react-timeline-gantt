import React from 'react'
import DataTask from './DataTask'
import DateHelper from 'libs/helpers/DateHelper'
import { shallow } from 'enzyme';

describe('Testing Firing Events ', function () {
    it('Initialise Properly and not null pointer',()=>{
        const wrapper =shallow(<DataTask />);
        expect(wrapper.find('.timeLine-main-data-task')).toBeDefined()
       // expect(wrapper.instance().containerStyle.height).toBe(10);

    })    

    it('Initialise Properly and not null pointer',()=>{
        const wrapper =shallow(<DataTask  left={0}
                                            width={80}
                                            color='red'/>);
        let style=wrapper.instance().calculateStyle();                                  
        expect(style.left).toBe(0);
        expect(style.width).toBe(80);
        expect(style.backgroundColor).toBe('red');
       // expect(wrapper.instance().containerStyle.height).toBe(10);

    })    

    it('Move and handle mouse event properly',()=>{
        let onChildDrag=jest.fn();
        let onUpdateItem=jest.fn();
        let item={name:'this Item'}
        let dayWidth=30;
        let nowposition=0;
        const wrapper =shallow(<DataTask 
                                    nowposition={nowposition}
                                    dayWidth={dayWidth}
                                    onChildDrag={onChildDrag}
                                    onUpdateItem={onUpdateItem}
                                    item={item}
                                    left={0}
                                    width={80}
                                    color='red'/>);
        expect(wrapper.state().dragging).toBe(false);    
        wrapper.instance().doMouseDown({button:1,clientX:10})    
        expect(wrapper.state().dragging).toBe(false); 
        wrapper.instance().doMouseDown({button:0,clientX:10})    
        expect(wrapper.state().dragging).toBe(true);       
        expect(wrapper.state().left).toBe(0);   
        expect(wrapper.instance().draggingPosition).toBe(10);       
        expect(onChildDrag.mock.calls.length).toBe(1);
        expect(onChildDrag.mock.calls[0][0]).toBe(true)  

        wrapper.instance().doMouseMove({button:0,clientX:20})      
        expect(wrapper.state().left).toBe(10);   
        expect(wrapper.instance().draggingPosition).toBe(20);
        let style=wrapper.instance().calculateStyle();     
        expect(style.left).toBe(10);
        expect(style.width).toBe(80);
        expect(style.backgroundColor).toBe('red');
        wrapper.instance().doMouseUp()
        expect(onChildDrag.mock.calls.length).toBe(2);
        expect(onChildDrag.mock.calls[1][0]).toBe(false) 
        expect(onUpdateItem.mock.calls.length).toBe(1);
        expect(onUpdateItem.mock.calls[0][0]).toBe(item)
        let new_start_date=DateHelper.pixelToDate(10,nowposition,dayWidth);
        let new_end_date=DateHelper.pixelToDate(90,nowposition,dayWidth);

        expect(new_start_date.getTime()-onUpdateItem.mock.calls[0][1].start.getTime()<10).toBe(true)
        expect(new_end_date.getTime()-onUpdateItem.mock.calls[0][1].end.getTime()<10).toBe(true)


    })    


    // it('It render and interact properly',()=>{
    //     let itemheight=30;
    //     let data=[]
    //     const onSelectItem=jest.fn();
    //     for(let i=0;i<20;i++){
    //     data.push({name: `Task Today`,start:new Date(),end:new Date().setDate(new Date().getDate(),5) ,color:'red'})
    //     }
    //     const wrapper =mount(<TaskList data={data}
    //                                     startRow={0}
    //                                     endRow={17}
    //                                     onSelectItem={onSelectItem}
    //                                     itemheight={itemheight}/>);
    //     expect(wrapper.instance().containerStyle.height).toBe(itemheight*data.length);
        
    //     expect(wrapper.find('.timeLine-side-task-row')).toHaveLength(18)
    //     var count=0;
    //     wrapper.find('.timeLine-side-task-row').forEach((node) => {
    //         expect(node.props().style.top).toBe(count*itemheight);
    //         node.simulate('click');
    //         count=count+1;
    //     })

    //     expect(onSelectItem.mock.calls.length).toBe(18);
    //     for(let i=0;i<18;i++){
    //         expect(onSelectItem.mock.calls[i][0]).toBe(data[i])
    //    }

    //     wrapper.unmount()

    // })    

    
})