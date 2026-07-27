// let p=new Promise((resolve,reject)=>{
//     console.log("Promise is pending....");
//     setTimeout(() => {
//         // console.log("Hi I am promise!");
//         resolve(true)
//     }, 3000);
    
// })

// let p2=new Promise((resolve,reject)=>{
//     console.log("Promise is pending")
//     setTimeout(() => {
//         // console.log("Hi iam promise 2");
//         reject(new Error("Hi i am error bro"))
//     }, 3000);
// })

// p.then((value)=>{
//     console.log(value)
// })
// p2.catch((error)=>{
//     console.log(error);
    
// })


// Promise chainning
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Promise Resolved")
        resolve(10)
    }, 2000);
})

p.then((value) => {
    console.log(value)
    let p2 =new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve("promise 2")
            console.log("Promise 2 resolved")
            return p2
        },3000)
        
    })
})