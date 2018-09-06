
export const authFecth=(url,method,data)=>{
    var promise = new Promise((resolve, reject)=> {
        let params={
            method:method,
            headers:{
            'Accept': 'application/json',
            'Authorization':localStorage.getItem('token'),
            'Content-Type': 'application/json'}
        }
        if(data)
            params.body=JSON.stringify(data)

        fetch(url, params).then( response =>{
            if (response.status===401){
                eject();
            }else{
                resolve(response)
            }
        }).catch( error=> {console.log(error)}
        )
        
    });
    return promise    
}