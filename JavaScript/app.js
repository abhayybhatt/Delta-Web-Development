console.log("Hello World!");
let a = 12;
let b = 8;
console.log("sum is :", a+b);
// Template Literals: They are used to add embedded expressions in a string: ${}
let pencilPrice = 10;
let eraserPrice = 5;
// let output ="The total price is :" +(pencilPrice + eraserPrice) + "Rupees.";
console.log(`The total price is : ${pencilPrice + eraserPrice} Rupees.`); //back ticks kehte hai inko: ``;
console.log(5=="5"); //true dega, kyuki == sirf values compare krta hai usko data types se koi fark nhi padta.
console.log(5==="5"); //false dega, kyuki === sirf values hi compare nhi krta, data types ko bhi compare krta hai!
console.log(0=="");//true
console.log(0==="");//false
console.log(0==false);//true
console.log(0===false);//false
console.log(null==undefined);//true
console.log(null===undefined);//true

// JavaScript mein unicode values assigned rehti hai to each character, Symbol, etc. in hexcode format. hexcode value of 'a' is 61 while that of 'A' is 41
//if else statements:
let col= "red";
//Traffic light system:
if(col==='red'){
    console.log("Stop. Light color is red.");
} else if(col==='yellow'){ //else if tabhi chalegi jab if statement false hogi
    console.log("Slow down. Light color is yellow.");
}else if(col==='green'){ 
    console.log("Go. Light color is green.");
}else{ //jab upar ki teeno statements hi false hai.
    console.log("Traffic light ain't working properly");
}

// Qs. Create a system to calculate popcorn prices based on the size customer asked for :
// if size is 'XL', price is Rs. 250
// if size is 'L', price is Rs. 200
// if size is 'M', price is Rs. 100
// if size is 'S', price is Rs. 50
let size = 'L';
if(size==='XL'){
    console.log('Price is Rs. 250.');
}else if(size==='L'){
    console.log('Price is Rs. 200.');
}else if(size==='M'){
    console.log('Price is Rs. 100.');
}else{
    console.log('Price is Rs. 50');
}

let str= 'apple';
if((str[0]==='a') && (str.length>3)){
    console.log('It is a good string.');
} else{
    console.log('It is not a good string.');
}
//while solving logical expressions in js, always solve them from left-to-right.
// && operator has higher precedence than || operator. So, in case of ambiguity, remember this.
// truthy and falsy: in js everything has a boolean value associated with it, ex. 0 has false value associated with it. 1 has true value associated. falsy values are: false, 0,-0,0n(BigInt value),""(empty string), null, undefined and NaN. Everything else comes under truthy values.
// switch Statement: Used when we have some fixed values that we need to compare to.
let color = 'green';
switch(color){
    case 'red':
        console.log('Stop');
        break;
    case 'yellow':
        console.log('Slow down');
        break;
    case 'green':
        console.log('Go');
        break; 
    default: //good practice
        console.log('Traffic light ain\'t working properly');
}

// Qs. Use switch statement to print the day of the week using a number variable 'day' with
// values 1 to 7.
// 1 = Monday, 2 = Tuesday & so on
let day = 5;
switch(day){
    case 1:
        console.log('Monday');
        break;
    case 2:
        console.log('Tuesday');
        break;
    case 3:
        console.log('Wednesday');
        break;
    case 4:
        console.log('Thursday');
        break;
    case 5:
        console.log('Friday');
        break;
    case 6:
        console.log('Saturday');
        break;
    case 7:
        console.log('Sunday');
        break;
    default:
        console.log('Invalid day');
}

// Alert & Prompt
// Alert displays an alert message on the page.
// alert("something is wrong!");
// Prompt displays a dialog box that asks user for some input.
// prompt("please enter your roll no.")
console.log("This is a simple log message.");
console.error("This is an error message.");
console.warn("This is a warning message.");
alert("Welcome!");

// let age= prompt("Enter your age: "); 
// console.log("You are", age, "years old.");

let no= 20;
if(no%10===0){
    console.log('good');
}else{
    console.log('bad');
}
let naam= prompt("Enter your naam:");
let agee= prompt("Enter your age:");
alert(`${naam} is ${agee} years old.`);

