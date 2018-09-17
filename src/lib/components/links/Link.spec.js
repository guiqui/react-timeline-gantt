import React from 'react'
import Link from './Link'
import { shallow } from 'enzyme';


describe('Testing Links ', function () {
    it('Initialise Properly and not null pointer',()=>{
        let start={x:10,y:30}
        let end={x:100,y:200}
        const wrapper =shallow(<Link start={start} end={end} />);
        let coordinates=wrapper.instance().linkCoordinates();
        expect(coordinates.cpt1.x).toBe(55);
        expect(coordinates.cpt1.y).toBe(30);
        expect(coordinates.cpt2.x).toBe(55);
        expect(coordinates.cpt2.y).toBe(200);
        let path=wrapper.instance().calculatePath(coordinates);
        expect(path).toBe("M10 30  55 30 55 200 100 200");
    })
})