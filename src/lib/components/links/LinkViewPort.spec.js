import React from 'react'
import LinkViewPort from './LinkViewPort'
import Registry from 'libs/helpers/registry/Registry'
import { shallow,mount } from 'enzyme';


describe('Testing LinksViewPort ', function () {
    it('Initialise Properly and not null pointer',()=>{
        const wrapper =shallow(<LinkViewPort  />);
        expect(wrapper.state().data).toBeUndefined();
        expect(wrapper.state().links).toBeUndefined();
        expect(wrapper.instance().cache).toHaveLength(0);

    })

    it('Render properly when data is pass',()=>{
        let data=[]
        for(let i=0;i<20;i++){
            data.push({name: `Task Today`,id:i,start:new Date(),end:new Date().setDate(new Date().getDate(),5) ,color:'red'})
        }
        Registry.registerData(data)
        let links=[]
        for(let i=0;i<20;i++){
            links.push({id:i,start:i,end:i})
        }
        Registry.registerLinks(data)
        const wrapper =mount(<LinkViewPort    
                                startRow={0}
                                endRow={0}
                                data={data} 
                                nowposition={0}
                                dayWidth={30}
                                links={links} />);
        expect(wrapper.instance().cache).toHaveLength(20);
        let renderItems=wrapper.instance().cache;
        expect(wrapper.find('.timeline-link')).toHaveLength(20)
        // wrapper.find('.timeline-link').forEach((node)=>{
        //     expect(node).toHaveLength(20)
        // })
    })

})

