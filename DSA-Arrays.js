
const mem = require('./memory')
const memory = new mem()

class Array {
    constructor() {
        this.length = 0
        this.ptr = memory.allocate(this.length)
    }

    push(value) {
        this._resize(this.length + 1)
        memory.set(this.ptr + this.length, value)
        this.length++
    }

    _resize(size) {
        const oldPtr = this.ptr
        this.ptr = memory.allocate(size)
        if (this.ptr === null) {
            throw new Error('Out of memory')
        }
        memory.copy(this.ptr, oldPtr, this.length)
        memory.free(oldPtr)
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error')
        }
        return memory.get(this.ptr + index)
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error')
        }
        const value = memory.get(this.ptr + this.length - 1)
        this.length--
        return value
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error')
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO)
        }

        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index)
        memory.set(this.ptr + index, value)
        this.length++
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error')
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1)
        this.length--
    }
}

Array.SIZE_RATIO = 3

function main() {

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    arr.push(3);
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);

    arr.pop();
    arr.pop();
    arr.pop();

    console.log(arr);
    console.log(arr.get(0))
    console.log(arr.remove(0))
    console.log(arr.remove(0))
    console.log(arr.remove(0))
    console.log(arr)
    console.log(arr.push("tauhida"))
    console.log(arr.get(0))
    console.log(arr)
}

main()

/* -----------------------------------------------------------------------
#2 Explore the push() method

    length: 3
    capacity: 15
    memory address: 0, 1, 2

    length: 6
    capacity: 15
    memory address: 0, 1, 2, 3, 4, 5

#3 Explore the pop() method

    length: 3
    capacity: 15
    memory address: 0, 1, 2

#4 Understanding more about how arrays work
    
    3
    NaN. It was given a value that was not a number.
    Allocates a new chunk of memory then copies all the information to this new chunk of memory, then empties the chunk that was occupied before.

----------------------------------------------------------------------------
*/


//#5 URLify a string
function URLify(string) {
    let replaced = string.split(' ').join('%20')

    return replaced
}

console.log(URLify('www.thinkful.com /tauh ida parv een'))



//#6 Filtering an array
function filterArray(array) {
    let newArray = []

    for(let i = 0; i <= array.length; i++) {
        if(array[i] >= 5) {
            newArray.push( array[i])
        }
    }

    return newArray
}

console.log(filterArray([1, 3, 6, 7, 3, 5, 10]))



//#7 Max sum in the array
function maxSum(array) {
    let maxSum = 0
    let sum = 0
    for(let i = 0; i <= array.length; i++) {
        sum += array[i]
        if(sum > maxSum) {
            maxSum = sum
        }
    }

    return maxSum
}

console.log(maxSum([4, 6, -3, 5, -2, 1]))



//#8 Merge arrays
function mergeArray(array1, array2) {
    let newArray = []
    let i = 0
    let k = 0

    while(i < array1.length && k < array2.length) {
        if(array1[i] < array2[k]) {
            newArray.push(array1[i])
            i++
        } else {
            newArray.push(array2[k])
            k++
        }

    }

    while(i < array1.length) {
        newArray.push(array1[i])
        i++
    }

    while(k < array2.length) {
        newArray.push(array2[k])
        k++
    }

    return newArray
}


console.log(mergeArray([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]))



//#9 Remove characters
function removeCharacters(string, chars) {
    let output = ''
    for (let i = 0; i < string.length; i++) {
      let contained = true;
      for (let j = 0; j < chars.length; j++) {
        if (string[i] === chars[j]) {
          contained = false;
        }
      }
      if (contained) {
        output += string[i]
      }
    }
    return output;
  }

console.log(removeCharacters('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'))




//# Products
function products(array){
    let result=[]
    let product=1
    for(let i = 0; i < array.length; i++){

      for(let j = 0; j < array.length; j++){
        if(i !== j){
          product *= array[j]
        }
      }

      result.push(product);
    }
    return result;
  }
  
console.log(products([1,2,3,4]))
