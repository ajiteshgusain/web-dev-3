// app.js

// Import custom modules
const isEven = require("./modules/isEven");
const logger = require("./modules/logger");

// Use the logger module
logger("Smart Utility Toolkit started");

// Test the isEven module
console.log("Is 10 even?", isEven(10));
console.log("Is 7 even?", isEven(7));

// Use the same module with another value
console.log("Is 24 even?", isEven(24));

logger("Custom modules executed successfully");