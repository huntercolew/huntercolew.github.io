/**
 * Part 2
 *
 * In this file, we're going to create some
 * Functions to work with our data created in
 * data.js.
 *
 * See the README for detailed instructions,
 * and read every instruction carefully.
 */

//////////////////////////////////////////////////////////////////////
// Step 1 - Search ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function search(animalsArray, animalName){
    for(var i = 0; i < animalsArray.length - 1; i++){
        if(animalsArray[i]["name"] == animalName){
            return animalsArray[i];
        }
    }
    return null;
}
//////////////////////////////////////////////////////////////////////
// Step 2 - Replace //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function replace(animals, name, replacement){
    for(var i = 0; i < animals.length - 1; i++){
        if(animals[i]["name"] == name){
            animals[i] = replacement;
        }
    }
}
//////////////////////////////////////////////////////////////////////
// Step 3 - Remove ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function remove(animals, name){
    for(var i = 0; i < animals.length - 1; i++){
        if(animals[i]["name"] == name){
            animals = animals.splice(0, i - 1).concat(animals.splice(i, animals.length - i));
        }
    }
}
//////////////////////////////////////////////////////////////////////
// Step 4 - Add ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function add(animals, animal){
    if(animal["name"].length > 0 && animal["species"].length > 0){ // tests that animal object contains information
        for(var i = 0; i <= animals.length - 1; i++){ // iterates through animals to test for duplicate name
            if(animals[i]["name"] == animal["name"]){
                return undefined; // exits if a duplicate name found
            }
        }
        animals.push(animal); // if all conditions pass, this code is ran
    }
}


/**
 * You did it! You're all done with Matchy!
 */



//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
var search, replace, remove, add;
if((typeof process !== 'undefined') &&
   (typeof process.versions.node !== 'undefined')) {
    module.exports.search = search || null;
    module.exports.replace = replace || null;
    module.exports.remove = remove || null;
    module.exports.add = add || null;
}
