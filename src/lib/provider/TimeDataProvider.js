
import {authFecth} from '../helpers/authFecth'
import {HOST} from '../../setting'
import moment  from 'moment'  

class TimeDataProvider{
    constructor(){
        this.OFFSET_CACHE=2;
        this.setCurrentPage=this.setCurrentPage.bind(this)
        this.isPageInbounds=this.isPageInbounds.bind(this)
        this.opData={}
        this.data=[]
        this.currentPage='';
        this.initialise=false;
        //data generator
        this.gen=new Generator();
        this.opData=this.gen.generateData()
    }

    getPage(page){
        return this.opData[page]?this.opData[page]:[]
    }

    setCurrentPage(page){
        //check if we need another page
        //if yes load it
        if (this.currentPage ===page)
            return;
        this.currentPage =page;
        var pagesToLoad=[]
        let next=''
        for (let i=-this.OFFSET_CACHE ; i< this.OFFSET_CACHE+1 ; i++ ){
            next=this.calculatePage(moment(page, 'M-YYYY'),i);
            if(!this.opData[next])
                pagesToLoad.push(next)
        }
        if (pagesToLoad.length>0){
            this.loadPage(pagesToLoad);
            this.removeUnusedPages(this.currentPage)
        }
    }

    removeUnusedPages(page){
        // let upBorder=this.calculatePage(moment(page, 'M-YYYY'),this.OFFSET_CACHE+1);
        // delete this.opData[upBorder];
        // let downBorder=this.calculatePage(moment(page, 'M-YYYY'),-this.OFFSET_CACHE-1);
        // delete this.opData[downBorder];
    
    }

    calculatePage(current,offset){
       return current.add(offset, 'month').format('M-YYYY')
    }

    isPageInbounds(page){
        let current = moment(this.currentPage, 'M-YYYY')
        let toComp  = moment(page, 'M-YYYY')
        return Math.abs(current.diff(toComp, 'months', true))<3;
    }

    loadPage(pages){
        authFecth(`${HOST}/task/pages`,'post',pages)
        .then(response =>response.json())
        .then((response) =>{ 
            for (var key in response) {
                //check if needs loading
                if (this.isPageInbounds(key)){
                    this.opData[key]=[...response[key]]
                }
            }
            if (!this.initialise){
                /// to review 
                this.initialise=true;
                this.onPageLoad()

            }
        })

    }
}



class Generator{
    constructor(){

    }
    generateData(){
        let result={}
        this.addRecord(new Date(),0,result) 
        for (let i=1;i<1000;i++){
            this.addRecord(this.randomDate(new Date(2017, 9, 1),new Date(2020, 9, 1)),i,result) 
        }
        return result;
    }

    addRecord(starDate,i,result){
            let endDate=new Date(starDate.getTime());
            endDate.setDate(starDate.getDate() + Math.random() * 20);
            let record={name: `Task ${i}`,start:starDate,end:endDate ,color:this.getRandomColor()}
            let startkey=moment(starDate).format("M-YYYY");
            this.persistRecord(result,record,startkey)
            // let endKey=moment(endDate).format("M-YYYY") ;
            // this.persistRecord(result,record,endKey)
    }

    persistRecord(result,value,key){
        if (!result[key])
            result[key]=[]
        result[key].push(value)
    }
 
    randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    setRandomColor() {
        $("#colorpad").css("background-color", getRandomColor());
    }
}
  
export default TimeDataProvider;
