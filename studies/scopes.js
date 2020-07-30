/*
SCOPES:

0. Scope is a variable or functions accessibility within its area of influence.
   This is a factor that decides whether a variable can be modified by certain
   areas of influence and whether those variables can be used elsewhere.
   
1. Local scope is a function or variable that can only be used or modified within
   its own scope. Global scope is a function or variable that can be used from
   anywhere in the code by anything.
   
 */
 
// 1. Global Scopes //
var favTeam = "LSU";
function represent(teamName){
    if (teamName == favTeam){ // global variable is being referenced in function condition
        console.log("Geaux Tigers!");
    }else{
        console.log("I don't remember your team winning the Nat last year...");
    }
}
represent("Alabama"); // roll tide who?

// 2. Local Scopes //
function doSomething(number1, number2){ // local function scope
    var total = number1 + number2;
    console.log(total);
}
doSomething(5,6);
console.log(total); // 'total' can not be accessed, will throw an error

// 3. Variables //
var age = 19; // declared in global scope, can be used anywhere by anything
let color = 'blue'; // declared in block scope
const height = "6'10"; // declared in block scope

// 4. Access //
/*
   There is a variable in the global scope and a parameter with the same name, 
   if you are within the function body which would you access? If you were in 
   the global scope which would you access? Why?

   0. If you were in the function body you would access the parameter before
      the global scoped variable since the parameter is block scoped
      
   1. If you were in global scope you would access global scoped only because
      the parameter is block scoped and may not be used outside of its function
 */
