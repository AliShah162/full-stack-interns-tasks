// Type Inference is TypeScript's ability to automatically figure out the type of a variable based on the value you assign to it.

let Name1 = "Alice";      // TypeScript infers: string
let Ageis1 = 25;          // TypeScript infers: number
let isActive1 = true;     // TypeScript infers: boolean

function add2(a: number, b: number) {
    return a + b;  // TypeScript infers: number
}

let res2 = add2(12, 23);
console.log(res2);


// Array Types
// TypeScript infers the type of array elements.

let numbers1 = [1, 2, 3, 4];          // TypeScript infers: number[]
let names1 = ["Alice", "Bob"];        // TypeScript infers: string[]
let mixed1 = [1, "hello", true];      // TypeScript infers: (string | number | boolean)[]


// When TypeScript CANNOT Infer (Needs Your Help)
// If you declare a variable without assigning a value, TypeScript can't infer the type.

let x1;  // TypeScript infers: any (danger!)
x1 = 5;      // Okay
x1 = "hello"; // Okay (any allows anything)


// Solution: Explicitly type it

let y1: string;
y1 = "hello"; // Only strings allowed

export {};