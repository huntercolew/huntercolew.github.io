/*
DATA TYPES:

0. Types of values that hold information can be stored at a location specified
   by a variable.

1. JavaScript data types are dynamic, meaning that a variable could hold different 
   types of data. Data type of a variable or collection is therefore determined by
   the data initialized into them.

2. Most are initialized to undefined when declared without initialization

 */

// 1. Numbers //
var monies = 100; //variable 'monies' is declared and initialized with the value '100'
monies += 10 //can manipulate value of a declared variable containing a number
console.log(monies); //will print '110' to the console

// 2. Strings //
var company = "Blue Line"; //data type includes any characters or numbers; holds text
company += " Limited"; //strings may be concatonated with some other variables
console.log(company); //will print "Blue Line Limited" to the console

// 3. Boolean //
var test; //like an on/off switch, will be initialized to false. used to test conditions
test = true; //updated to return true
console.log(test); //prints 'true' to the console

// 4. Array //
var lunchBox = ["apple", "sandwhich"] //container holding different data types
lunchBox.push("water"); //contents may be manipulated
console.log(lunchBox[0]); //arrays are 0-indexed, meaning they have an order

// 5. Object //
var tunaObject = { //objects initialize between curly braces like a function
   canColor: "blue",
   expiration: 2025
}
/*
Objects are containers holding unordered key and value pairs
 */
tunaObject.canSize = "large"; // new key and value pair being added
console.log(tunaObject); //prints object keys to console

// 6. Function //
function cubeVolume(width){ //calling 'cubeVolume' with a cube's width as argument
   return Math.pow(width, 3); //code block returns width to the power of 3
}
console.log(cubeVolume(3)); //calls function with parameter of number 3

// 7. undefined //
var test; //declared variables are initialized to 'undefined'
console.log(test); //prints 'undefined' to console

// 8. null //
var newObject = {}; //declared objects initialized to 'null'
console.log(newObject === null) //returns true. can be used conditionally

// 9. NaN //
var apple = 1; //'apple' is initialized as a number value
if(isNaN(apple)){ //test for 'is (apple) Not a Number?'
   console.log(NaN); //if true, print NaN--Not a Number
} else {
   console.log(apple); //if false, print value
}

// 10. Infinity and -Infinity //
// numerical values representing numbers large beyond reasonable comprehension
var bigNumber = Math.pow(100, 1000);
if(bigNumber === Infinity){
   console.log("Thats a really big number you got")
}else console.log("That number isn't too big");

// 11. Primitive/Simple and Complex Data //
/*
a. Primitive/Simple - immutable/unchangable values, includes all datatypes excluding
   objects
b. Complex Data - objects, which are changable and therefore can be referenced
 */

// 12. Primitive/Complex Pass to Function
/*
a. Primitive/Simple - must be copied from parameter into an argument when using
   in a function
b. Complex Data - can be referenced directly within a function
 */