import React from 'react';
import Headers from './Headers';
import DateHelper from 'libs/helpers/DateHelper'
import moment from  'moment'
import { shallow ,mount} from 'enzyme';


describe('Header Initi ',()=>{
    it ('It mount properly when no property is given',()=>{
        const wrapper = shallow(<Headers />);
        expect(wrapper.find('#timeline-header')).toBeDefined();
        expect(wrapper.find('.timeLine-main-header-container')).toBeDefined();
    })

    it ('It properties are assign properly and state',()=>{
        //calculateMonthData(start,end,now,dayWidth)
        let now=0;
        let dayWidth=30;
        const wrapper = shallow(<Headers 
                                    numVisibleDays={30}
                                    currentday={1}
                                    nowposition={now}
                                    dayWidth={dayWidth}
                                    scrollLeft={0} />);
        expect(wrapper.find('#timeline-header')).toBeDefined();
        expect(wrapper.find('.timeLine-main-header-container')).toBeDefined();
        let today=new Date()
        let dayofMonth=today.getDate()
        let month=today.getMonth()+1
        let year=today.getFullYear()
        let daysInMonth=DateHelper.daysInMonth (month, year) ;
        let currentDay=dayofMonth-1
        wrapper.find('.timeLine-main-header-day-month').forEach((node) => {
            expect(parseInt(node.props().children)).toBe(currentDay);
            currentDay=currentDay+1;
            if(currentDay>daysInMonth){
                currentDay=1;
            }
        })

    })
})
