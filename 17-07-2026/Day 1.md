Day 1 (7/17/2026)

1) What is JavaScript?
   JavaScript is a versatile, high level and dynamically typed programming language which brings life to web pages by making them interactive. It is used for building    interactive web applications and supports both client-side and server-side development.
   For example we can change colors, hide images and update text. This adds the interactivity in a web page.

2) How JavaScript works under the hood?
   It is a single threaded language because it can only do one task at a time.  Here is what i learned:
   1. The Engine (The Brain)
    * Every browser has a JavaScript Engine built into it.
    * Chrome/Edge: V8 (developed by Google)
    * Firefox: SpiderMonkey
    * Safari: JavaScriptCore
     
   2. The Parser (Lexical Analysis)
      * When the engine receives your code, the first step is the Parser.
      * It reads your entire file character by character.
      * It breaks the code into tokens (e.g., function, const, =, {, }).
      * It builds an AST (Abstract Syntax Tree). This is a nested tree structure that represents the logical structure of your code. For example, if statements become         branches, and for loops become nodes.

    3. The Interpreter vs. Compiler
       * This is where JavaScript differs from older languages like C (which compiles ahead of time) or Python (which interprets line-by-line). JavaScript uses Both.
       * Ignition (Interpreter): The engine takes the AST and quickly translates it into Bytecode (a low-level, platform-agnostic representation). It executes this bytecode   immediately. This is why JavaScript feels fast to start.
       * TurboFan (Compiler): While the bytecode is running, the engine is profiling it. It watches for "Hot" functions—code that runs more than a few times.  
    
    4. The Memory Heap (Storage)
       * All of your variables, objects, functions, and arrays live in the Memory Heap.
       * This is an unstructured, large region of memory.
       * When you create an object (const obj = {}), the engine requests a chunk of memory from the heap to store it.
       * Because heap memory is limited, the engine has a Garbage Collector (in V8, it's called Orinoco) that runs periodically. It uses Mark-and-Sweep to find objects that are no longer "reachable" by your code and frees that memory.
    
    5. The Call Stack (Execution)
       * JavaScript is single-threaded, meaning it has only one Call Stack.
       * The Call Stack is a LIFO (Last In, First Out) data structure.
       * When you call a function, it gets pushed onto the top of the stack.
       * When the function returns a value, it gets popped off.
       * More Importantly: If you put a heavy calculation like a massive while loop on the stack, it blocks everything else. The browser will freeze until that function pops off which is not a good practice.

    6. The Event Loop & Callback Queue (Asynchronous Thing)
       * Since JavaScript is single-threaded, how does it handle setTimeout, API calls, or click events without freezing?
       * It delegates heavy tasks to the browser's Web APIs (or C++ APIs in Node.js) while the main thread keeps running.
         Here is the flow:
       * You call setTimeout(() => console.log("Hi"), 5000).
       * The engine pushes this onto the Call Stack.
       * The engine sees setTimeout is a Web API and hands it off to the browser's timer thread.
       * It pops setTimeout off the Call Stack immediately. The main thread keeps running.
       * 5 seconds later, the browser's timer finishes. It pushes the callback into the Callback Queue (also called the Task Queue).
T      *  The Event Loop constantly checks: "Is the Call Stack empty?"
       * When the Call Stack is empty, the Event Loop takes the first callback from the Queue and pushes it onto the Call Stack to be executed.

       * Microtasks (The VIP Queue):
         Promises (.then(), catch) do not go to the Callback Queue. They go to a Microtask Queue, which has a higher priority. The Event Loop will empty the entire Microtask Queue before it touches the Callback Queue.

    7. Execution Contexts and Hoisting
       * Every time the engine runs a script, it creates a Global Execution Context (GEC). When a function is called, it creates a Functional Execution Context (FEC). Each context has two phases:
       * Creation Phase: The engine scans for variable declarations (var) and function declarations. It sets up memory for them and initializes them to undefined (for var) or stores the whole function body. This is Hoisting.
       * Execution Phase: The code runs line-by-line, assigning actual values to the variables.
       * The Lexical Environment (Scopes):
          Each Execution Context has a reference to its Outer Environment. When you try to access a variable, JavaScript looks inside the current context. If it doesn't find it, it goes up to the parent context. This chain is the Scope Chain. Closures work because a function retains its Lexical Environment even after the outer function finishes executing.



3) Event Loop
 The event loop just checks if the stack is empty or not, and if its empty it just pushes the next thing in the quene to the stack.
 The Event Loop will NEVER execute a Task from the Callback Queue until the Microtask Queue is COMPLETELY EMPTY.

Here’s the exact algorithm the Event Loop follows every single "tick"":

Check the Call Stack. Is it empty? If not, wait.
Check the Microtask Queue.
If there is any microtask, take it out and push it onto the Call Stack.
Execute it.
Repeat until the Microtask Queue is completely empty. (This is called "draining" the microtasks.)
Now, check the Callback Queue.
Take ONE task from the front of the queue.
Push it onto the Call Stack and execute it.
Go back to Step 1.

this repitition makes it the Event "Loop"

a program to understand it more clearly........
-----------------------------------------------------------------

--console.log("1. Start");  →   console.log("1")pushed to stack, prints, pops.

--setTimeout(() => console.log("2. Timeout"), 0); → setTimeout  pushed to stack. Browser API takes it. Since delay is 0, it's immediately moved to the Callback Queue. setTimeout pops off stack.

--Promise.resolve().then(() => console.log("3. Promise"));     → pushed to stack. The .then callback is moved to the Microtask Queue. Promise resolves, pops off stack. 

--console.log("4. End");  → pushed to stack, prints, pops. Call Stack is now empty.

Now this hapens:
Event Loop sees empty stack.

Step A: Check Microtask Queue. It finds the Promise callback. Push it to stack. Prints "3. Promise". Pop it. Microtask Queue is now empty.

Step B: Microtask Queue is empty. Now check Callback Queue. Finds the setTimeout callback. Push it to stack. Prints "2. Timeout". Pop it.


4) What exactly is the Call Stack?
      It is a data structure (a LIFO stack – Last In, First Out) stored in your computer’s RAM.
      It tracks execution context. Every time your script calls a function, the engine creates a new Execution Context and pushes it onto the top of this stack.
      It tracks where we are. The engine executes whatever is at the very top of the stack. Once that function finishes (returns), it is popped off, and the engine resumes   execution right where it left off in the function underneath it.




