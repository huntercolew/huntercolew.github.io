/*
HOISTING:

0. Hoisting is a feature of javascript that allows a variable to be used
   before it is declared.
   
1. JS initializations are not hoisted, so a hoisted variable would return
   undefined
   
2. Hoisting is unknown to many developers so it is good practice to keep variables
   on top so as to keep confusion and bugs less common
   
3. This feature functions because of the way that JS interpreter works. JS interpreter
   is part of the compilation of JS code that reads code and loads up the variables
   needed to be hoisted before the program runs.

   
 */
 
 // 0. Hoisting //
 console.log(hoistedVar); // logs 'undefined', initialization not hoisted
 hoistedVar = "successful";
 console.log(hoistedVar); // logs 'successful'
 var hoistedVar = 'not yet';
 console.log(hoistedVar); // logs 'not yet'
 
// 1. Variable differences //
 
// Let and const keyword variables are not hoisted like var,
// however, functions are also hoisted to the top of its scope.

// 2. Functions //
printName("hunter", "williams"); // prints 'hunter williams'
printNameUpper("hunter", "williams"); // throws error because 'var' definitions are not hoisted
function printName(first, last){ // function is hoisted entirely
    console.log(first + ' ' + last);
} // function declaration AND definition are hoisted.

var printNameUpper = function(first, last){
    console.log(first.toUpperCase() + ' ' + last.toUpperCase());
};