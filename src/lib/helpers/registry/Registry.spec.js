import Registry from './Registry'



test('Adding object to registry',()=>{

    let data=[]
    for(let i=0;i<20;i++){
        data.push({name: `Task Today`,id:i,start:new Date(),end:new Date().setDate(new Date().getDate(),5) ,color:'red'})
    }
    Registry.registerData(data)
    expect(Registry.getTask(0).item.id).toBe(0);
    expect(Registry.getTask(0).index).toBe(0);
    expect(Registry.getTask(19).item.id).toBe(19);
    expect(Registry.getTask(19).index).toBe(19);
})

