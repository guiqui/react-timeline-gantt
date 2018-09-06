import TimeDataProvider from './TimeDataProvider'
import moment  from 'moment'  
//import pages,{outBoundPages}from '../test/mockData'

describe('TimeLine dataprovider ', function () {
  beforeEach(() => {
    fetch.resetMocks()
  })

  const provider= new TimeDataProvider();
  it('TimeLine Create Properly',()=>{
  
  })


  test('Is Calculate Page givin ',()=>{
    let newPage=provider.calculatePage(moment('2-2018', 'M-YYYY'),3)
    expect(newPage).toBe('5-2018')
    newPage=provider.calculatePage(moment('2-2018', 'M-YYYY'),12)
    expect(newPage).toBe('2-2019')
    newPage=provider.calculatePage(moment('2-2018', 'M-YYYY'),-3)
    expect(newPage).toBe('11-2017')
  })
  // test('Is Page in Bounds ',()=>{
  //   provider.currentPage='3-2018'
  //   let isInBounds=provider.isPageInbounds('1-2018')
  //   expect(isInBounds).toBe(true)
  //   isInBounds=provider.isPageInbounds('12-2017')
  //   expect(isInBounds).toBe(false)
  //   isInBounds=provider.isPageInbounds('5-2018')
  //   expect(isInBounds).toBe(true)
  //   isInBounds=provider.isPageInbounds('6-2018')
  //   expect(isInBounds).toBe(false)

  // })
  // test('Is Load Page In boundaries',done=>{
  //   provider.currentPage='9-2018'
  //   fetch.mockResponseOnce(JSON.stringify(pages), {status: 200, statusText : "ok"})
  //   provider.onPageLoad=()=>{
  //     let page=provider.getPage("9-2018");
  //     expect(page.length).toBe(6)
  //     page=provider.getPage("8-2018");
  //     expect(page.length).toBe(2)
  //     expect(provider.initialise).toBe(true)
  //     page=provider.getPage("7-2018");
  //     expect(page.length).toBe(0)
  //     done();
  //   }
  //   expect(provider.initialise).toBe(false)
  //   provider.loadPage(["9-2018","8-2018"])
  // })

  // test('Is Load Page out boundaries',done=>{
  //   provider.currentPage='9-2018'
  //   fetch.mockResponseOnce(JSON.stringify(outBoundPages), {status: 200, statusText : "ok"})
  //   provider.onPageLoad=()=>{
  //     let page=provider.getPage("9-2018");
  //     expect(page.length).toBe(6)
  //     page=provider.getPage("8-2018");
  //     expect(page.length).toBe(2)
  //     page=provider.getPage("12-2018");
  //     expect(page.length).toBe(0)
  //     done();
  //   }
  //   provider.initialise=false
  //   provider.loadPage(["12-2018"])
  // })


  // test('Is remove unsed pages',()=>{
  //   provider.removeUnusedPages('6-2018')
  //   let page=provider.getPage("9-2018");
  //   expect(page.length).toBe(0)
  //   page=provider.getPage("8-2018");
  //   expect(page.length).toBe(2)
  // })


});


