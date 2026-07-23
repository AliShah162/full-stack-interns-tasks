// Typing a function means specifying what types of arguments it accepts and what type of value it returns.
// Think of a typed function like a vending machine:

// It only accepts certain coins (argument types)
// It only gives you specific items (return type)
// If you put in the wrong coin, it rejects it

function greet1(name: string): string {
    return `Hello, ${name}!`;
}

// This would cause an error:
// greet1(42); // Error: Argument of type 'number' is not assignable to parameter of type 'string'

// this works:
greet1("Alice");

// Return Types
// Specify what the function returns.

function add1(a: number, b: number): number {
    return a + b;
}

function getName1(): string {
    return "Alice";
}

function isActive1(): boolean {
    return true;
}

// This would cause an error:
// function add1(a: number, b: number): number {
//     return "hello"; // Error: Type 'string' is not assignable to type 'number'
// }


// Optional Parameters (?)
function greet2(name: string, title?: string): string {
    if (title) {
        return `Hello, ${title} ${name}!`;
    }
    return `Hello, ${name}!`;
}

console.log(greet2("Alice")); // "Hello, Alice!"
console.log(greet2("Alice", "Ms.")); // "Hello, Ms. Alice!"


// Default Parameters
function greet3(name: string, title: string = "Mr./Ms."): string {
    return `Hello, ${title} ${name}!`;
}

console.log(greet3("Alice")); // "Hello, Mr./Ms. Alice!"
console.log(greet3("Alice", "Dr.")); // "Hello, Dr. Alice!"


// Rest Parameters
function sum1(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum1(1, 2, 3)); // 6
console.log(sum1(10, 20, 30, 40)); // 100



// Function Types

// 1. Using Type Annotations
// Function type: (string) => string
let greet4: (name: string) => string;

greet4 = function (name: string): string {
    return `Hello, ${name}!`;
};

console.log(greet4("Alice")); // "Hello, Alice!"


// 2. Using Type Aliases
type GreetFunction1 = (name: string) => string;

const greet5: GreetFunction1 = (name) => {
    return `Hello, ${name}!`;
};

console.log(greet5("Alice")); // "Hello, Alice!");


// 3. Using Interfaces
interface GreetFunction2 {
    (name: string): string;
}

const greet6: GreetFunction2 = (name) => {
    return `Hello, ${name}!`;
};

console.log(greet6("Alice")); // "Hello, Alice!");



// Callback Functions
// Function that accepts a callback
function processUser1(
    name: string,
    callback: (name: string) => string
): string {
    return callback(name);
}

// Using the function
const result1 = processUser1("Alice", (name) => {
    return `Hello, ${name}!`;
});

console.log(result1); // "Hello, Alice!");


// Generic Functions (Reusable Types)
// Generic function - works with any type
function identity1<T>(value: T): T {
    return value;
}

console.log(identity1<string>("hello")); // "hello"
console.log(identity1<number>(42)); // 42
console.log(identity1("hello")); // TypeScript infers the type


// Generic array function
function getFirstElement1<T>(arr: T[]): T | undefined {
    return arr[0];
}

console.log(getFirstElement1([1, 2, 3])); // 1
console.log(getFirstElement1(["a", "b", "c"])); // "a"


export {};