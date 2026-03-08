# Week 2: Practical Tasks

This document contains practical implementations of key JavaScript concepts including optimization techniques and advanced Promise handling.

---

## 1. Debouncing

Debouncing ensures that a function is not called multiple times within a short duration. It waits for a specific delay after the last event trigger before executing the function.

```javascript
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

let searchBar = document.getElementById("searchBar");
searchBar.addEventListener(
  "input",
  debounce((e) => {
    console.log(e.target.value);
  }, 200),
);
```

---

## 2. Throttling

Throttling limits the number of times a function can be called over a certain period. It ensures the function executes at most once every specified duration.

```javascript
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

window.addEventListener(
  "scroll",
  throttle(() => {
    console.log("Scrolling!");
  }, 5000),
);
```

---

## 3. Promise Chaining

Implementation of a sequential order processing flow using Promise chaining.

```javascript
function createOrder(cart) {
  return new Promise((resolve, reject) => {
    if (cart.length === 0) {
      reject("Cart is empty!");
    } else {
      resolve("Order created successfully!");
    }
  });
}

function proceedToPayment(orderId) {
  return new Promise((resolve, reject) => {
    if (orderId) {
      resolve("Proceed to payment!");
    } else {
      reject("Failed to proceed to payment!");
    }
  });
}

function showOrderSummary(orderId) {
  return new Promise((resolve, reject) => {
    if (orderId) {
      resolve("Show order summary!");
    } else {
      reject("Failed to show order summary!");
    }
  });
}

function processPayment(orderId) {
  return new Promise((resolve, reject) => {
    if (orderId) {
      resolve("Payment Successful!");
    } else {
      reject("Payment Failed!");
    }
  });
}

createOrder(["Apple", "Banana", "Orange"])
  .then((orderId) => {
    console.log(orderId);
    return proceedToPayment(orderId);
  })
  .then((paymentInfo) => {
    console.log(paymentInfo);
    return showOrderSummary(paymentInfo);
  })
  .then((summary) => {
    console.log(summary);
    return processPayment(summary);
  })
  .then((paymentStatus) => {
    console.log(paymentStatus);
  })
  .catch((err) => {
    console.log(err);
  });
```

---

## 4. Promise APIs

Examples of using various static Promise methods to handle multiple asynchronous operations.

```javascript
const promise1 = new Promise((resolve, reject) => {
  fetch("https://dummyjson.com/ip")
    .then(async (res) => {
      const data = await res.json();
      resolve({
        promise1Data: data,
      });
    })
    .catch((err) => {
      reject({
        promise1Error: err.message,
      });
    });
});

const promise2 = new Promise((resolve, reject) => {
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then(async (res) => {
      const data = await res.json();
      resolve({
        promise2Data: data,
      });
    })
    .catch((err) => {
      reject({
        promise2Error: err.message,
      });
    });
});

const promise3 = new Promise((resolve, reject) => {
  fetch("https://dummy-json.mock.beeceptor.com/todos/1")
    .then(async (res) => {
      const data = await res.json();
      resolve({
        promise3Data: data,
      });
    })
    .catch((err) => {
      reject({
        promise3Error: err.message,
      });
    });
});

// Promise.all
Promise.all([promise1, promise2, promise3])
  .then(([res1, res2, res3]) => {
    console.log("Promise.all then");
    console.log(res1);
    console.log(res2);
    console.log(res3);
  })
  .catch((err) => {
    console.log("Promise.all catch");
    console.log(err);
  });

// Promise.allSettled
Promise.allSettled([promise1, promise2, promise3])
  .then(([res1, res2, res3]) => {
    console.log("Promise.allSettled then");
    console.log(res1);
    console.log(res2);
    console.log(res3);
  })
  .catch((err) => {
    console.log("Promise.allSettled catch");
    console.log(err);
  });

// Promise.race
Promise.race([promise1, promise2, promise3])
  .then((res) => {
    console.log("Promise.race then");
    console.log(res);
  })
  .catch((err) => {
    console.log("Promise.race catch");
    console.log(err);
  });

// Promise.any
Promise.any([promise1, promise2, promise3])
  .then((res) => {
    console.log("Promise.any then");
    console.log(res);
  })
  .catch((err) => {
    console.log("Promise.any catch");
    console.log(err);
    console.log(err.errors);
  });
```
