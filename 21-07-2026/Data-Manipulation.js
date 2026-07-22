// Objects
// Objects store data in key-value pairs.
let obj={
    name:"Ali",
    age:23
}
obj.age=24 //properties can be updated or we can add new ones also
obj.city="Gujranwala" //i just added a new property in my object
// delete obj.name   we can also delete any property
console.log(`"My name is ${obj.name} and my age is ${obj.age} and i live in ${obj.city}"`);

const user ={
    name:"Ahmad",
    greet(){
        console.log(`Hi ${user.name}`);
    }
}
 user.greet()

//Spread operator
// it is used to expand arrays or objects. It is commonly used for copying and merging arrays and objects.
const arr1=[1,2,3,4,5]
const arr2=[...arr1]
console.log(arr2);

let a=[1,2]
let b=[3,4]
const result=[...a,...b]
console.log(result);


// :::Merge Objects:::
let obj1 ={name:"Ali"}
let obj2={role:"Full Stack Dev"}

let person={
    ...obj1,
    ...obj2 
}
console.log(person);



// Array Methods
//there are many array methods which are very useful. 
const arr = [1, 2];
arr.push(3);// Adds to the end.
arr.pop(); // Adds to the end.
arr.shift();// Removes first element.
arr.unshift(0); // Adds to beginning.

const array = [1, 2, 3, 4];
arr.slice(1, 3); // Returns a copy.
console.log(array);
//and many more


// :::High order functions:::
// A higher order function takes another function as an argument and returns a function.
// Array methods like map, filter, and reduce are higher-order methods because they accept callback functions.

const prices=[20,30,40,50]
const discounted =prices.map(price=>price*0.9)
console.log(discounted);



// another example
function createGreeter(greetings){
    return function(name){    //this inner function is taken as an argument.
        return `${greetings}, ${name}`
    }
}

const sayHi=createGreeter("Hello")
const sayBye=createGreeter("Bye")

console.log(sayHi("Ali"));
console.log(sayBye("Ali"));

