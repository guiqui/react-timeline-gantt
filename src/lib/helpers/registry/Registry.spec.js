import Registry from './Registry'

test('Adding object to registry',()=>{
    Registry.add('1',{id:1,name:'First Element'})
    let obj=Registry.get('1');
    expect(obj).toBeDefined();
})

test('Deleting object from registry',()=>{
    Registry.del('1')
    let obj=Registry.get('1');
    expect(obj).toBeUndefined()
})
test('Deleting All Object from registry',()=>{
    Registry.add('1',{id:1,name:'First Element'})
    Registry.add('2',{id:1,name:'First Element'})
    Registry.delAll()
    let obj=Registry.get('1');
    expect(obj).toBeUndefined()
    obj=Registry.get('2');
    expect(obj).toBeUndefined()
})