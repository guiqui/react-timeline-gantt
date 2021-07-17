
import fetchMock from 'jest-fetch-mock'

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';



class McLocalStorageMock {

  key: any = 0;
  length: number = 0;

  private store : any;
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key: string) {
      return this.store[key] || null;
    }
  
    setItem(key: string, value: any) {
      this.store[key] = value.toString();
    }
  
    removeItem(key: string) {
      delete this.store[key];
    }
  }
  Enzyme.configure({ adapter: new Adapter() });
  global.localStorage = new McLocalStorageMock();
  global.fetch = fetchMock
 