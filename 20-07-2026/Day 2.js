var a=10   // can be redeclared, can be reused
let b=20  // Block scoped, cannot be redeclared
const c=30 //Block scoped, cannot be reassigned
console.log(a,b,c)

// :::Hoisting:::
// Hoisting is JavaScript's default behavior of allocating memory for variable, function, and class declarations during the compilation phase, making them accessible in the code before the line where they are actually written.
// What you write:
console.log(x);    // Output: undefined (not an error!)
var x = 5;
// How JavaScript sees it:
var x;             // Hoisted to top
console.log(x);    // undefined
x = 5;             // Initialization stays
// With let and const (Temporal Dead Zone)
// console.log(y);  // ❌ Error: Cannot access before initialization
let y = 10;
// Function declarations are fully hoisted
sayHello();        // ✅ Works! "Hello!"
function sayHello() {
    console.log("Hello!");
}


// :::TDZ:::
// It is the specific period in code execution where a variable exists but cannot be accessed before it is formally declared, resulting in a ReferenceError [1]

// :::Lexical Scope:::
// In JavaScript, lexical scope (also called static scope) means that the accessibility of variables is determined by where functions and variables are written in the code, not where they are called. In JavaScript, a function can access variables from its own scope and from the scopes in which it was created, regardless of where it is later called.

function outer(){
    let message="I am outer"
    function inner(){
        console.log(message)
    }
    inner()//inner() can access message because it is lexically inside outer(). The scope is decided by the code structure.
}
outer() 


// :::Closures:::
// Closures happen when an inner function retains access to variables from its outer lexical scope, even after the outer function has returned.


function counter(){
    let count =0
    return function(){   //the returned function still references count
        count++
        console.log(count)
    }
}
const increament=counter()
increament()
increament()
increament()



// :::Primitive Types & Refrences:::
// Primitive values are stored directly by value. JavaScript has these primitive types:
// string
// number
// boolean
// undefined
// null
// bigint
// symbol
let i=10
let j=i    //j gets a copy of i's value, so changing j doesn't affect i.
console.log(i,j)    

// :::Reference Types:::
// Objects are stored by reference. Non primituve values are also called refrences.
// Reference types include:
// Object
// Array
// Function
// Date
// Map
// Set
// etc.

let p={name:"Ali"}
let q =p   //now beacuse of p's refrence, q has same values as p does.
console.log(p.name)
console.log(q.name);



// :::typeof operator:::
//this operator is used to find the type of a value like:
let u=123
let g="Ali"
console.log(typeof(u)); //number
console.log(typeof(g)); //string

//more importantly typeof null; // "object"
// This is a historical bug in JavaScript that cannot be fixed for backward compatibility.


//:::Type Convresion:::
//this is used to convert one type into another
//string to number
let v= Number("123") //this string will convert into number because of "Number" which is a type converter
console.log(v);
// number to string
let l=123
const z= l.toString() //this will convert the number into string
console.log(z);
console.log(typeof(z));

//moreover....
//Falsy Values, There are only 8 falsy values:

// false
// 0
// -0
// 0n
// ""
// null
// undefined
// NaN      everything else is truthy


//:::Type Coercion (Implicit Conversion):::
// Type coercion happens when JavaScript automatically converts types during operations.

"5" + 2; // "52"      "+" with a string performs concatenation.

//Numeric Coercian
"5" - 2; // 3
"5" * 2; // 10
"5" / 2; // 2.5
//Boolean Coercian
if ("hello") {
  console.log("truthy");
}