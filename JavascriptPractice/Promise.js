function resolveAfter2sec(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve("resolved")
        }, 3000);
    })
}

async function asyncCall(){
    console.log("Calling");
    const result =await resolveAfter2sec()
    console.log(result);
    //expected output will be "resolved"
}
asyncCall()