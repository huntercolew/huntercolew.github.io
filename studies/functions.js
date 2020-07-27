/*
FUNCTIONS:

0. Encapsulated code that acts as a 'black box' where data is optionally passed 
   in as arguments and a block of code is executed.
   
*/

// 1. Function Usage //
function printName(name) { //declaring a function with this syntax - function "funcName"(param1, etc.) {}
    console.log(name); // encapsulated code runs when we 'call' or 'invoke' our function
}
printName("mark"); // this calls the function with argument 'mark' to be passed as 'name' param

// 2. Paramaters and Arguments //
function returnUpper(parameter) { // parameters of a function are placeholder variables used in the function
    return parameter.toUpperCase();
    // may have inputs, may have outputs called parameters and returns respectively.
}
var bigLetters = returnUpper("argument"); // arguments used during function call to pass real data to function

// 3. Named Function //
function namedFunction(param1, param2){ // function functionNameHere(may include params here or not use any){}
    return param1 + param2; // code ran using parameters
}

// 4. Function Assigned to Variable //
var funcPackage = function(id, name){console.log('ID: ${id} Name: ${name}')};
// assigning a function to variable performs similarly to a normal named function but is a variable, can be reassigned
var identityCard = funcPackage(101, "Hunter");

// 5. Scope //
var touchable = 5;
function scopeTest(){
    var untouchable = 10;
    touchable = 10; // this will reassign 'touchable' because it is in global scope
}
// untouchable = 12 -- this line will throw an error because the variable was not defined in global scope
console.log(touchable); //should print 10
//console.log(untouchable); can't even log untouchable

// 6. Closures //
// a closed function is one which has access to parent scope after parent function has closed
// achieved with a returning a self-invoking function
function outsideFunction() {
    var outsideVariable = 100;
    function insideFunction() {
        console.log(outsideVariable);
    }
    return insideFunction;
}
var innerFunc = outsideFunction();

innerFunc(); // 100