// Qs3. Write a switch statement to print the months in a quarter.
// Months in Quarter 1 : January, February, March
// Months in Quarter 2 : April, May, June
// Months in Quarter 3 : July, August, September
// Months in Quarter 4: October, November, December
// [Use the number as the case value in switch]
let quarter = 2;
switch(quarter){
    case 1:
        console.log("January, February, March");
        break;
    case 2:
        console.log("April, May, June");
        break;
    case 3:
        console.log("July, August, September");
        break;
    case 4:
        console.log("October, November, December");
        break;
    default:
        console.log("Invalid Quarter");
}

let goldenString = "Akshay";
if((goldenString[0] === 'a' || goldenString[0] === 'A') && (goldenString.length>5)){
    console.log("Golden String");
}else{
    console.log("Not a Golden String");
}

let num1= 8;
let num2= 12;
let num3= 20;
if((num1> num2)&& (num1> num3)){
    console.log("num1 is largest."); 
} else if((num2>num1)&&(num2>num3)){
    console.log("num2 is largest.");
}else{
    console.log("num3 is largest.");
}

// Qs6 (Bonus). Write a program to check if 2 numbers have the same last digit.
// Eg : 32 and 47852 have the same last digit i.e. 2

let no1 = 32;
let no2 = 353462;
if(no1%10 === no2%10){
    console.log("Both numbers have the same last digit i.e,", no1%10);
}else{
    console.log("Both numbers do not have the same last digit.");
}

let msg = "     hello     "; //msg.trim() removes initial and ending whitespaces, if present in any string. Note: Strings are immutable in Js, this method creates a new string and the original value of older string remains unaltered.

// msg.indexOf("e"); Returns the first index of occurrence of some value in string. Or gives -1 if not found.
// let msg1 = msg.trim().toUpperCase(); Method Chaining: Using one method after another. Order of execution will be left to right.
// slice:Returns a part of the original string as a new string. str.slice(start indx, end indx), where end indx is non-inclusive. str.slice(start indx), in this method it assumes that end indx is str.length. Can also pass -ve indx: str.slice(-num) = str.slice(str.length-num)
// str.replace("old value", "new value"). Only replaces first occurence.
// str.repeat(no. of times to repeat that string str): Returns a string with the number of copies of a string
// let str = "Mango";
// str.repeat(3); // "MangoMangoMango"

let arr= ["Abhay","Akshay","Aditya"];
// arrays are mutable in Js. typeof arr; gives object. In Js, an array can be hetrogeneous as well, unlike in Java and Cpp. Array mein beech mein empty space blocks ban jaate hai agr apan koi alag index pr nayi value store kare jo ki exist hi nhi krta, as they are mutable. Array Methods:
// Push : add to end
// Pop : delete from end & returns it
// Unshift : add to start
// Shift : delete from start & returns it
let followers = ["a","b","c"];
let blocked = followers.shift();

console.log(followers);

// includes : search for a value
// arr.includes("b"); // gives true
// arr.includes("c"); // gives false
// arr1.concat(arr2); //merges 2 arrays. pehla array pehle aayega aur dusra baad mein add hoga
// arr.reverse(); //to reverse an array

// arr.slice(); slice : copies a portion of an array. Other properties similar to str.slice() method.

// splice : removes / replaces / add elements in place
// splice( start, deleteCount, item0...itemN), where deleteCount is optional, so we can write 0 in its place
// slice sirf arr ki copy banata hai lekin splice usi array mein changes kr deta hai: Major difference 
let cars = ["bmw","audi","Mercedes","Rolls Royce"];
console.log(cars.splice(1)); //ab array mein start ke 3 elements hi hai 
console.log(cars.splice(0,1));//bmw delete ho jayega
console.log(cars.splice(0,0, "Ferrari", "Lamborghini")); //iska matlab 0th index pr, 0 elements delete karo, aur waha pr ye do naam add kr do, in same order. Ab inke baad audi ka naam aayega.
cars.sort(); //ascending order
// sort method internally pehle array ke sabhi elements ko string mein convert krta hai aur fir sort krta hai unko, isliye it wouldn't work on nums array.
// Array references: means adress in memory. arrays can be distinguished from each other using call by reference and call by value.
// [1] == [1]; //gives false, kyuki in dono arrays ka memory address alag alag hai aur inke variables bhi memory address ko store krte hai, value ko nhi, isliye false milenga.
// [1] === [1]; //gives false, same above reason.
// name of array variable is called reference variable. It stores the address of each element stored in the array.
// however: 
// let num1= [1,2,3];
// let num2= num1;
// num1==num2; //gives true, kyuki ab is baar num1 aur num2 dono hi same memory address ko point kr rhe hai.
// num1===num2; //gives true, kyuki ab is baar num1 aur num2 dono hi same memory address ko point kr rhe hai.
// const arrays mein apan naye elements add kr sakte hai, lekin dusre memory address ko usmein daal sakte.

