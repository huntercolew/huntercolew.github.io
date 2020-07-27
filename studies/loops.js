/*
LOOPS:

0. Blocks of code that are run repeatedly given that the test condition is
   passed between each iteration
   
1. Must remember to manipulate the loop into exiting once the desired task
   is completed. Else, the loop will continue infinitely.
   
 */
 
// 1. Types of Loops //

    // a. While Loop //
var x = 0; // variable used to control or 'time' the loop for exit condition
while (x < 10){ // continues to loop while x is less than 10
    console.log(x); // prints value of x to console for every iteration
    x++; // increments x by one every iteration
} // this loop will iterate 10 times since it starts at 0 and ends when it becomes 10
  // the test condition can count up to any number, 10 being an example

    // b. For Loop //
for (var i = 9; i >= 0; i--){ // declaration and increment included in condition
    console.log(i); // performs same as 'while' loop above but counts down
} // this loop is a lot more space friendly than while loop

    // c. For-In Loop //
var louisiana = { // object declared to iterate through using for-in loop
    homeState: true,
    hasSwamp: true,
    stateBird: "Pelican"
};
for (var key in louisiana){ // 'var key' is interchangable with 'let/const' and any name for key
    console.log("For key '" + key + "', we have a value of '" + louisiana[key] + "'.");
} // keys are referenced using the keyword used in the condition
  // object key values referenced using dot or bracket notation
  
// 2. Using Loops //

    // a. Arrays //
var myArray = [1, 2, 3, 4, 5]; 
for (var z = 0; z < myArray.length-1; z++){ //arrays are 0-indexed so the first value is at 0
    console.log(myArray[z]); // prints value of array at 'z' index using bracket not.
} // iterates forward through the array
for (var y = myArray.length-1; y >= 0; y--){ //index is smaller than length so we must start lower
    console.log(myArray[y]); // prints value of array at 'y' index using bracket not.
} // iterates backwards through the array

    // b. Objects //
var burger = {
    'ingredients': ["bun", "patty", "lettuce", "tomato"],
    'juicy': true,
    'costUSD': 3
};
for (const property in burger){ // here we used 'const property' instead of 'var key' for example
    console.log("For key '" + property + "', we have a value of '" + burger[property] + "'.");
} // loop is almost the same as the one seen above, just prints the data held in the entire object
  // regardless of the length of the object, will go through every key and value pair
  // objects are unordered so normally there is no reason to iterate through in certain order
  // however you may iterate through the object, add each value to an array, and sort it that way