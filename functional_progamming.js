function pureFunction(a1, a2, a3, a4, a5, a6) {
    let sum = 0;

    for(arg of arguments) {
        sum = sum + arg;
    }

    return sum * 10;
}

function applyPartial(action, n) {
    return (...arguments) => {
        let fixArguments = [];

        for(let i = 0; i < n; i++) {
            fixArguments.push(1);
        }
        
        return action.apply(this, [...fixArguments, ...arguments]);
    }
}

function curry(action) {
    let arity = action.length;

    return function returnFunction(...args) {
        if(args.length >= arity) {
            return action.apply(this, args);
        }
        else {
            return (...moreArgs) => {
                let newArgs = [...args, ...moreArgs];
                return returnFunction(...newArgs);
            }
        }
    }
}

function map(array, callback) {
    let newArray = [];

    for(key of array) {
        newArray.push(callback(key));
    }
    
    return newArray;
}

function filter(array, callback) {
    let newArray = [];

    for(key of array) {
        if(callback(key)) {
            newArray.push(key);
        }
    }
    
    return newArray;
}

function average(array) {
    let averageValue = 0;

    for(key of array) {
        averageValue = averageValue + key;
    }

    return averageValue / array.length;
}

function folding(array, callback, initialValue) {
    let lastValue = 0;

    if(initialValue) {
        lastValue = initialValue;
    }

    for(key of array) {
        lastValue = callback(lastValue, key);
    }

    return lastValue;
}

function averageOfEven(array) {
    return (action1) => {
        let evenArray = action1(array, a => a % 2 == 0);

        return (action2) => {
           let result = action2(evenArray, (a, b) => a + b);

           return result / evenArray.length;
        }
    }
}

function createMemoizedFunction(action) {
    return (memoize) => {
        let memoizedAction = memoize(action);

        return (parameters) => {
            return memoizedAction(parameters);
        }    
    }
}

function memoize(action) {
    let cacheValues = new Map();

    return (...argms) => {
        let parameters = [];
        parameters = argms[0];

        if(cacheValues.has(parameters.toString())) {
           console.log("From cache");

           return cacheValues.get(parameters.toString());
        }
        else {
           console.log("Calculating");
           let result = action(parameters);
           cacheValues.set(parameters.toString(), result);
           
           return result;
        }
    }
}

function multiplicationOfParameters(action) {
    return (...argms) => {
        let mult = 1;
        
        for(let i = 0; i < argms.length; i++) {
            mult = mult * argms[i];
        }

        return mult;
    }
}

function forLazy(arrayPar, n) {
    let newArray = []; 
    
    for(key of arrayPar) {
        if(key > n) { 
        newArray.push(key);
        }
    } 
    
    return newArray; 
} 
    
let lazyFunction = function(array, n, action) { 
    let arrayPar = [];

    for(let i = 0; i < arguments.length - 1; i++) {
        arrayPar.push(arguments[i]);
    }

    return action.apply(this, arrayPar); 
} 

class Shape {
    constructor(name) {
        this.name = name;
    }

    calculateArea() {
    }
}

class Rectangle extends Shape {
    constructor(height, width) {
        super("Rectangle");
        this.height = height;
        this.width = width;
    }
    
    calculateArea() {
        return this.height * this.width;
    }
}

class Square extends Shape {
    constructor(sideLength) {
        super("Square");
        this.sideLength = sideLength;
    }

    calculateArea() {
        return this.sideLength * this.sideLength;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super("Circle");
        this.radius = radius;
    }

    calculateArea() {
        return 3.14 * this.radius * this.radius;
    }
}

class ShapesStore extends Shape {
    constructor(shapesArray) {
        super();
        this.shapesArray = shapesArray;
    }

    calculateArea() {
        let areaValue = 0;

        for(let i = 0; i < this.shapesArray.length; i++) {
            areaValue = areaValue + this.shapesArray[i].calculateArea();
        }

        return areaValue;
    }
}

let partial1 = applyPartial(pureFunction, 2);
console.log(partial1(3, 3, 2, 6));
let partial2 = applyPartial(pureFunction, 4);
console.log(partial2(15, 4));
let result = curry(pureFunction);
console.log(result(2)(3)(5)(3)(5)(2));
console.log(map([1,2,3], (a) => a - 1));
console.log(filter([11,2,30], (a) => a > 2));
console.log(averageOfEven([1,2,3,4,5])(filter)(folding));
let mult = multiplicationOfParameters(pureFunction);
console.log(mult(10, 2, 30, 1, 4, 8));
console.log(folding([1,2,3,4], (a, b) => a + b));
console.log(lazyFunction([1,2,3,4,5], 3, forLazy));
let rectangle1 = new Rectangle(5, 10);
let rectangle2 = new Rectangle(15, 2);
console.log("Area: " + rectangle1.calculateArea() + "\nWidth: " + rectangle1.width + "\nHeight: " + rectangle1.height);
let square1 = new Square(10);
let square2 = new Square(20);
let circle = new Circle(17);
console.log("Area: " + square1.calculateArea() + "\nSide length: " + square1.sideLength);
console.log("Area: " + circle.calculateArea() + "\nRadius: " + circle.radius);
let store = new ShapesStore([rectangle1, square1, square2, rectangle2, circle]);
console.log("Total area of shapes: " + store.calculateArea());