for(let i=1;i<=15;i++){
    if(i%2!=0){
        console.log(i);
    }
}
// dry run: koi bhi code jo aapne likh liya usko paper-pen pr solve krna.

let n = prompt("Enter a number:");
n=parseInt(n);
for(let i=n; i<=n*10; i=i+n){
    console.log(i);
}

let i=1;
while(i<=5){
    console.log(i);
    i++;
}

let fruits = ["apple",'mango','banana','papaya'];
// for(let i=0;i<fruits.length;i++){
//     console.log(i, fruits[i]);
// }

//using for of loop(similar to for each loop in java):
for(fruit of fruits){
    console.log(fruit);
}

// Todo App:
// • list - to show all todos
// • add - to add a todo
// • delete - to delete a task
// • quit - to exit the todo

let todo = [];
let req = prompt("Enter your request");
console.log(req);
while(true){
    if(req=="quit"){
        console.log("Quitting the app . . .");
        break;
    }
    if(req=="list"){
        console.log("------------------");
        for(let i=0;i<todo.length;i++){
            console.log(i, todo[i]);
        }
        console.log("------------------");
    } else if(req=="add"){
        let task = prompt("Enter your task");
        todo.push(task);
        console.log("Task added.");
    }else if(req=="delete"){
        let idx= prompt("Enter the task index");
        idx=parseInt(idx);
        if(idx<todo.length){
            todo.splice(idx,1);
            console.log("Task deleted.");
            }else{
                console.log("Invalid index");
            }
    }else{
        console.log("Invalid input.");
    }
    req=prompt("Enter your request");
}

// Qs1. Write a JS program to delete all occurrences of element ‘num’ in a given array.
// Example : if arr = [1, 2, 3, 4, 5, 6, 2, 3] & num = 2
// Result should be arr = [1, 3, 4, 5, 6, 3]
// Ans1.
let arr1= [1,2,3,4,5,6,2,3];
let num = 2;
for(let i=1; i<arr1.length;i++){
    if(arr1[i]==num){
        arr1.splice(i,1);
    }
}
console.log(arr1);

// Qs2. Write a JS program to find the no of digits in a number.
// Example : if number = 287152, count = 6
// Ans2.
let number1 = 287152;
let count =  0;
let copy = number1;
while(copy>0){
    count++;
    copy = Math.floor(copy/10);
}
console.log(count);

// Qs3. Write a JS program to find the sum of digits in a number.
// Example : if number = 287152, sum = 25
// Ans3.
let number2 = 287152;
let sum =0;
let copy2 = number2;
while(copy2>0){
    sum = sum + copy2%10;
    copy2 = Math.floor(copy2/10);
}
console.log(sum);

// Qs4. Print the factorial of a number n.
// Ans4.
let n1=5;
let factorial=1;
for(let i=1; i<=n1;i++){
    factorial*= i;
}
console.log(`factorial of ${n1} is ${factorial}`);

// Qs5. Find the largest number in an array with only positive numbers.
// Ans5.
let arr3= [1,2,0,4,5,6,7];
let largest=0;
for(let i = 0;i<arr3.length;i++){
    if(largest<arr3[i]){
        largest=arr3[i];
    }
}
console.log(largest);

// JS Objects Literals:
// Used to store keyed collections & complex entities.
// property => (key, value) pair
// Objects are a collection of properties
// key-value pair ko kahenge ek property
// const ya fir let: dono keywords use kr sakte hai while creating an object literal
let delhi={
    latitude: "28.7041°N", //key: "value", = property 1
    longitude: "77.1025°E" //key: "value" = property 2
};
// separate multiple properties with , and end with ;

