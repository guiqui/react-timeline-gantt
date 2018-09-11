import DateHelper from 'libs/helpers/DateHelper'
const DAY_WIDTH=24;
describe('Test DateToPixel Fuctionality',()=>{
    test('When Today and now position  0',()=>{
        let result= DateHelper.dateToPixel(new Date(),0,DAY_WIDTH);
        expect(result).toBe(0)
    })
    test('When Today and now position  100 ',()=>{
        let result= DateHelper.dateToPixel(new Date(),100,DAY_WIDTH);
        expect(result).toBe(100)
    })
    test('When tomorrow and now position 0',()=>{
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let result= DateHelper.dateToPixel(tomorrow,0,DAY_WIDTH);
        expect(result).toBe(DAY_WIDTH)
    })
    test('When tomorrow and now position 100',()=>{
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let result= DateHelper.dateToPixel(tomorrow,100,DAY_WIDTH);
        expect(result).toBe(124)
    })
    test('When yesterday and now position 0',()=>{
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        let result= DateHelper.dateToPixel(yesterday,0,DAY_WIDTH);
        expect(result).toBe(-DAY_WIDTH)
    })
    test('When yesterday and now position 100',()=>{
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        let result= DateHelper.dateToPixel(yesterday,100,DAY_WIDTH);
        expect(result).toBe(76)
    })
})



describe('Test DateToPixel Fuctionality',()=>{
    test('When Today and now position  0',()=>{
        let now=new Date();
        let result= DateHelper.dateToPixel(new Date(),0,DAY_WIDTH);
        result= DateHelper.pixelToDate(result,0,DAY_WIDTH);
        expect(now.getTime()-result.getTime()<10).toBe(true)
    })
    test('When Today and now position  100 ',()=>{
        let now=new Date();
        let result= DateHelper.dateToPixel(new Date(),100,DAY_WIDTH);
        result= DateHelper.pixelToDate(result,100,DAY_WIDTH);
        expect(now.getTime()-result.getTime()<10).toBe(true)
    })
    test('When tomorrow and now position 0',()=>{
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let result= DateHelper.dateToPixel(tomorrow,0,DAY_WIDTH);
        result= DateHelper.pixelToDate(result,0,DAY_WIDTH);
        expect(tomorrow.getTime()-result.getTime()<10).toBe(true)
    })
    test('When tomorrow and now position 100',()=>{
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let result= DateHelper.dateToPixel(tomorrow,100,DAY_WIDTH);
        result= DateHelper.pixelToDate(result,100,DAY_WIDTH);
        expect(tomorrow.getTime()-result.getTime()<10).toBe(true)
    })
   
})

describe('Test date difference',()=>{
 
    test('Test with in the same month',()=>{
        //(start,end,now,dayWidth)
        let start= new Date(2018, 9, 8);
        let end= new Date(2018, 9, 18);
        let result= DateHelper.monthDiff(start,end)
        expect(result).toBe(0)
    })

    test('Test different month same year',()=>{
        //(start,end,now,dayWidth)
        let start= new Date(2018, 9, 8);
        let end= new Date(2018, 11, 18);
        let result= DateHelper.monthDiff(start,end)
        expect(result).toBe(2)
    })
    test('Test different month same year',()=>{
        //(start,end,now,dayWidth)
        let start= new Date(2018, 9, 8);
        let end= new Date(2019, 11, 18);
        let result= DateHelper.monthDiff(start,end)
        expect(result).toBe(14)
    })
    test('Test different  start > end',()=>{
        //(start,end,now,dayWidth)
        let start= new Date(2019, 9, 8);
        let end= new Date(2018, 11, 18);
        let result= DateHelper.monthDiff(start,end)
        expect(result).toBe(10)
    })
})
describe('Test Month Calculation',()=>{
    test('Month calculation wheh all 0',()=>{
        //(start,end,now,dayWidth)
        let result= DateHelper.calculateMonthData(0,0,0,0)
        expect(result).toBeDefined()
    })

    test('Month calculation wheh all 0',()=>{
        //(start,end,now,dayWidth)
        let today=new Date()
        let dayofMonth=today.getDate()
        let month=today.getMonth()+1
        let year=today.getFullYear()
        let result= DateHelper.calculateMonthData(0,40,0,50)
        let daysInMonth=DateHelper.daysInMonth (month, year) ;
        expect(result.keys[`${month}-${year}`]).toBe(`${month}-${year}`)
        expect(result.data[0].key).toBe((`${month}-${year}`))
        expect(result.data[0].left).toBe((-dayofMonth+1)*50)
        expect(result.data[0].width).toBe(daysInMonth*50)
    })
})