
import fetchMock from 'jest-fetch-mock'

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';



class McLocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = value.toString();
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }
  Enzyme.configure({ adapter: new Adapter() });
  global.localStorage = new McLocalStorageMock;
  global.fetch = fetchMock
 