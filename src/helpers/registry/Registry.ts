import { Task } from "../../types";

class Registry{
    private data : any = {}
    private link: any = {}
    constructor(){
    
    }

    registerData(list: Task[]){
        if (!list)
            return;
        this.data={}
        for (let i=0;i<list.length;i++){
            this.data[list[i].id]={item:list[i],index:i};
        }
    }
    registerLinks(list: any){
        if(!list)
            return
        this.link={}
        let start=0;
        let end=0;

        for (let i=0;i<list.length;i++){
            start=list[i].start;
            end=list[i].end;
            let value={link:list[i],index:i}
            this.createAddTo(start,this.link,value,i)
            this.createAddTo(end,this.link,value,i)
        }
    }
    createAddTo(id: any,list: any,value: any,index: number){
        if (!list[id])
            list[id]=[]
        if (list[id].indexOf(value)==-1)
            list[id].push(value)
    }

    getTask(id: any){
        console.log(this.data, id)
        return this.data[id]
    }
    getLinks(id: any){
        return this.link[id]
    }

}
const instanceRegistry=new Registry();
export default instanceRegistry;