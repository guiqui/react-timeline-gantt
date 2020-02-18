import DataController from 'libs/controller/DataController';
import DateHelper from 'libs/helpers/DateHelper';
describe('Test DataController ', function() {
  test('Initialise Properly ', () => {
    let dataController = new DataController();
    const mockCallback = jest.fn();
    dataController.onHorizonChange = mockCallback;
    //start,end,nowposition,daywidth
    dataController.initialise(0, 101, 2, 30);
    expect(dataController.nowposition).toBe(2);
    expect(dataController.daywidth).toBe(30);
    expect(dataController.lower_limit).toBe(-1000);
    expect(dataController.lower_data_limit).toBe(-750);
    expect(dataController.upper_limit).toBe(1101);
    expect(dataController.upper_data_limit).toBe(851);
    expect(mockCallback.mock.calls.length).toBe(1);
    let lowerLimit = DateHelper.pixelToDate(dataController.lower_limit, dataController.nowposition, dataController.daywidth);
    let upLimit = DateHelper.pixelToDate(dataController.upper_limit, dataController.nowposition, dataController.daywidth);
    expect(mockCallback.mock.calls[0][0].getDay()).toBe(lowerLimit.getDay());
    expect(mockCallback.mock.calls[0][0].getMonth()).toBe(lowerLimit.getMonth());
    expect(mockCallback.mock.calls[0][1].getDay()).toBe(upLimit.getDay());
    expect(mockCallback.mock.calls[0][1].getMonth()).toBe(upLimit.getMonth());
  });

  test('Testing changing Start End date ', () => {
    let dataController = new DataController();
    const mockCallback = jest.fn();
    dataController.onHorizonChange = mockCallback;
    //start,end,nowposition,daywidth
    dataController.initialise(0, 100, 0, 30);
    dataController.setStartEnd(-100, 0, 0, 30);
    expect(mockCallback.mock.calls.length).toBe(1);
    dataController.setStartEnd(-756, 0, 0, 30);
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(dataController.lower_limit).toBe(-1756);
    expect(dataController.lower_data_limit).toBe(-1506);
    expect(dataController.upper_limit).toBe(1000);
    expect(dataController.upper_data_limit).toBe(750);
  });
});
