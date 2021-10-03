class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let currentVampire = this;
    let numberOfVampires = 0;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  // closestCommonAncestor(vampire) {
  //   let firstVampire = this;
  //   let secondVampire = vampire;
  //   // loop through the first vampire's creator names
  //   while (firstVampire.name !== secondVampire.name) {
  //     if (firstVampire.creator === null) {
  //       return firstVampire;
  //     }
  //     // loop through ther second vampire's creator names
  //     while (firstVampire.name !== secondVampire.name) {
  //       if (secondVampire.creator === null) {
  //         secondVampire = vampire;
  //         break;
  //       }
  //       secondVampire = secondVampire.creator;
  //       if (firstVampire.name === secondVampire.name) {
  //         return firstVampire;
  //       }
  //     }
  //     firstVampire = firstVampire.creator;
  //   }
  //   // if they match, return the name of the common ancestor
  //   return firstVampire;
  // }

  closestCommonAncestor(vampire) {
    // base cases
    if (this.name === vampire.name) {
      return this;
    };
    if(this.creator === null) {
      return this;
    }
    if(vampire.creator === null) {
      return vampire;
    }
    if(this.creator === vampire.creator) {
      return this.creator;
    }

    // if this is Ansel, vampire is Andrew, for us to meet these bases
    // cases, we need the name to be equal. or we need their creators
    // to be equal
    if (this.numberOfOffspring > vampire.numberOfOffspring) {
      return this.closestCommonAncestor(vampire.creator)
    }
    return vampire.closestCommonAncestor(this.creator)
  }
  //first find cases where it would be successful right away (base case)
  // by changing the variables, work towards getting to the base case
  // grokking algorithms
  // call stack

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    // base case
    if (this.name === name) {
      return this;
    }
    // recursive case
    for (const child of this.offspring) {
      let result = child.vampireWithName(name);
      if (result === null) {
        // if false, we didnt find a match, go to the next tree
      } else {
        // if true, we found a match
        return result;
      }
    }
    // null if no vampire exist with the name
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalVampire = 0;
    for (const vampire of this.offspring) {
      totalVampire++;
      totalVampire += vampire.totalDescendents;
    }
    return totalVampire;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    // store the result in this array
    let result = [];
    // add to the array if converted after 1980
    if (this.yearConverted > 1980) {
      result.push(this);
    }
    // Use depth first traversal to add to the results array
    for (const vampire of this.offspring) {
      const vampiresConvertedAfter = vampire.allMillennialVampires;
      result = result.concat(vampiresConvertedAfter);
    }
    return result;
  }

}

// creating all the vampires
const original = new Vampire("Original", 1970);

const ansel = new Vampire("Ansel", 1975);
const bart = new Vampire("Bart", 1975);
const geo = new Vampire("Geo", 1975);

const elgort = new Vampire("Elgort", 2000);
const sarah = new Vampire("Sarah", 2001);

const andrew = new Vampire("Andrew", 2005);

original.addOffspring(ansel);
original.addOffspring(bart);
original.addOffspring(geo);

ansel.addOffspring(elgort);
ansel.addOffspring(sarah);

elgort.addOffspring(andrew);

console.log(andrew.closestCommonAncestor(sarah));
// console.log(original.vampireWithName("Bart"));
// console.log(ansel.totalDescendents);
// console.log(original.allMillennialVampires);

module.exports = Vampire;

