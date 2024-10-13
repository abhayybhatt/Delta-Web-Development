// let n = 5;
// for(let i=0;i<n;i++){
//     console.log('Hello ', i);
// }

// console.log('bye!');
// let args = process.argv;
// for(let i =2;i<args.length;i++){
//     console.log('Hi', args[i]);
// }
// const math = require('./math');
// // console.log(someValue);
// console.log(math.sum(2,2));//using module.exports from math.js!

// const info = require("./Fruits");
// console.log(info);
import {sum, PI} from './math.js';
import { generate} from "random-words";
console.log(sum(1,2));
console.log(generate());
