// dice.js

const crypto = require("crypto");

// Function to roll one dice
function rollDice() {
    return crypto.randomInt(1, 7);
}

// Roll the dice once
const result = rollDice();

console.log("Dice Rolled:", result);

// Simulate multiple dice rolls
console.log("\nMultiple Dice Rolls:");

for (let i = 1; i <= 5; i++) {
    console.log("Roll", i + ":", rollDice());
}