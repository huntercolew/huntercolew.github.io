/*
STRING MANIPULATION: 
 */

// 1. With operators //
var tuna = "Chicken";
tuna = tuna + " of the Sea";
tuna += ", it's Sealicious";

// 2. With String Methods //

//ALL STRING METHODS RETURN A NEW STRING

var length = tuna.length; //assigns length of string 'tuna' to 'length'
var firstPos = tuna.indexOf("Sea"); //finds first usage of 'Sea'. second parameter is start of search
var lastPos = tuna.lastIndexOf("Sea"); //finds last usage. both return -1 if not found
var matchPos = tuna.search("of"); //finds a match, but can not have start value
var brandName = tuna.slice(18); //assigns 'brandName' to the first 18 characters of the string 'tuna'
var brandName2 = tuna.substring(0,18); //same as slice but can not take negative index as param
var brandName3 = tuna.substr(0,18); //first param starting point, second param length
var tunaRevised = tuna.replace("Sealicious", "Delicious"); //replaces given word for second param
var tunaRevised2 = tuna.replace(/SEALICIOUS/i, "Delicious"); //regular expression case insensitivity
// replace() only replaces the first match, not all matches. can use /g regular to replace all
var tunaLoud = tuna.toUpperCase(); // uppercases all letters of tuna and assigns
var tunaQuiet = tuna.toLowerCase(); // same as before but lower case
var tunaSlogan = tunaLoud.concat(". ", "Ages 13 and up!         "); //joins two or more strings
var tunaMk2 = tunaSlogan.trim(); //trims empty spaces from both sides of a string
var getLetter = tuna.charAt(0); //finds character at given index
var getLetter2 = tuna.charCodeAt(0); //finds character at given index and gives unicode for that character
var getLetter3 = tuna[0]; //property access on a string also works to find a character
var tunaArray = tuna.split(" "); //splits 'tuna' string into an array
console.log(tunaMk2);