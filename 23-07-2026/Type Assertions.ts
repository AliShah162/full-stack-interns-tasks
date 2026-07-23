// A type assertion tells TypeScript "I know better than you about the type of this value."
// Think of type assertion like telling someone "Trust me, I know what's in this box" even if they're not sure.

// TypeScript infers: any or unknown
let value: any = "hello";

// Tell TypeScript: "Trust me, it's a string"
let stringValue = value as string;
console.log(stringValue.toUpperCase()); // "HELLO"

// Another example
let element = document.getElementById("myButton") as HTMLButtonElement;
element.disabled = false; // TypeScript now knows it's a button



// Angle Brackets Syntax (Alternative)
let value2: any = 42;
let numberValue = <number>value;   //this is alternate
console.log(numberValue * 2); // 84




// When to Use Type Assertions
// 1. When working with DOM elements
const input = document.getElementById("userInput") as HTMLInputElement;
console.log(input.value); // TypeScript now knows it's an input element

// 2. When dealing with API responses
interface User {
    id: number;
    name: string;
}

const response = JSON.parse('{"id": 1, "name": "Alice"}') as User;
console.log(response.name); // "Alice"
