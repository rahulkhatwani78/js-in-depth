# Closures, First Class Functions and Callback Functions

## 1. Closures

### Definition

A **Closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the **lexical environment**). In other words, a closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

### Use-cases

- **Module Pattern**: To encapsulate variables and only expose a public API.
- **Function Factories**: Creating functions with preset values.
- **Data Privacy**: Simulating private variables that cannot be accessed directly from outside the scope.
- **Event Handlers/Callbacks**: Maintaining state across asynchronous operations.
- **Memoization**: Storing results of expensive function calls.

### Advantages

- **Encapsulation**: Helps in keeping variables private and preventing global namespace pollution.
- **State Persistence**: Allows a function to "remember" the environment in which it was created even after it finishes execution.
- **Currying**: Facilitates advanced functional programming techniques.

### Disadvantages

- **Memory Consumption**: Closures can lead to high memory usage because the variables in the outer scope are not garbage collected as long as the inner function exists.
- **Complexity**: Overusing closures can make the code harder to read and debug for developers unfamiliar with the concept.
- **Memory Leaks**: If not handled properly (especially in older browsers), they can cause memory leaks.

---

### Closure Examples

#### Example 1: Basic Closure

```javascript
function outer() {
  let a = 10;

  function inner() {
    console.log(a); // Accessing variable from outer scope
  }

  return inner;
}

let fn = outer();
fn(); // Output: 10
```

#### Example 2: Closure with `setTimeout` & Loops

```javascript
function x() {
  for (var i = 1; i <= 5; i++) {
    function y(temp) {
      setTimeout(() => console.log(temp), temp * 1000);
    }
    y(i); // Passing 'i' to create a new scope for each iteration
  }
}
x();
```

#### Example 3: Construction Function with Closures (Data Privacy)

```javascript
function counter() {
  var count = 0; // Private variable

  this.increase = function () {
    count++;
    console.log(count);
  };

  this.decrease = function () {
    count--;
    console.log(count);
  };
}

let c1 = new counter();
c1.increase(); // Output: 1
c1.increase(); // Output: 2
c1.decrease(); // Output: 1
```

---

---

## 2. Function Statement vs. Function Expression

### Function Statement (also known as Function Declaration)

A function statement is the traditional way of defining a function. These are hoisted, meaning you can call them even before they are defined in the code.

```javascript
function func() {
  console.log("Hello from Function Statement");
}
func();
```

### Function Expression

A function expression is when a function is assigned to a variable. These are **not** hoisted; attempting to call them before the assignment will result in a `TypeError`.

#### Using Anonymous Function

```javascript
var func2 = function () {
  console.log("Anonymous Function Expression");
};
func2();
```

#### Using Named Function Expression

```javascript
var func3 = function func4() {
  console.log("Named Function Expression");
  // console.log(func4); // Accessible inside its own scope
};
func3();
// func4(); // ReferenceError: func4 is not defined in global scope
```

---

## 3. Key Concepts

### Anonymous Functions

Functions without a name. They are primarily used when functions are used as values (like in expressions or as callbacks).

```javascript
var func5 = function () {
  console.log("I have no name!");
};
```

### Parameters vs. Arguments

- **Parameters**: The labels used in the function definition (e.g., `param1`, `param2`).
- **Arguments**: The actual values passed to the function when it's invoked (e.g., `1`, `2`).

```javascript
function sum(a, b) {
  // a, b are Parameters
  return a + b;
}
sum(10, 20); // 10, 20 are Arguments
```

### First Class Functions

In JavaScript, functions are **First Class Citizens**. This means:

1. They can be assigned to variables.
2. They can be passed as arguments to other functions.
3. They can be returned from other functions.

```javascript
function greet() {
  return "Hello";
}

function execute(fn) {
  console.log(fn());
}

execute(greet); // Passing function as an argument
```

### Arrow Functions

Introduced in ES6, they provide a shorter syntax and do not have their own `this` binding.

```javascript
const func8 = () => console.log("Short and sweet!");
func8();
```

---

## 4. Callback Functions

A **Callback Function** is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

```javascript
function fetchData(callback) {
  console.log("Fetching data...");
  callback();
}

fetchData(() => console.log("Data received!"));
```

### Common Examples

- **Event Listeners**: `button.addEventListener("click", () => console.log("Clicked!"));`
- **Timers**: `setTimeout(() => console.log("Delayed message"), 1000);`

---

## 5. Closure Demo with Event Listeners

Closures are often used with event listeners to maintain state (like a counter) without polluting the global scope.

```javascript
function attachEventListener() {
  let count = 0; // State maintained via closure
  document.getElementById("clickMe").addEventListener("click", function xyz() {
    console.log("Button Clicked", ++count);
  });
}
attachEventListener();
```

_In this example, the function `xyz` forms a closure with the `count` variable, "remembering" its value even after `attachEventListener` has finished executing._

---

## 6. Garbage Collection & Memory Management

### Definition

**Garbage Collection** is the automatic process of reclaiming memory that is no longer being used by the application. The JavaScript engine (like V8) uses an algorithm called **Mark-and-Sweep**.

### How it Works

- The engine starts from "roots" (like the global object) and "marks" all reachable objects.
- Anything not marked as reachable is considered "garbage" and is "swept" (removed) to free up memory.

### Relationship with Closures

Closures can sometimes lead to **Memory Leaks** because as long as the inner function is reachable (e.g., an event listener still exists), the variables in its lexical environment cannot be garbage collected, even if they are no longer needed. Modern engines perform "Smart Garbage Collection" to partially clean up variables in the outer scope that aren't actually referenced by the inner function.
