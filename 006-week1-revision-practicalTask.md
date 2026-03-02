# Week-1 Revision and Practical Task

---

## 1. Execution Context

Global Execution Context (GEC) is created. Execution Context is created for every function call.

Execution Context has 2 components:

1. **Memory Component (Variable Environment)**
2. **Code Component (Thread of Execution)**

The code is executed in 2 phases:

1. **Memory Creation Phase**
   - Variables are allocated memory
   - Functions are stored as a whole in memory
2. **Execution Phase**
   - Variables are assigned values
   - Functions are executed

---

## 2. Call Stack

When the Global Execution Context is created, it is pushed into the Call Stack. It follows the **LIFO (Last In First Out)** principle.

- When a function is called, a Function Execution Context is created and pushed into the Call Stack.
- When the function execution is completed, the Function Execution Context is popped out of the Call Stack.
- When all code is executed, the Global Execution Context is popped out of the Call Stack.

---

## 3. Hoisting

It is a behavior of JavaScript where variables and function declarations are allocated memory before the code is executed.

- `var` is hoisted and assigned `undefined`.
- `let` and `const` are hoisted but not initialized (they are in the Temporal Dead Zone).

---

## 4. window object

In the browser, the global object is the `window` object.

- Variables declared with `var` are added as properties of the `window` object.
- Variables declared with `let` and `const` are not added as properties of the `window` object.

---

## 5. this keyword

At the global level, `this` points to the global object (i.e., `window` object).

```javascript
function sayHi() {
  console.log(this); // global object
}

sayHi();

const func = () => {
  console.log(this); // global object
};

func();

const obj = {
  name: "Rahul",
  func: () => {
    console.log(this); // global object
  },
  sayHi: function () {
    console.log(this); // obj
  },
};

obj.func();
obj.sayHi();
```

---

## 6. Lexical Environment

A Lexical Environment is an internal structure used to store variables and their references. It contains two parts:

1. **Environment Record**: Where variables and function declarations are stored.
2. **Reference to the outer environment**: A link to the parent lexical environment.

---

## 7. Scope Chain

The Scope Chain is the mechanism used to resolve variable values.

1. It first checks the current Lexical Environment.
2. If not found, it checks the outer Lexical Environment.
3. This process continues until the variable is found or the global lexical environment is reached.
4. If the variable is not found in the global lexical environment, it returns `undefined` (or throws a ReferenceError if accessed).

---

## 8. TDZ (Temporal Dead Zone)

When variables are declared using `let` and `const`, they are in the TDZ from the start of the block until the code execution reaches the line where they are declared. Accessing variables in the TDZ throws a `ReferenceError`.

```javascript
// console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10; // TDZ for 'a' ends here
console.log(a); // Output: 10
```

---

## 9. Block Scope

A block is defined by a pair of curly braces `{}`.

- `let`, `const`, and `class` are block-scoped.
- `var` is function-scoped.
- Every block `{}` creates its own Lexical Environment.

```javascript
{
  let a = 10;
  const b = 20;
  var c = 30;
}

console.log(a); // ReferenceError: a is not defined
console.log(b); // ReferenceError: b is not defined
console.log(c); // Output: 30
```

---

## 10. Closure

A closure is a function that has access to the variables in its lexical scope, even after the outer function has finished executing.

**Advantages:**

1. Data Hiding and Encapsulation
2. Function Factory
3. Currying
4. Maintaining State

**Disadvantages:**

1. Potential Memory Leaks
2. Higher Memory Consumption
3. Complexity for Debugging

```javascript
function outer() {
  let name = "Rahul";
  function inner() {
    console.log(name); // Remembers 'name' from outer lexical scope
  }
  return inner;
}

const func = outer();
func(); // Output: Rahul
```

---

## 11. Function Statement / Function Declaration

A function statement is a named function. It is hoisted and can be called before its declaration in the code.

```javascript
function sayHi() {
  console.log("Hello");
}
```

---

## 12. Function Expression

A function expression is a function assigned to a variable. It is not hoisted as a function (if using `var`, it's `undefined`; if using `let`/`const`, it's in TDZ).

```javascript
const sayHi = function () {
  console.log("Hello");
};
```

---

## 13. Anonymous Function

An anonymous function is a function without a name. It is typically used in function expressions or as callbacks.

```javascript
const sayHi = function () {
  console.log("Hello");
};
```

---

## 14. Parameters vs Arguments

- **Parameters**: The placeholders defined in the function signature.
- **Arguments**: The actual values passed to the function when it is invoked.

```javascript
function sayHi(name) {
  // 'name' is a parameter
  console.log("Hello " + name);
}

sayHi("Rahul"); // "Rahul" is an argument
```

---

## 15. First Class Functions / First Class Citizens

