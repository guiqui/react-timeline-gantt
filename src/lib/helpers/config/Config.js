const defvalues={
    header:{
        month:{
            dateFormat:'MMM  YYYY',
            style:{
                backgroundColor:"#333333",
                fontSize:10,
                color:'white',
                textAlign:'center'
            }
        },
        dayOfWeek:{style:{backgroundColor:"blue"}},
        dayTime:{}
    },
    taskList:{
  
    },
    dataViewPort:{}
  }

class Config {
    constructor(){
        this.data=defvalues;
    }

    load=(values)=>{
        this.data={}
        if (values)
            this.populate(values,defvalues,this.data);
        else
        this.data=defvalues;
    }


    populate(values,defvalues,final){
        if (!this.isObject(defvalues))
            return;
        for(let key in defvalues){
            if (!values[key]){
                //if not exits
                final[key]=defvalues[key]
            }
            else{
                //if it does
                final[key]=values[key]
                this.populate(values[key],defvalues[key],final[key]);
            }
        }
    }
    isObject(value){
        if (typeof value === 'string'
        || typeof value === 'boolean'
        || typeof value === 'number')
            return false;
        return true;
    }
    
    get values(){
        return this.data;
    }

}




const config=new Config();
export default config;