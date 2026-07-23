// Generics allow you to write a function or component that works with any type, while still preserving type safety.
// Real-World Analogy
// Think of generics like a universal remote:
// It works with any TV brand (any type)
// But it still knows exactly how to control the TV (type safety)

// Generic function - works with any type T
function identity<T>(value: T): T {
    return value;
}

console.log(identity<string>("hello")); // "hello"
console.log(identity<number>(42));      // 42
console.log(identity("hello"));         // TypeScript infers: string

export{}


// Generic Array Functions
function getFirstElement<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined;
}
console.log(getFirstElement([1, 2, 3]));          // 1
console.log(getFirstElement(["a", "b", "c"]));    // "a"
console.log(getFirstElement([]));                 // undefined




// Generic with Multiple Types
function createPair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

console.log(createPair<string, number>("Alice", 25));
// ["Alice", 25]

console.log(createPair<number, boolean>(42, true));
// [42, true]

console.log(createPair("Bob", { age: 30 })); // TypeScript infers types
// ["Bob", { age: 30 }]




// Generic with Constraints

// Constraint: T must have a 'length' property
function getLength<T extends { length: number }>(item: T): number {
    return item.length;
}

console.log(getLength("hello")); // 5
console.log(getLength([1, 2, 3])); // 3
// console.log(getLength(42)); //  Error: number doesn't have 'length'