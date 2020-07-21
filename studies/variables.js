/*
 * VARIABLES:
 *
 * 0. To hold things in memory during the life-cycle of a program, we can use variables.  Variables
 * are named identifiers that can point to values of a particular type, like a Number, String,
 * Boolean, Array, Object or another data-type.  Variables are called so because once created, we
 * can CHANGE the value (and type of value) to which they point.
 *
 * 1. To create a variable we use the keyword, var, followed by a name (id or alias) for our
 * variable.
 *
 * 2. There are 2 phases of using variables: declaration and initialization (or assignment).
 */

// 1. Declaration //
var myName;

/*
 * At the declaration phase, the variable myName is undefined because we have NOT initialized
 * it to anything
 */
console.log(myName); // prints => undefined

// 2. Initialization or Assignment //
myName = 'john';
console.log(myName); // prints => john

// 3. Re-assignment //
myName = 'bob';
console.log(myName); // prints => bob

// NOTE: We can assign and re-assign anything to a variable - we cannot do this with constants //
var myVariable = 1;
var myVariable = true;
myVariable = "someString";

// 4. Declaration Types //
var second;
let minute = 15;
const hour = 12;
/*
 * Declaring a variable using 'var' will initialize the variable as undefined, whereas using 'let'
 * or 'const' will not initialize the variable, so they must be initialized
 *
 * 'var' - is declared in global scope outside of a function and can be both updated and re-declared.
 *
 * 'let' - is declared in block scope, meaning it can only be used within its function. it can be
 * updated but not re-declared like 'var'.
 *
 * 'const' - is also declared in block scope, meaning it can only be used within its function. it can
 * not be updated or re-declared.
 */
 
// 5. Hoisting //
/*
 * All variable types may be hoisted to the top of their 'scope' or the function that they pertain to.
 * This means that the variable can be declared after it is initialized or used or both.
 */