// An interface is a way to define a custom type for objects. It describes:
// What properties an object should have
// What type each property should be
// Which properties are required vs optional

interface User1 {
    name: string;
    age: number;
    phone?: string; // Optional property
}

const user1: User1 = {
    name: "Alice",
    age: 25
    // phone is optional, so this is fine
};

const user2: User1 = {
    name: "Bob",
    age: 30,
    phone: "555-1234" // Works too
};


// Methods in interfaces
interface Person1 {
    name: string;
    greet(): string; // Method
}

const alice1: Person1 = {
    name: "Alice",
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};

console.log(alice1.greet()); // "Hello, I'm Alice"


// Extending Interfaces
interface BaseUser1 {
    name: string;
    email: string;
}

interface AdminUser1 extends BaseUser1 {   // AdminUser1 uses the properties of BaseUser1 because of the extends keyword
    role: "admin";
    permissions: string[];
}

const admin1: AdminUser1 = {
    name: "Alice",
    email: "alice@company.com",
    role: "admin",
    permissions: ["read", "write", "delete"]
};


// Types
// A type is a classification that tells TypeScript what kind of data a value represents and what operations are allowed on that value.

type User2 = {
    id: number;
    name: string;
};

let user3: User2 = {
    id: 1,
    name: "Ali"
};

// Here, User2 is a custom type that says every user object must have:
// an id of type number
// a name of type string


// Using Extend with Type
type Person2 = {
    name: string;
    age: number;
};

type Employee1 = Person2 & {
    employeeId: string;
    department: string;
};

const emp1: Employee1 = {
    name: "Alice",
    age: 25,
    employeeId: "E123",
    department: "Engineering"
};


export {};