//******** TASK 1 Partial Application ********
function  high(x, fn) {
	
	return (...args) => {

		fn(x, ...args);
	}
}

// let G =  (...args) => {console.log(`function args:${args}`)}; 
// let H = high(9, G);
// H(2,3);

//******** TASK 2 Currying ********
let fnForCurry = (x,y,z) => {console.log(`curry fn (x:${x},y:${y},z:${z})`)};
function curry(fn) {
	return  (x) => {
		
		return (y) => {
			
			return (z) => {
				
				return fn(x,y,z);
			}
		}
	}
}

// let testCurry = curry(fnForCurry);
// testCurry(10)(4)(4);
// testCurry(10)(4)(12);

//******** TASK 3 Linear fold ********
function task3(array, callback, initial = 0) {

	let innerCallBack = high(initial, callback);

	for(let i = 0; i < array.length; i++)
	{
		innerCallBack(array[i], i, initial);
		innerCallBack = high(array[i], callback);
	}
}

// task3([1,2,3], (prev, cur ,index, initial) => {console.log(`prev: ${prev} cur: ${cur} index: ${index} initial: ${initial}`)});
// task3([1,2,3], (prev, cur ,index, initial) => {console.log(`prev: ${prev} cur: ${cur} index: ${index} initial: ${initial}`)}, 40);

//******** TASK4 Map ********
function task4(array,callback) {
	let resultArr = [];

	for(let i = 0; i < array.length; i++) {
		resultArr = [...resultArr, callback(array[i])];
	}

	return resultArr;
}

// let task4Array = task4([1,3,5,6], (elem) => {return elem*2});
// console.log(task4Array);

//******** TASK5 Filter ********
function task5(array, callback) {
	let resultArr = [];

	for(let i = 0; i < array.length; i++) {
		if(callback(array[i])){
			resultArr = [...resultArr, array[i]]
		}
	}

	return resultArr;
}

// let task5Array = task5([3,5,2,11,1,0,12], (elem) => {return elem % 2 === 0});
// console.log(task5Array);

//******** TASK6 Average of even numbers ********
function task6(array) {
	let arr = [];

	arr = task5(array, (elem) => {return elem % 2 === 0});

	let sum = 0;

	for(let i = 0; i < arr.length; i++) {
		sum += arr[i];
	}
	return sum/arr.length;
}

// console.log(task6([1,23,2,6,12,0]))

//******** TASK7  Lazy evaluation ********
function task7(callback,...args) {
	return function() {
		return callback(...args);
	};
};

// let task7CallBack = (first, second) => first * second;
// let lazy = task7(task7CallBack,3,10);
//console.log(lazy());

//******** TASK8 Memoization ********
function task8(func) {
	const result = {};

	return (...args) => {

		const argsKey = JSON.stringify(args[0]);

		if(!result[argsKey]) {
			result[argsKey] = func(args[0]);
		}

		return result[argsKey];
	};
};

// const memt = task8( (num) => {return num*num} );
// console.log(memt(12));
// console.log(memt(11));
// console.log(memt(13));
// console.log(memt(10));

//******** TASK 9 Inheritance ********
class Shape {
	constructor(name){
		this.Name = name;
	}
	perimeter = () => {}
	area = () => {};
}
class Square extends Shape {
	constructor(name, sideLength){
		super(name);
		this.sideLength = sideLength;
	}
	perimeter = () => {
		return this.sideLength * 4;
	}
	area = () => {
		return this.sideLength**2;	
	}
}
class Rectangle extends Shape {
	constructor(name, width, height) {
		super(name);
		this.width = width;
		this.height = height;
	}
	perimeter = () => {
		
		return (this.width + this.height) * 2;
	}
	area = () => {
		return this.width * this.height;	
	}
}
class ShapeStore {
	store = [];

	addShape = (shape) => {this.store = [...this.store, shape]}

	totalPerimeterRectangles = () => {
		let sum = 0;
		this.store.map( elem => {
			if (elem instanceof Rectangle) {
				sum += elem.perimeter();
			}
		})
		return sum;
	}

	totalAreaSquares = () => {
		let sum = 0;
		this.store.map( elem => {
			if (elem instanceof Square) {
				sum += elem.area();
			}
		})
		return sum;
	}

}

// const shapeStore = new ShapeStore();

// shapeStore.addShape(new Rectangle('recName1', 10, 15));
// shapeStore.addShape(new Rectangle('recName2', 5, 12));
// shapeStore.addShape(new Rectangle('recName3', 2, 10));
// shapeStore.addShape(new Rectangle('recName4', 10, 25));

// shapeStore.addShape(new Square('squName1',10));
// shapeStore.addShape(new Square('squName2',25));

// console.log(shapeStore.totalPerimeterRectangles());
// console.log(shapeStore.totalAreaSquares());


//******** TASK 10  Function with any number of parameters ********
function task10(...args) {
	if(args.length === 0) return 0
	let sum = 1;
	for(let i = 0; i < args.length; i++){
		sum *= args[i];
	}
	return sum;
}
// console.log(task10(2,2,2,3))
