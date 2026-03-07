# Week-2 Revision

## Currying

Currying is a technique in functional programming where a function that takes multiple arguments is transformed into a sequence of functions, each taking a single argument.

### Example:

```javascript
function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

add(1)(2)(3); // 6
```

- **Currying with `bind()`**
- **Currying with Closures**

---

## Rest vs Spread Operators (`...`)

### Spread Operator

Used to unpack elements.

```javascript
const abc = [1, 2, 3];
console.log(...abc); // 1 2 3
```

### Rest Operator

Used to gather elements into an array.

```javascript
function gatherArgs(...args) {
  console.log(args); // [1, 2, 3]
}
gatherArgs(1, 2, 3);
```

---

## Performance Optimization

### Debouncing

Trigger an event only after a certain amount of time has passed since the last trigger.

### Throttling

Trigger an event only once in a certain amount of time.

### Advanced Throttling

Trigger the first and last occurrence of an event in a certain amount of time.

---

## Scripts: Async and Defer

| Attribute   | Downloading                      | Execution Time          | Order Guaranteed? |
| :---------- | :------------------------------- | :---------------------- | :---------------- |
| **None**    | Paused (Downloading + Executing) | Immediately             | Yes               |
| **`async`** | Continued (Downloading)          | Immediately after fetch | No                |
| **`defer`** | Continued (Downloading)          | After DOM completion    | Yes               |

> **Note:** `type="module"` behaves similarly to `defer` but provides native module support.

---

## Higher Order Functions (HOF)

Functions that take other functions as arguments or return functions as results.

### Example:

```javascript
function greet(name) {
  return `Hello, ${name}`;
}

function processUserInput(callback) {
  const name = "Rahul";
  console.log(callback(name));
}

processUserInput(greet);
```

---

## Promises

A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.

### Callback Hell and Pyramid of Doom

A chain of callbacks growing horizontally (to the right), making code hard to read and maintain.

### Promise States

- **Pending**: Initial state, neither fulfilled nor rejected.
- **Fulfilled**: The operation completed successfully (Settled).
- **Rejected**: The operation failed (Settled).

### Promise Result

- Initially `undefined`.
- After settlement: contains the **Value** (if fulfilled) or **Reason/Error** (if rejected).

### Promise APIs

| API                        | Success Condition        | Failure Condition                    | Result                                  |
| :------------------------- | :----------------------- | :----------------------------------- | :-------------------------------------- |
| **`Promise.all()`**        | All promises fulfill     | Any promise rejects (Fail Fast)      | Array of values / First error           |
| **`Promise.allSettled()`** | All promises settle      | Never rejects                        | Array of objects (status/value/reason)  |
| **`Promise.race()`**       | First promise to settle  | First promise to settle              | Value or error of the first to settle   |
| **`Promise.any()`**        | First promise to fulfill | All promises reject (AggregateError) | Value of first success / AggregateError |

---

## Async / Await

`async`/`await` is syntactic sugar built on top of Promises.

- `async` functions always return a **Promise**.
- `await` can only be used inside an `async` function.

```javascript
const p1 = new Promise((resolve) =>
  setTimeout(() => resolve("P1 Success"), 10000),
);

async function handlePromise() {
  console.log("Start");

  const val1 = await p1; // Function execution suspends for 10s
  console.log(val1);
}
```

---

## Error Handling

Used to manage runtime errors gracefully using:

- `try`
- `catch`
- `finally`

---

## Memory Management

### Types of Memory

- **Stack**: Stores primitive data types. Follows **LIFO** (Last In First Out) principle.
- **Heap**: Stores objects and complex data structures.

### Garbage Collection

The process of reclaiming memory that is no longer in use or reachable.

- **Mark-and-Sweep Algorithm**:
  1.  **Mark**: Marking all objects that are reachable from the roots.
  2.  **Sweep**: Removing all objects that were not marked (unreachable).

---

## JavaScript V8 Engine Architecture

The execution flow within the engine:

1.  **Code**
2.  **Parser**
3.  **AST** (Abstract Syntax Tree)
4.  **Ignition** (Interpreter) → Generates **Bytecode**
5.  **TurboFan** (JIT Compiler) → Generates **Optimized Machine Code**
6.  **Execution**
