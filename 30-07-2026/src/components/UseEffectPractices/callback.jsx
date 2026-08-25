// ye callback function hai
function displayGreeting(message) {
  console.log(message);
}

// The outer function accepting the callback
function processUser(name, callback) {
  const finalMessage = `Hello, ${name}!`;
  callback(finalMessage); // Executing the callback here
}

// Passing 'displayGreeting' as an argument-----------,.--
processUser("Ali", displayGreeting); 