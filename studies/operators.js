/*
OPERATORS:

0. Tools used to manipulate variables

 */
 
// 1. Assignment Operators //
var x = 12; //assigns x value of 12
x += 2; // Addition - adds 2 to value of x and assigns to x 
x -= 2; // Subtraction - subtracts 2
x *= 2; // Multiplication - multiplies by 2
x /= 2; // Division - divides by 2
x %= 2; // Modulus - assigns remainder of dividing by 2
x **= 2; // Exponentiation - assigns x value of x to the second power

// 2. Arithmetic Operators //
var y = 5;
y = x + 2; // Addition - adds 2 to value of x and assigns to y 
y = x - 2; // Subtraction - subtracts 2
y = x * 2; // Multiplication - multiplies by 2
y = x / 2; // Division - divides by 2
y = x % 2; // Modulus - assigns remainder of dividing by 2
y = x ** 2; // Exponentiation - assigns y value of x to the second power

// 3. Comparison Operators //
var value = "21";
var trueValue = 21;
if(value === trueValue) console.log("Equal value and equal data type.");
if(value == trueValue) console.log("Equal value.");
if(value !== trueValue) console.log("Not equal value and not equal data type.");
if(value != trueValue) console.log("Not equal value.");
if(value > trueValue) console.log("Greater than.");
if(value < trueValue) console.log("Less than.");
if(value >= trueValue) console.log("Greater than or equal to.");
if(value <= trueValue) console.log("Less than or equal to.");

// 4. Logical Operators //
var cranberry = true;
var apple = false;
// logical operators use two operands to compare two values and return a true or false
if(cranberry && apple){ //both must be true
    console.log("You have Cran-Apple! Both are true.");
} 
if(cranberry || apple){ //either must be true
    console.log("You have juice! Any type--be happy. At least one is true.");
} 
if(cranberry != apple){ //one must not equal the other
    console.log("You have juice, either apple or cranberry. One is true, one is false.");
}

// 5. Unary Operators //
var z = 10;
var doll = "plush";
var typeValue;
var hair = {
    curly: true,
    color: "brown",
    taste: "bad"
};
var numbers = [1, 2, 3, 4, 5]; //different variable types to show example

z = z + "2"; // adds string with value '2' to x
z = z - "2"; // subtracts string with value '2' from x
z++;; //increments x by 1
z--;; //decrements x by 1
z = ~z; // bitwise not, assigns x value of -(x-1). In this case, -101
typeValue = typeof doll; //assigns 'typeValue' the data type of 'doll'
delete hair[3]; //deletes a specific object or array index
delete numbers[4]; //only works with objects and specific array indexes
z = void z; //makes value into nothing or undefined

// 6. Ternary Operators //
function lunchCost(isTourist){
    return(isTourist ? "$20" : "$10"); //switches between two values, first if true, second if false.
}
console.log("Your bill is " + lunchCost(true) + ".");
