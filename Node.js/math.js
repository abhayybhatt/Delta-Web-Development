// const sum = (a,b) => a+b;
// const mul = (a,b) => a*b;
// const g = 9.8;
// const PI = 3.14;

// module.exports = 123;//math.js dusri files ko information de rhi hai in the form of 123, ye 123 value ko export kr rhi hai.
// method 1:
// let obj = {
//     sum: sum,
//     mul: mul,
//     g: g,
//     PI: PI
// };

// module.exports = obj;
// method 2:
// module.exports = {
//     sum: sum,
//     mul: mul,
//     g: g,
//     PI: PI
// };
// method 3:
// module.exports.sum = (a,b) => a+b;
// module.exports.mul = (a,b) => a*b;
// module.exports.g = 9.8;
// module.exports.PI = 3.14;
// method 4:
// exports.sum = (a,b) => a+b;
// exports.mul = (a,b) => a*b;
// exports.g = 9.8;
// exports.PI = 3.14;

// However, Note: 
// exports = 5;  this will be considered wrong kyuki yha pr exports ko as normal variable treat kiya jayega, exports ko module wale exports ki tarah tabhi treat kiya jayega jab use ek object ki tarah treat kiya jaata hai, aur us object ke andar ham functions and properties ko add krne ki koshish kr rhe hote hai.
export const sum = (a,b) => a+b;//saari cheezein individally export hongi, ek object ke form mein nhi.
export const mul = (a,b) => a*b;
export const g = 9.8;
export const PI = 3.14;
