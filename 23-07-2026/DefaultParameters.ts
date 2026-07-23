// Optional Parameter → A parameter that you don't have to provide when calling the function (marked with ?).
// Default Parameter → A parameter that gets a default value if you don't provide one


// Optional Parameters
// Optional parameter: title?
function greet1(name: string, title?: string): string {
    if (title) {
        return `Hello, ${title} ${name}!`;
    }
    return `Hello, ${name}!`;
}

console.log(greet1("Alice"));        // "Hello, Alice!"
console.log(greet1("Alice", "Ms.")); // "Hello, Ms. Alice!"

// Multiple optional parameters
function createUser(
    name: string,
    age?: number,
    email?: string
): object {
    const user: { name: string; age?: number; email?: string } = { name };
    if (age) user.age = age;
    if (email) user.email = email;
    return user;
}

console.log(createUser("Alice"));              // { name: "Alice" }
console.log(createUser("Alice", 25));          // { name: "Alice", age: 25 }
console.log(createUser("Alice", 25, "a@b.com")); // { name: "Alice", age: 25, email: "a@b.com" }




// Default Parameters

// Default parameter: title = "Mr./Ms."
function greet(name: string, title: string = "Mr./Ms."): string {
    return `Hello, ${title} ${name}!`;
}

console.log(greet("Alice"));        // "Hello, Mr./Ms. Alice!"
console.log(greet("Alice", "Dr.")); // "Hello, Dr. Alice!"

// Default with other parameters
function createMessage(
    text: string,
    prefix: string = "[INFO]",
    suffix: string = ""
): string {
    return `${prefix} ${text} ${suffix}`.trim();
}

console.log(createMessage("Hello"));           // "[INFO] Hello"
console.log(createMessage("Hello", "[ERROR]")); // "[ERROR] Hello"
console.log(createMessage("Hello", "[ERROR]", "!")); // "[ERROR] Hello !"



export {};