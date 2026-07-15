// How promises work in JavaScript

// A promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

const myPromise = new Promise((resolve, reject) => {
  // Simulating an asynchronous operation using setTimeout
  setTimeout(() => {
    const success = true; // Change this to false to simulate a failure
    if (success) {
      resolve('The operation was successful!');
    } else {
      reject('The operation failed.');
    }
  }, 2000); // Simulating a delay of 2 seconds
});

// Using the promise
myPromise
  .then((message) => {
    console.log(message); // This will run if the promise is resolved
  })
  .catch((error) => {
    console.error(error); // This will run if the promise is rejected
  });
