/*
CONTROL FLOW:

0. Statements test a condition, if the condition is true then a block of code is ran

1. Conditional statements will not loop, but will terminate after one iteration.
   They won't run the block of code if the condition(s) are not met.
*/

// 1. If Statement //
var grade = 89;
if(grade >= 90){ // condition block--tests a condition for false or true
    console.log("Great, you got an A!"); //code between the curly braces will run
}

// 2. Else //
if(grade >= 90){
    console.log("Great, you got an A!");
}else{ // 'else' code runs in the case that the if condition was false
    console.log("Better luck next time.")
}

// 3. Else-if Statement //
if(grade >= 90){
    console.log("Great, you got an A!");
}else{ 
if(grade >= 61){ //any number of extra 'if' statements can test for more conditions
    console.log("At least you passed.");
}else{
    console.log("Better luck next time.");
}
}

// 4. Switch Statement //
var color = "blue"
var result;
switch(color){ // variable tested for is 'color'. good for when an if-else chain would be too long
    case "blue": // in the case of 'blue', run this code
        result = "great";
        break; // breaks seperate each case from another
    case "pink": // in the case of 'pink', run this code
        result = "bad";
        break;
    default: result = "risky"; // default to catch a case not accounted for
} // no break needed for default
console.log("Painting you car " + color + " is a " + result + " choice for reselling.")