const student={
    name: "Aditya",
    age: 20,
    marks: 94.5
};

// better clarity object mein aa rhi hai  compared to an Array, due to key-value pairs. Generally, we make our objects using the const keyword. yaha similar concept lagega memory referencing ka jo const array mein lagra hai. object ke andar multiple values ek key ke andar store karana possible hai(array bana sakte hai inside an object)
const post={
    username:"@abhay",
    content:"This is my #firstpost",
    likes:344,
    reposts: 7,
    comments: 320,
    tags:["@apnacollege", "@delta"]
};
// obj["key"]; or obj.key; both methods work for accesing a value from an Object.
// Get Values:
// JS automatically converts objects keys to strings.
// Even if we made the number as a key, the number will be converted to string.
// obj[1]: 1 index nhi hai, na hi no. hai. Js ne pehle isko string mein convert kiya hai.
student.city="Mumbai"; //creates a new property
student.age=21; //to change the value of an existing property
student.marks= "O";
// delete student.age; //delete property => delete obj.keyname;
// Can also create nested objects: An object of objects.
const classInf={
    abhay:{
        grade:"O",
        city:"Mumbai"
    },
    aman:{
        grade:"A+",
        city:"Kochi"
    },
    tom:{
        grade:"A",
        city:"Singapore"
    }
};
// we can also create an Array of objects:
const classInfo=[
    {
        grade:"O",
        city:"Mumbai"
    },
    {
        grade:"A+",
        city:"Kochi"
    },
    {
        grade:"A",
        city:"Singapore"
    }
];

// Math object: pre-existing object in Js. Collection of all mathematical properties and methods.
// Properties: Math.PI, Math.E, etc.
// Methods: Math.abs(n), Math.ceil(n), Math.floor(n), Math.random(), Math.pow(a.b), Math.sqrt, etc.
// Math.abs(-12);
// Math.abs(12); Gives absolute value, i.e 12 in both cases.
// Math.pow(a,b); Power function, same as a**b.
// Math.floor(n); no ko round off krdega, ya to usse kam value dega ya uske barabar (<=). Round off krke chhota no. lata hai usse, nearest smallest integer. Farsh
// Math.ceil(n); opposite of Math.floor(n), round off krega nearest largest integer mein. Chhat
// Math.random(); 0 se 1 ki range mein koisa bhi no. de deta hai, jismein 1 exclusive hai. To generate random numbers.

// To generate random Integers, let's say from 1 to 10:
let step1= Math.random();
let step2= step1*10; //for 0 to 10 range
let step3= Math.floor(step2); //0 to 9, removing decimal nos.
let step4= step3+1; //1 to 10, adding 1 to make the range from 1 to 10. Kyuki Math.random() kabhi 1 generate nhi krega, to apn ko 10 kabhi milenga hi nhi. Isliye add 1, waise bhi no to random hi generate hoga to 1 add krne pr bhi random no hi banega bas range badh jayegi. Ab 0 generate nhi hoga.
// Direct likhe to:
let random1 = Math.floor(Math.random()*100)+1;//range 1 to 100.
let random2 = Math.floor(Math.random()*5)+1;//range 1 to 5.
let random3 = Math.floor(Math.random()*5)+21;//range 21 to 25.
//Guessing game:
const max= prompt("Enter the max number");
const random = Math.floor(Math.random()*max)+1;
let guess = prompt("Guess the number");
while(true){
    if(guess == "quit"){
        console.log("user quit");
        break;
    }
    if(guess == random){
        console.log("you are right! congrats!! Random number was", random);
        break;
    } else if(guess>random){
        guess = prompt("hint: small");
    }else{
        guess = prompt("hint: large");
    }
    //else{
    //     console.log("Your guess was wrong.Try again.");
    // }
}

