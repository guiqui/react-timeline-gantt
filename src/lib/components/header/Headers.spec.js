import React from 'react';
import Headers from './Headers';
import DateHelper from 'libs/helpers/DateHelper'
import { shallow ,mount} from 'enzyme';


describe('VirtualListCore Initialise propertly ',()=>{
    it ('It mount properly when no property is given',()=>{
        const wrapper = shallow(<Headers />);
        expect(wrapper.find('#timeline-header')).toBeDefined();
        expect(wrapper.find('.timeLine-main-header-container')).toBeDefined();
    })

    it ('It properties are assign properly and state',()=>{
        //calculateMonthData(start,end,now,dayWidth)
        let start=0;
        let end=100;
        let now=0;
        let dayWidth=30;
        let months=DateHelper.calculateMonthData(start,end,now,dayWidth)
        const wrapper = mount(<Headers 
                                    months={months}
                                    numVisibleDays={20}
                                    currentday={1}
                                    nowposition={now}
                                    dayWidth={dayWidth}
                                    scrollLeft={0} />);
        expect(wrapper.find('#timeline-header')).toBeDefined();
        expect(wrapper.find('.timeLine-main-header-container')).toBeDefined();
        var count=0;
        wrapper.find('.timeLine-main-header-month-item').forEach((node) => {
            expect(node.props().children).toBe(months.data[count].month);
            count=count+1;
        })

        let today=new Date()
        let dayofMonth=today.getDate()
        let month=today.getMonth()+1
        let year=today.getFullYear()
        let result= DateHelper.calculateMonthData(0,40,0,50)
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
