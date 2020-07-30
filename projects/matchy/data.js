/**
 * Part 1
 *
 * In this file, we're going to practice
 * creating and accessing data structues.
 *
 * See the README for detailed instructions,
 * and read every instruction carefully.
 */

//////////////////////////////////////////////////////////////////////
// Step 1 - Object Creation //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
var animal = {};
animal.species = "Leopard";
animal["name"] = "Spotty";
animal["noises"] = new Array();
//console.log(animal);

//////////////////////////////////////////////////////////////////////
// Step 2 - Array Creation ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
var noises = [];
noises[0] = "growl";
noises.push("snarl");
//console.log(noises);
noises.unshift("hiss");
//console.log(noises);
noises[noises.length] = "roar";
//console.log(noises);
//console.log(noises.length);
//console.log(noises[noises.length - 1]);
//console.log(noises);

//////////////////////////////////////////////////////////////////////
// Step 3 - Combining Step 1 and 2 ///////////////////////////////////
//////////////////////////////////////////////////////////////////////
animal["noises"] = noises;
noises[noises.length] = "snap";
//console.log(animal);

/* *******************************************************************
 * Step 4 - Review
 *
 * 1. What are the different ways you can access properties on objects?
 *
 * 2. What are the different ways of accessing elements on arrays?
 *
 * *******************************************************************
 */

/* *******************************************************************
 * Step 5 - Take a Break!
 *
 * It's super important to give your brain and yourself
 * a rest when you can! Grab a drink and have a think!
 * For like 10 minutes, then, BACK TO WORK! :)
 * *******************************************************************
 */

//////////////////////////////////////////////////////////////////////
// Step 6 - A Collection of Animals //////////////////////////////////
//////////////////////////////////////////////////////////////////////
var animals = [];
animals.push(animal);
//console.log(animals);
var duck = {
    species: 'duck', 
    name: 'Jerome', 
    noises: ['quack', 'honk', 'sneeze', 'woosh'] 
    
};
animals.push(duck);
//console.log(animals);
var snake = {
    species: 'snake',
    name: 'Gerald',
    noises: ['hiss', 'slither', 'rattle']
};
animals.push(snake);
//console.log(animals);
var dog = {
    species: 'dog',
    name: 'Barkus',
    noises: ['bark', 'growl', 'whine']
};
animals.push(dog);
//console.log(animals);

//////////////////////////////////////////////////////////////////////
// Step 7 - Making Friends ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
var friends = [];
function getRandom(array){  // returns random index of given 'array'
    return Math.floor(Math.random() * (array.length)); // finds random number between 0 - last index and rounds to nearest int
}
for (var i = 0; i < animals.length; i++){ //iterates through given length of arrays to push values to friends 
  friends.push(animals[getRandom(animals)]["name"]);
}
console.log(friends);
animals[2]["friends"] = friends;

console.log(animals[2]);


/**
 * Nice work! You're done Part 1. Pat yourself on the back and
 * move onto Part 2 in the file called "functions.js"
 */



//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
var animal, noises, animals, friends, getRandom;
if((typeof process !== 'undefined') &&
   (typeof process.versions.node !== 'undefined')) {
     module.exports.animal = animal || null;
     module.exports.noises = noises || null;
     module.exports.animals = animals || null;
     module.exports.friends = friends || null;
     module.exports.getRandom = getRandom || null;
}