// Qs1. Create a program that generates a random number representing a dice roll.
// [The number should be between 1 and 6].
// Ans1.
let dice = Math.floor(Math.random()*6)+1;
console.log(dice);
// Qs2. Create an object representing a car that stores the following properties for the
// car: name, model, color.
// Print the car’s name.
// Ans2.
let car = {
    name: "Toyota",
    model: "Fortuner",
    color: "Black",
};
console.log(car.name);
// Qs3. Create an object Person with their name, age and city.
// Edit their city’s original value to change it to “New York”.
// Add a new property country and set it to the United States
// Ans3.
let person = {
    name: "John",
    age: 25,
    city: "London",
};
person.city = "New York";
person.country = "United States";
console.log(person);

// Functions in Js: function functionName(){//code}
//     call => functionName();

function rollDice(){
    let random = Math.floor(Math.random()*6) + 1;
    console.log(random);
}
rollDice();

function printInfo(name, age){
    console.log(`${name}'s age is ${age}`);
}
printInfo("aman", 34);
printInfo("ajay");//age undefined hai, to output mein bhi undefined hi likha aayega.

function printTable(n){
    for(let i = 1; i<=10; i++){
        console.log(`${n} * ${i} = ${n*i}`);
    }
}
printTable(9);

function isAdult(age){
    if(age >= 18){
        return "Adult";
    }else{
        return "Not adult";
    }
}
console.log(isAdult(25));

// Scope:
// Scope determines the accessibility of variables, objects, and functions from different parts
// of the code.
// • Global: Variables declared outside any function or block are in global scope.
// • Function
// • Block: Variables declared inside a { } block cannot be accessed from outside the block.only applies on let and const keyword. Doesn't apply on var keyword.
// • Lexical: for nested functions. a variable defined outside a function can be accessible inside another function defined after the variable declaration.The opposite is NOT true. Yaani bahar wale function ke variables inner function use kr sakta hai. Lekin iska ulta nhi kr sakte. Lexical Scope Bahar se andar work karta hai lekin andar se bahar work nhi krta.

let greet = "hello"; //global scope
function changeGreet(){
    let greet = "namaste"; //function scope
    console.log(greet);
    function innerGreet(){
        console.log(greet); //lexical scope
    }
}
 console.log(greet);
 changeGreet();
//  lekin output mein sirf hello and namaste print hoga kyuki innerGreet ko changeGreet mein call hi nhi kara last mein.

// Function Expressions: Nameless functions. Kisi variable ke andar jaakr unki value store ho jaati hai. Variable ke naam se hi function ko call krte hai.
let sum1 = function(a,b){
    return a+b;
}
console.log(sum1(2,3));

// Higher Order Functions
// A function that does one or both :
// • takes one or multiple functions as arguments
// • returns a function
function multipleGreet(func,count){ //Higher order function that takes one function as an argument.
    for(let i= 1; i<=count;i++){
        func();
    }
}
let greet1 = function(){
    console.log("hello");
}
multipleGreet(greet1,5);

// Factory Function: Jo naye functions ko create krta hai.
function oddOrEvenFactory(request){ //Another Higer order function that returns a function.
    if(request == "odd"){
        return function(n){
            console.log(!(n%2==0));
        }
    }else if(request=="even"){
        return function(n){
            console.log(n%2==0);
        }
    }else{
        console.log("Wrong input");
    }
}
let request = "odd"; //or even

// Methods:
// Actions that can be performed on an object. Jo functions objects ke andar define hote hai unko Js mein methods kehte hai. In key-value pair. key: varibale  and value: function definiton.

// let caluculator = {
//     add: function(a,b){
//         return a+b;
//     },
//     sub: function(a,b){
//         return a-b;
//     },
//     mul: function(a,b){
//         return a*b;
//     },
//     div: function(a,b){
//         return a/b;
//     }
// };
// Shorthand:
let caluculator = {
    add(a,b){
        return a+b;
    },
    sub(a,b){
        return a-b;
    },
    mul(a,b){
        return a*b;
    },
    div(a,b){
        return a/b;
    }
};
console.log(caluculator.add(5,6));


// Qs1. Write a JavaScript function that returns array elements larger than a number.
// Ans1.
let arr2 = [8, 9, 10, 1, 2, 3, 4, 5, 6, 7];
let number = 5;
//elements larger than a number
function getElements(arr, num) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] > num) {
        console.log(arr[i]);
        }
    }
}
getElements(arr2, number);

