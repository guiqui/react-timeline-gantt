import Registry from './Registry'





test('Registering Task',()=>{
    let data=[]
    for(let i=0;i<20;i++){
        data.push({name: `Task Today`,id:i,start:new Date(),end:new Date().setDate(new Date().getDate(),5) ,color:'red'})
    }
    Registry.registerData(data)
    expect(Registry.getTask(0).item.id).toBe(0);
    expect(Registry.getTask(0).index).toBe(0);
    expect(Registry.getTask(19).item.id).toBe(19);
    expect(Registry.getTask(19).index).toBe(19);

    Registry.registerData(null)
    expect(Registry.getTask(0).item.id).toBe(0);
    expect(Registry.getTask(0).index).toBe(0);
})

test('Registering Task',()=>{
    let data=[]
    for(let i=0;i<20;i++){
        data.push({id:i,start:i,end:i})
    }
    Registry.registerLinks(data)
    expect(Registry.getLinks(0)).toHaveLength(1);
    expect(Registry.getLinks(0)[0].index).toBe(0);
    expect(Registry.getLinks(0)[0].link.start).toBe(0);
    expect(Registry.getLinks(0)[0].link.end).toBe(0);

    expect(Registry.getLinks(19)).toHaveLength(1);
    expect(Registry.getLinks(19)[0].index).toBe(19);
    expect(Registry.getLinks(19)[0].link.start).toBe(19);
    expect(Registry.getLinks(19)[0].link.end).toBe(19);

})
