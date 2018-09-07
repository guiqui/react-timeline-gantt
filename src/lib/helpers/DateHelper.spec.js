import DateHelper from 'libs/helpers/DateHelper'

describe('Test DateToPixel Fuctionality',()=>{
    test('When Today and now position  0',()=>{
        let result= DateHelper.dateToPixel(new Date(),0);
        expect(result).toBe(0)
    })
    test('When Today and now position  100 ',()=>{
        let result= DateHelper.dateToPixel(new Date(),100);
        expect(result).toBe(100)
    })
    test('When tomorrow and now position 0',()=>{
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let result= DateHelper.dateToPixel(tomorrow,0);
        expect(result).toBe(24)
    })
    test('When tomorrow and now position 100',()=>{
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let result= DateHelper.dateToPixel(tomorrow,100);
        expect(result).toBe(124)
    })
    test('When yesterday and now position 0',()=>{
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        let result= DateHelper.dateToPixel(yesterday,0);
        expect(result).toBe(-24)
    })
    test('When yesterday and now position 100',()=>{
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        let result= DateHelper.dateToPixel(yesterday,100);
        expect(result).toBe(76)
    })
})



describe('Test DateToPixel Fuctionality',()=>{
    test('When Today and now position  0',()=>{
        let now=new Date();
        let result= DateHelper.dateToPixel(new Date(),0);
        result= DateHelper.pixelToDate(result,0);
        expect(result.getTime()).toBe(now.getTime())
    })
    test('When Today and now position  100 ',()=>{
        let now=new Date();
        let result= DateHelper.dateToPixel(new Date(),100);
        result= DateHelper.pixelToDate(result,100);
        expect(result.getTime()).toBe(now.getTime())
    })
    test('When tomorrow and now position 0',()=>{
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let result= DateHelper.dateToPixel(tomorrow,0);
        result= DateHelper.pixelToDate(result,0);
        expect(result.getTime()).toBe(tomorrow.getTime())
    })
    test('When tomorrow and now position 100',()=>{
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let result= DateHelper.dateToPixel(tomorrow,100);
        result= DateHelper.pixelToDate(result,100);
        expect(result.getTime()).toBe(tomorrow.getTime())
    })
   
})