// Qs2. Write a JavaScript function to extract unique characters from a string.
// Example: str = “abcdabcdefgggh” ans = “abcdefgh”
// Ans2.
let string = "abcdabcdefgggh";
//function to get String with all unique elements
function getUnique(str){
    let ans="";
    for(let i=0;i<string.length;i++){
        let currChar = string[i];
        if(ans.indexOf(currChar) == -1){ //if current character is not added, then add it in ans, Otherwise it is a duplicate.
            ans += currChar;
        }
    }
    return ans;
}
console.log(getUnique(string));

// Qs3. Write a JavaScript function that accepts a list of country names as input and 
// returns the longest country name as output.
// Example : country = ["Australia", "Germany", "United States of America"] output : 
// "United States of America"
// Ans3.
let country = ["Australia", "Germany", "United States of America"];
function longestName(country) {
    let ansIdx = 0;
    for (let i = 0; i < country.length; i++) {
        let ansLen = country[ansIdx].length;
        let currLen = country[i].length;
        if (currLen > ansLen) {
            ansIdx = i;
        }
    }
    return country[ansIdx];
}
console.log(longestName(country));

// Qs4. Write a JavaScript function to count the number of vowels in a String 
// argument.
//Ans4.
let strvow = "apnacollege";
function countVowels(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (
        str.charAt(i) == "a" ||
        str.charAt(i) == "e" ||
        str.charAt(i) == "i" ||
        str.charAt(i) == "o" ||
        str.charAt(i) == "u"
        ) {
        count++;
        }
    }    
return count;
}
console.log(countVowels(strvow));