Functions are first-class citizens in JavaScript, meaning they can be treated like any other variable.

```javascript
function sayHi() {
  console.log("Hello");
}

const sayHi2 = sayHi; // Assigned to a variable
sayHi2();

function executeFunction(fn) {
  fn(); // Passed as an argument
}
executeFunction(sayHi);

function createFunction() {
  return function () {
    // Returned from another function
    console.log("Hello");
  };
}
const sayHi3 = createFunction();
sayHi3();
```

---

## 16. Arrow Functions

Arrow functions provide a concise way to write function expressions. They do not have their own `this` binding.

```javascript
const sayHi = () => {
  console.log("Hello");
};

sayHi();
```

---

## 17. Callback Functions

A callback function is passed as an argument to another function to be executed later.

```javascript
function outerFunction(callback) {
  console.log("Outer function is executing");
  callback();
}

function callbackFunction() {
  console.log("Callback function is executing");
}

outerFunction(callbackFunction);
```

---

## 18. Event Loop

The Event Loop is the mechanism that allows JavaScript to perform non-blocking I/O operations.

**Working of Event Loop:**

1. Lines of code are executed one by one and pushed to the **Call Stack**.
2. Async tasks are sent to **Web APIs**, and the Call Stack continue execution.
3. Once an async task completes, its callback moves to the **Callback Queue** or **Microtask Queue**.
4. The Event Loop waits until the **Call Stack is empty**.
5. It then pushes tasks from the Microtask Queue (highest priority) and then the Callback Queue to the Call Stack.

---

## 19. Starvation

Starvation occurs when the Microtask Queue is so busy that the Callback Queue (Macro Tasks) never gets a chance to execute.

```javascript
function infinitelyResolvedPromise() {
  Promise.resolve().then(infinitelyResolvedPromise);
}
```

---

## 20. Prototype

A Prototype is an object associated with every function and object in JavaScript. it is used to share properties and methods across instances.

---

## 21. Prototypal Chain

The Prototypal Chain is the mechanism used to inherit properties.

1. JS checks the object itself.
2. If not found, it checks the object's prototype (`__proto__`).
3. This continues up the chain until it reaches `Object.prototype`.
4. If it reaches `null`, it returns `undefined`.

- **`prototype`**: A property only on functions, used as the blueprint for objects created with `new`.
- **`__proto__`**: A property on every object pointing to the prototype it inherits from.

---

## 22. call, apply, bind

- **`call`**: Invokes a function immediately with a given `this` value and individual arguments.
  ```javascript
  printInfo.call(user1, "Ajmer", "Rajasthan");
  ```
- **`apply`**: Invokes a function immediately with a given `this` value and arguments as an array.
  ```javascript
  printInfo.apply(user2, ["Jaipur", "Rajasthan"]);
  ```
- **`bind`**: Returns a new function with the `this` value and initial arguments bound.
  ```javascript
  let boundFunc = printInfo.bind(user1, "Ajmer", "Rajasthan");
  boundFunc();
  ```

---

## 23. new keyword

When the `new` keyword is used, JavaScript:

1. Creates a new empty object: `const obj = {};`
2. Links the object's `__proto__` to the constructor's `prototype`: `obj.__proto__ = Constructor.prototype;`
3. Binds `this` to the new object and executes the constructor.
4. Returns the object (unless the constructor returns its own object).

---

## 24. new keyword with bind method

The `new` keyword has higher precedence and overrides the hard-binding created by `.bind()`.

```javascript
function Person(name) {
  this.name = name;
}

const BoundPerson = Person.bind({ x: 1 });
const p1 = new BoundPerson("Rahul");

console.log(p1.name); // Output: "Rahul"
console.log(p1.x); // Output: undefined
```

---

# Practical Tasks

## 1. Using Built-in `bind`

```javascript
const person1 = {
  name: "Rahul",
};

function sayHi1(age) {
  console.log("Hello from " + this.name + ". My age is " + age);
}

// Binds sayHi1 to person1 and invokes it with age 26
sayHi1.bind(person1)(26);
// Output: Hello from Rahul. My age is 26
```

---

## 2. Implementation of `bind` Polyfill

```javascript
Function.prototype.myBind = function (context, ...args) {
  const fn = this; // The original function
  return function (...args2) {
    // args: initial arguments passed during bind
    // args2: arguments passed when the bound function is called
    fn.apply(context, [...args, ...args2]);
  };
};
```

### Example: Using `myBind`

```javascript
const person2 = {
  name: "Aman",
};

function sayHi2(age) {
  console.log("Hello from " + this.name + ". My age is " + age);
}

// Using our custom polyfill
sayHi2.myBind(person2)(23);
// Output: Hello from Aman. My age is 23
```
