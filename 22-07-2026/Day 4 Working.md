<!-- Single Thread Nature  -->
//JavaScript is often described as single-threaded, which means that one main JavaScript thread executes your code one piece at a time.
//A thread is like a worker that executes instructions. If a program is multi-threaded, it can have multiple workers doing different things at the same time. It does not execute two JavaScript statements at the exact same time.
<!-- <!-- Why is it single threaded? -->
//If multiple threads could change the same webpage at the same time:
Thread 1: change button color to red
Thread 2: change button color to blue
<!-- so who wins? -->
You could get race conditions and unpredictable behavior.
A single thread makes things simpler. The browser knows exactly what happens and when.
JavaScript itself is single-threaded, but the  environment around JavaScript is not.


 <!-- For example, browsers provide: -->
* Web APIs
* timers
* network requests
* DOM events
<!-- Node.js provides: -->
* file system operations
* networking
* background tasks
These can run outside the JavaScript thread.

<!-- Blocking the Single Thread -->
Because there is only one thread, a long-running task blocks everything.

console.log("Start");
for(let i = 0; i < 10000000000; i++) {
}
console.log("End");

During the loop:

buttons freeze
animations stop
clicks cannot run
Because the single JavaScript thread is busy.


<!-- Callbacks -->
The Callback Queue (also called the Task Queue or Macrotask Queue) is a place where callbacks wait until JavaScript is ready to execute them.

Remember:
JavaScript has one call stack.
If the stack is busy, new callbacks cannot run immediately.
They are placed in the callback queue and wait.



<!-- Web Apis: -->
Web APIs are features provided by the browser, not by the JavaScript language itself.
JavaScript alone only knows things like:
variables
functions
objects
arrays
promises
<!-- It does not know how to: -->
wait for 5 seconds
make HTTP requests
access the DOM
listen for button clicks
The browser provides these capabilities through Web APIs.
<!-- Examples -->
setTimeout()
setInterval()
fetch()
document
localStorage
navigator
console
addEventListener()

If JavaScript itself handled the network request, the single thread would be blocked until the response arrived.
Instead:
1) JavaScript asks the browser to handle fetch.
2) Browser performs the request in the background.
3) JavaScript continues executing.
This keeps the page responsive.

<!-- Microtasks & Macrotasks -->
as the name suggests micro and macro. micro is smaller and macro is larger than micro.
in js, micro and macro queues both have tasks in them. Microtasks work mmediately after current stack clears, and macro tasks work after all microtasks are drained.  The Mircotask queue goes first then the Macrotask queue.
<!-- Microtasks examples -->
Promise.then(), catch(), finally()
<!-- macrotasks example -->
setTimeout, setInterval, setImmediate

<!-- Microtask Queue (VIP Lane) they go first -->
- Promise.then() / catch() / finally()
- queueMicrotask()
- MutationObserver callbacks
- process.nextTick() (Node.js)

<!-- Macrotask Queue (Regular Lane) -->
- setTimeout()
- setInterval()
- setImmediate() (Node.js)
- I/O callbacks (file reads, network)
- UI rendering events (click, scroll)
- requestAnimationFrame()

<!-- NOTE -->
The Event Loop will NEVER execute a macrotask until the Microtask Queue is COMPLETELY EMPTY.


<!-- Callbacks -->
A callback is a function that you pass to another function, to be called (executed)  later.

<!-- Code example -->
function ringPhone() {
    console.log(" Ring.....!");
}

// The "someone" who will call you back
setTimeout(ringPhone, 3000);

console.log(" Timer started...");
// Output:
//  Timer started...
// (3 seconds later)
//  Ring.....!


<!-- Promise Queue -->
The Promise Queue is a special waiting area where .then(), .catch(), and .finally() callbacks wait to be executed. It has the HIGHEST priority.
Think of it like a VIP line at a club. Promise callbacks are the VIPs. They get to go FIRST before anyone else. Even if they arrived later than others

<!-- Code Example -->
console.log("1. Im first")
promise.resolve().then(()=>{
    console.log("2. Im VIP! I'll go first.")   Promise runs BEFORE setTimeout
})
settimeout(()=>{
    console.log("3. I am regular.")
})
console.log("4. i am last")

<!-- NOTE -->
so promise has more priority like it is in microtask queue, then the settimeout which is in macrotask queue, then the logs.




<!-- Callback Hell -->
callback hell is also know as pyramid hell. Callback Hell is when you have too many nested callbacks, making your code look like a pyramid and hard to read/debug. 
<!-- Code Example -->


getUser(1, (user) => {
    getOrders(user.id, (orders) => {
        getOrderDetails(orders[0].id, (details) => {
            getPayment(details.paymentId, (payment) => {
                console.log("Payment:", payment);
                // More nesting... and more... and more..........
            });
        });
    });
});

// Each level adds more indentation, Hard to read
// Errors are hard to track, Which callback failed?
// Hard to maintain, Change one thing, break everything

<!-- . Promises -->
Promises are the soulution to callback hells. A Promise is an object that represents the eventual completion or failure of an asynchronous operation.

<!--Code Example -->
// this is clean
getUser(1)
    .then(user => getOrders(user.id))
    .then(orders => getOrderDetails(orders[0].id))
    .then(details => getPayment(details.paymentId))
    .then(payment => {
        console.log("Payment:", payment);
    })
    .catch(error => {
        console.error("Error:", error); // Single error handler!
    });

//Flat, readable, easy to debug
//Single .catch() for all errors
//Easy to add/remove steps

<!-- Async/Await  -->
Async/Await is a cleaner way to work with Promises, making asynchronous code look and behave like synchronous code.

<!-- Code Example -->
async function getPaymentInfo(){
    try{
        const user= await getuser(1)
        const order= await getOrders(user.id)
        const details= await getOrderDetails(orders[0].id)
        const payment= await getPayment(details.paymentID)
        console.log("payment:", payment)
    }.catch(error){
        console.log("error:",error)

    }

}
getPayments()



<!-- Difference between using promises.then and async await. Why we should use async await over promises? -->
Here is a plain, connected summary of the key differences:

The biggest difference comes down to **how the code looks and feels** when you read and write it. 

When you use **`.then()`**, you are working with Promises directly, which forces you to write your asynchronous steps as a chain of callback functions. This makes the flow of your code jump horizontally from one `.then()` block to the next, so you often have to declare variables outside the chain if you need to use them later. Error handling also gets scattered because you need a separate `.catch()` at the end, and figuring out exactly which step failed can sometimes be tricky. You're essentially writing a series of instructions that are linked together but still look like separate pieces.

On the other hand, **`async/await`** is built on top of Promises, but it completely changes the syntax so that your asynchronous code reads just like normal, synchronous JavaScript. You write your steps one after another, top to bottom, which is much more natural and readable. All your variables are in the same scope, so you can easily use the result from one step in any of the following steps. Error handling becomes beautifully simple with a single `try/catch` block that wraps everything, catching errors from any step in one place. Plus, debugging is much easier because you can set breakpoints and step through the code line by line, just like you would with regular code.

In short, **`.then()` is about chaining functions**, while **`async/await` is about writing asynchronous code that looks and behaves like synchronous code**. 

They both do the exact same thing under the hood, but `async/await` makes your life a lot easier by helping you write cleaner, more maintainable, and more readable code.