// Qs5. Write a JavaScript function to generate a random number within a range 
// (start, end)
//Ans5.
let start = 100;
let end = 200;
function generateRandom(start, end) {
    let diff = end - start;
    return Math.floor(Math.random() * diff) + start;
}
console.log(generateRandom(start, end));
// Higher level object in js is window. this Keyword
// "this" keyword refers to an object that is executing the current piece of code. It can  also have other meaning in Js, based on the given context.
// try & catch:
// The try statement allows you to define a block of code to be tested for errors while it
// is being executed.
// The catch statement allows you to define a block of code to be executed, if an error
// occurs in the try block.
// Arrow Functions: arrow functions are nameless functions which don't even use function keyword for their definition.
// const func = (argl, arg2 ..) => { function definition }
// arg1,arg2,.. etc may or may not be present.
// const jod = (a,b) => {
//     console.log(a+b);
// }
// agr arrow function sirf kisi ek value ko return krne ka kaam krta hai to apan return keyword ko bhi hata sakte hai, ise implicit(automatic, self-understood) return bhi kehte hai, bas ek syntax change aa jaata hai. {} ko () se replace kr dete hai:
const jod = (a,b) => (
    a+b
);
// Set Timeout: inbuit function of window Object. kuch specific time baad koisa kaam ho jaana chahiye.
// set Timeout(function, timeout) Here timeout takes values in milliseconds(ms).
// callback: koi bhi function jo dusre function mein as an argument jaata hai use callback bolte hai. 
// setTimeout se program ruk nhi jaata, baaki lines execute hoti rehti hai bas wo kuch specific timeout ke baad hi execute hunda si. It is generally used for api calls and request-response.
console.log("Hi there!")
setTimeout(()=>{
    console.log("Apna College");
}, 2000); //2000 matlab 2 seconds.
console.log("Welcome to");
// Set Interval: sab kuch same hai setTimeout ke, bas difference itna hai ki setTimeout kuch time interval ke baad execute hota hai aur band ho jaata hai, lekin setInterval kuch time interval ke baad execute hota hai, fir band hota hai, firse usi timeout(interval) ke baad execute hota hai, fir band hota hai, and so on.. matlab chalta jaata hai har specified interval ke baad.
// setlnterval( function, timeout )
// to roke kaise? har setInterval ko ek id assign kr do. usko fir print kara do, after that browser ke console mein jaake likho: clearInterval(id);
// this with  arrow functions: major difference arrow functions aur normal functions mein ye hota hai ki functions mein this ka scope calling object pr depend krega, ki konsi object se us function ko call kiya  gya hai jabki arrow functions mein this ka lexical scope hota hai, arrow  function ka wahi scope hoga jo uske parent ka scope hoga.
// functions ke liye scope hota hai ki unhe kon call kr rha hai wo unke khud pr depend krta hai, jabki arrow functions ke liye lexical scope hota hai, matlab uske parent ka jo scope hai, wahi unka scope hota hai. arrow functions apne calling object ke 'this' ko apna 'this' banate hai.
// Normal function ke liye this hota hai: jo object use call laga rha hai aur arrow function ke liye this hota hai: us arrow function ke parent ko call lagane wali object, yaani lexical scope chalta hai.
const square = (n) => (n*n);
// Write a function that prints "Hello World" 5 times at intervals of 2s each.
let id = setInterval(()=>{
    console.log("Hello World");
}, 2000);
setTimeout(()=>{
    clearInterval(id);
    console.log("clearInterval ran");
}, 10000); //5 times at intervals of 2s each = 10 second baad setInterval ko band karana hai.
// Qsl . Write an arrow function named arrayAverage that accepts an array of numbers
// and returns the average of those numbers.
// Ans1.
const arrayAverage = (arr) => {
    let total = 0;
    for(let number of arr){
        total+=number;
    }
    return total/arr.length;
}
let arr4 =[1,2,3,4,5,6,7];
console.log(arrayAverage(arr4));
// Qs2. Write an arrow function named isEven() that takes a single number as argument
// and returns if it is even or not.
let ank = 4;
const isEven = (num) => num%2==0;
console.log(isEven(ank));
// Qs3. What is the output of the following code:
// const object = {
//     message: "Hello, World!",
//     logMessage(){
//         console.log(this.message);
//     }
// }
// setTimeout(object.logMessage, 1000);
// Ans3. Hello, World! (because setTimeout is calling the function in the global context, After a delay of 1 second, undefined is logged to the console.While the setTimeout() function uses the object.logMessage as a callback, still, it invokes object.logMessage as a regular function, rather than a method.
// And during a regular function invocation this equals the global object, which is a window in the case of the browser environment.
// That's why console.log(this.message) inside logMessage method logs window.message, which is undefined.
// Qs4. What is the output of the following code:
// let length = 4;
// function callback(){
//     console.log(this.length);
// }
// const object ={
//     length:5,
//     method(callback){
//         callback();
//     },
// }
// object.method(callback,1,2);
// 'Hello, World!' is logged to the console.
// object.getMessage() is a method invocation, that's why this inside the method equals
// object.
// There's also a variable declaration const message = 'Hello, Earth!' inside the method.
// The variable doesn't influence the value of this.message.
// some array higher order methods:
// let newArr = arr.map(some function definition or name);//iterates and stores the values in newArr of same size as that of original array
// let print = arr.forEach(function(el){//just iterates. both map and forEach are similar to for of loop.
//     console.log(el);
// // });
// let newArr = arr.filter(some function definition or name); 
// let even = nums.filter((num)=>(num%2 == 0));//similar to map, but adds only those elements in even array where the specified callback condition becomes true.
// Every:Returns true if every element of array gives true for some function. Else returns false. Very similar to logical AND operator.
// [2,4,6].every((el)=> el%2 == 0); //gives true
// [2,4,6,1].every((el)=> el%2 == 0);//gives false
// Some:Returns true if some elements of array give true for some function. Else returns false. Very similar to logical OR, agr ek bhi value true hai to true return kr dega. Baaki sab kuch every jaisa hi hai, including syntax.
// Reduce:Reduces the array to a single value. let's say for an array of three elements, ek-ek karke un pr reduce function call hoga, for first no, wo jaake element mein store hoga aur accumulator ki kuch value hogi(0), un dono ko mila kr koisi value return hogi based on the function definition, jo return hui, wo next no. ke (next reduce function/callback ke)liye accumulator ka kaam kregi. In similar fashion, jab third reduce function mein second wali return value accumulator hogi aur 3rd element of array hoga, tab jo value return hogi, yahi hamare reduced function ki final value hoti hai, jo print kri jaati hai for some array arr. To logic kya hai is function ka? Generally used to calculate the sum of all elements of an array, jiska code iski next ki next line mein hai.
// arr.reduce( reducer function with 2 variables for (accumulator, element) );
// let finalVal= [1,2,3,4].reduce((res,el)=> res+el);//here accumulator is result variable res, and element is el. gives output 10. i.e calculates sum of all elements of array.
// Check if all numbers in our array are multiples of 10 or not.
// ->  let ans = [10,20,30,40].every((el)=> el%10 == 0);//when 'all numbers' are given, we use every function.
// console.log(ans);//gives true here
// Create a function to find the min number in an array.
// ->function getMin(nums){
//     let min= nums.reduce((min,el)=> {
//     if(min<el){
//         return min;
//     }else{
//         return el;
//     }
//     });
//     return min;
// }
// let nums = [10,3,4,53,6];
// console.log(getMin(nums));
// Default Parameters: Giving a default value to the arguments
// function func(a,b=2){
//     return a+b;
// }
// console.log(sum(1));//gives 3. Note: value assiged on the basis of order. isliye sirf first argument ko default value doge aur aisa kuch kroge to  NaN(Not a Number) error dega.
// Spread: Expands an iterable into multiple values. use '...' for spreading the values of the loop output.
// function func(...arr){
//     //do something
// } 
// or Math.min(...arr);
// console.log(...arr); //to spread individual elements of array whilst printing them.
console.log(..."apnacollege");
//spread object, array, strings aur numbers pr bhi use kr sakte.
// Rest:Allows a function to take an indefinite number of arguments and bundle them in an array. Opposite of spread. same ... syntax.
// arguments is a collection, not an array and hence array methods won't work in it. Lekin rest ki help se apan kisi function ko ...args paramenter dekr usi mein array methods use kr sakte hai kyuki wo un sabhi arguments ko accumulate kr deta hai into a new array, jispr apan fir array methods use kr sakte hai.
// Destructuring: Storing values of array into multiple variables.
let names = ['tony','bruce','peter','steve','jason'];
// let winner = names[0];
// let runnerUp = names[1];
// let secondRunnerUp = names[2];
// use destructuring insted:
let [winner, runnerUp, ...others] = names;//orderwise value mil jayegi. ...others yani rest ki help se apan ne ek others naam ki array banai hai jo baaki ke bache naam store kr legi from names array. That's how we can use destructuring to take each element from an array and assign them to individual variables. Similarly destrucuturing objects mein bhi lag jaati hai, bas [] ki jagah {} use hoga aur jo individual varibales hai, unmein key ki values hi valid hongi, nhi to you can also do this: 
let{name: nam,age} = student;//ab yaha name key ko nam se call kr payenge.
// Qs1. Square and sum the array elements using the arrow function and then find the
// average of the array.
// Ans1.
let array= [1,2,3,4,5];
const sq = array.map((num)=> num*num);
console.log(sq);
let sum2 = sq.reduce((acc,cur)=> acc+cur,0);
let avg= sum2/array.length;
console.log(avg);
// Qs2. Create a new array using the map function whose each element is equal to the
// original element plus 5.
// Ans2.
let numbs = [2,4,6,8,-2,-4];
console.log(numbs.map((num)=> num+5));
// Qs3. Create a new array whose elements are in uppercase of words present in the
// original array.
//Ans3.
let words = ['apple','banana','cherry'];
console.log(words.map((word)=> word.toUpperCase()));
// Qs4. Write a function called doubleAndReturnArgs which accepts an array and a
// variable number of arguments. The function should return a new array with the original
// array values and all of the additional arguments doubled.
// Ans4.
const doubleAndReturnArgs = (arr, ...args) => [
    ...arr,
    ...arr.map((v)=>v*2),
];
doubleAndReturnArgs([1,2,3], 4,4);//gives [1,2,3,8,8]
doubleAndReturnArgs([2], 10,4);//gives [2,20,8]
// Qs5. Write a function called mergeObjects that accepts two objects and returns a new
// object which contains all the keys and values of the first object and second object.
// Ans5.
const mergeObjects = (obj1,obj2)=>({...obj1, ...obj2});
mergeObjects({a:1,b:2},{c:3,d:4});//gives {a:1,b:2,c:3,d:4}
// DOM:Document Object Model. The DOM represents a document(an object that stores all the information of html and css linked to our js file) with a logical tree. It allows us to manipulate/change webpage content (HTML elements).
// Use console.dir(document); to print document on console. 





