<!-- TypeScript Concepts fron now on -->


<!-- string -->
string represents textual data, anything you write inside quotes.
let firstName: string = "Alice";
<!-- Number -->
number represents all numeric values like integers, decimals, positive, negative, and even special numbers like Infinity and NaN
let age: number = 25;
<!-- boolean, True or False -->
boolean represents a logical value — either true or false.
let isLoggedIn: boolean = true;
<!-- any -->
any tells TypeScript to turn off type checking for a variable. It can hold ANY value string, number, object, whatever.
let flexible: any = 42;
flexible = "Hello";     // Allowed
flexible = true;        // Allowed
flexible = { name: "Alice" }; // Allowed

<!-- unknown  -->
unknown is like any but SAFE. It can hold any value, but you CANNOT use it until you check what type it actually is.
let mystery: unknown = "Hello";
if (typeof mystery === "string") {
    console.log(mystery.toUpperCase()); // "HELLO" (safe!)
}

<!-- The Golden Rule -->
Use any only when you have no other choice. Use unknown when you truly don't know the type but still want safety.
