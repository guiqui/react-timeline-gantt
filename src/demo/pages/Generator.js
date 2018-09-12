class Generator{
    constructor(){

    }
    generateData(){
        let result=[]
        this.addRecord(new Date(),0,result) 
        for (let i=1;i<1000;i++){
            this.addRecord(this.randomDate(new Date(2016, 9, 1),new Date(2020, 9, 1)),i,result) 
        }
        return result;
    }

    addRecord(starDate,i,result){
            let endDate=new Date(starDate.getTime());
            endDate.setDate(starDate.getDate() + Math.random() * 20);
            let record={name: `Task ${i}`,start:starDate,end:endDate ,color:this.getRandomColor()}
            result.push(record)
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

const instance =new Generator();
export default instance;