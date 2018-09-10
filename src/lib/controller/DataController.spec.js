
import DataController from 'libs/controller/DataController'

describe('TimeLine dataprovider ', function () {



  test('Initialise Properly ',()=>{
    let dataController=new DataController();
    dataController.onNeedData=()=>{}
    //start,end,nowposition,daywidth
    dataController.initialise(0,101,2,30);
    expect(dataController.nowposition).toBe(2)
    expect(dataController.daywidth).toBe(30)
    expect(dataController.lower_limit).toBe(-1000)
    expect(dataController.lower_data_limit).toBe(-750)
    expect(dataController.upper_limit).toBe(1101)
    expect(dataController.upper_data_limit).toBe(851)
  })
  

});


