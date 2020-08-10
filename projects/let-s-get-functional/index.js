// #!/usr/bin/env node

'use strict';

var customers = require('./data/customers.json');
var _ = require('lodown-huntercolew');

/**
 * 1. Import your lodown module using the require() method,
 *    using the string 'lodown-<my-username>', or whatever
 *    name with which you published your npm lodown project.
 *
 * 2. Solve all problems as outlined in the README.
 *
 * 3. We started the first one for you as an example! Make the rest in that style.
 *
 * 4. To test your work, run the following command in your terminal:
 *
 *    npm start --prefix ./huntercolew.github.io/projects/let-s-get-functional
 *
 *    IMPORTANT: Make sure you replace <YOUR_GITHUB_FOLDER with your actual github folder name that is in your workspace.
 */

var maleCount = function(array) {
    return _.filter(array, function(person){ // filter call to test 
        return person.gender === 'male'; // tests for 'male' gender
    }).length; // array return, array length for 'male' count
};

var femaleCount = function(array) {
    return _.reduce(array, function(previousResult, person){ // reduce call to pass test 
        if(person.gender === 'female'){ // tests for 'female' gender
            return previousResult + 1; // increments persisting storage parameter
            
        }
        return previousResult; // else, result unchanged
    }, 0); // 0 seed
};

var oldestCustomer = function(array) {
    var oldestResult = array[0]; // 'max' holder by setting to first element
    _.each(array, function(person){ // each call to loop test
        if(person.age > oldestResult.age){ // if current element > stored element
            oldestResult = person; // store current element
        }
    });
    return oldestResult.name; // return highest element
};

var youngestCustomer = function(array) {
    var youngestResult = array[0]; // 'min' holder by setting to first element
    _.each(array, function(person){ // each call to loop test
        if(person.age < youngestResult.age){ // if current element < stored element
            youngestResult = person; // store current element
        }
    });
    return youngestResult.name; // return lowest element
};

var averageBalance = function(array) {
    var totalBal = 0; // holds total balance
    _.each(array, function(person){ // each call to collect balance
        totalBal += Number(person["balance"].replace(/[^0-9\.-]+/g,"")); // converts currency to float/int
    });
    return totalBal / array.length; // return total balance / number of people
};

var firstLetterCount = function(array, letter){
    var totalLetter = 0; // holds number of names beginning with letter
    _.each(array, function(person){ // each call to loop test
        if(person["name"][0].toLowerCase() === letter.toLowerCase()){ // compare current name to given
            totalLetter++; // increment total letter count
        }
    });
    return totalLetter; // return total letter count
};

var friendFirstLetterCount = function(array, customer, letter){
    var totalLetter = 0; // hold number of friends beginning with letter
    for(var i in array){ // local loop
        if(array[i]["name"] === customer){ // if current name deeply equals given...
            for(var j in array[i]["friends"]){ // ...loop through friends array...
                if(array[i]["friends"][j]["name"][0].toLowerCase() === letter.toLowerCase()){
                    totalLetter++; // ...increment if name of a friend begins with given letter
                }
            }
        }
    }
    return totalLetter; // return total letter (friend) count
};

var friendsCount = function(array, name){
    var result = []; // holds name of friends
    for(var i in array){ // local loop
            for(var j in array[i]["friends"]){ // loops through current persons friends
                if(array[i]["friends"][j]["name"] === name){ // if current person is friends with given
                    result.push(array[i]["name"]); // push current person to friends
                }
            }
    }
    return result; // return array of friends
};

var topThreeTags = function(array){
    var counts = {}; // array to hold all tags from every person
    for(var i in array){ // loops through each person
        for(var j in array[i]["tags"]){ // loops through each persons 'tags'
            counts[array[i]["tags"][j]] = counts[array[i]["tags"][j]] ? counts[array[i]["tags"][j]] + 1 : 1;
        } // each loop adds tag to object or increments its value if it exists
    }
    var countsSorted = Object.keys(counts).sort(function(a, b){return counts[b]-counts[a]}); // sorts into a different array
    return [countsSorted[0], countsSorted[1], countsSorted[2]]; // returns first three results
};

var genderCount = function(array){
    var genArray = []; // array to hold all genders from every person
    for(var i in array){ // adds each gender to array unordered
            genArray.push(array[i]["gender"]);
    }
    var counts = {}; // object to hold gender : count pair
    for (var k in genArray) {
        counts[genArray[k]] = counts[genArray[k]] ? counts[genArray[k]] + 1 : 1;
    }
    return counts;
};

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// here, export any references you need for tests //
module.exports.maleCount = maleCount;
module.exports.femaleCount = femaleCount;
module.exports.oldestCustomer = oldestCustomer;
module.exports.youngestCustomer = youngestCustomer;
module.exports.averageBalance = averageBalance;
module.exports.firstLetterCount = firstLetterCount;
module.exports.friendFirstLetterCount = friendFirstLetterCount;
module.exports.friendsCount = friendsCount;
module.exports.topThreeTags = topThreeTags;
module.exports.genderCount = genderCount;
