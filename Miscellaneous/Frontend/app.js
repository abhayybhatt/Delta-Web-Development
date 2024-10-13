// OOPS in Js:
// Object Oriented Programming
// To structure our code
// • prototypes
// • New Operator
// • constructors
// • classes
// • keywords (extends, super)


// Inefficient way of programming(repetition of keys and additional memory used):
//  const stu1 = {
//     name: "Adam",
//     age: 20,
//     marks: 95,
//     getMarks: function(){
//         this.marks;
//     },
//  };
//  const stu2 = {
//     name: "Ana",
//     age: 20,
//     marks: 99,
//     getMarks: function(){
//         this.marks;
//     },
//  };
//  const stu3 = {
//     name: "Ace",
//     age: 20,
//     marks: 100,
//     getMarks: function(){
//         this.marks;
//     },
//  };
// Blueprint: class 

// Object Prototypes:
// Prototypes are the mechanism by which JavaScript objects inherit features from one another.
// It is like a single template object that all objects inherit methods and properties from without having
// their own copy.
// arr.__proto__ (reference): Isse prototype ke reference object ko access krte hai. It consists of all array object methods. iski help se kisi built-in funtion ki definition bhi change kr sakte hai, jaise: arr.__proto__.push =(n) => {console.log('Pushing number: ',n);}. Ab isko likhne ke baad kisi bhi arr pr .push(n) method use kroge to yhi likha aayega ki Pushing number: n, just printing this string, without actually adding the value n in arr.
// Array.prototype (actual object): isse Array prototype ke actual object ko access kiya jaa sakta hai, for accesing array-related saare methods.
// String.prototype: isse String prototype ke actual object ko access kr sakte hai, for accessing string-related saare methods.
// Every object in JavaScript has a built-in property, which is called its prototype. The prototype is
// itself an object, so the prototype will have its own prototype, making what's called a prototype chain. The chain ends when we reach a prototype that has null for it own prototype.

// Method: 1
// Factory Functions:
// A function that creates objects.
// function personMaker(name, age){
//     const person = {
//         name: name,
//         age: age,
//         talk(){
//             console.log(`Hi, my name is ${this.name}`);
//         },
//     };

//     return person;
// }

// To basically ham ise ek factory function kehte hai. 
// let p1 = personMaker("adam", 25);//copy
// let p2 = personMaker("eve", 22);//copy

// disadvantage of factory function:
// 1. har p1, p2 object ke pass apni khud ki copy jaati hai, yaani jo funtion talk() sabke liye common hai, uski bhi copy banegi har object khud ke liye create krega. To verify: type p1.talk === p2.talk in browser's console. you'll get false value, thus inefficient for the memory.

// So, a better option:  New operator
// Method: 2
// New operator: The new operator lets developers create an instance (object) of a user-defined object type or of one of the built-in object types that has a constructor function.

//Constructors
// function Person(name, age){//Constructor name generally starts from Capital letter and they don't return anything.
//     this.name = name;
//     this.age = age;
//     console.log(this);//brfore using new keyword, it will give window as the output, kyuki hamara Person ek normal function hi to hai jo hamare window ke andar create hua hai. new keyword use krne ke baad this hamara window na hokr naya instance hoga.
// }
// // ab agr ham chahte hai ki har Person ke pass ek talk naam ka method hone chahiye:
// Person.prototype.talk = function(){
//     console.log(`Hi, my name is ${this.name}`);
// };
// let p1 = new Person('adam', 25);//p1 ka jo prototype hai wo Person ka hi prototype hai, no copy.
// let p2 = new Person('eve', 22);

// Advantage: agr Person ke andar koisa funtion define krenge to alag alag copy nhi banayenge uske objects, instead they will refer to the same function. yaani p1.talk === p2.talk will give true.

// But there is a better syntax to achieve the same thing!
// Method 3: Classes
// Classes are a template for creating objects.
// The constructor method is a special method of a class for creating and initializing an object instance of that class. Classes ko bhi by convention capital letters se start krte hai. yaha pr constructor keyword use kr payenge inside the class aur jo is constructor ka internal implementation rhega, it will be same as in Method:2, aur classes ke andar hi ham apna function define kr paate hai yha pr, which wasn't possible in Method:2. Yaani properties aur function dono hi saath mein class ke andar aa jaate hai. Object create krne ka method same rehta hai, using new keyword.

// class Person{
//     constructor(name,age){
//         this.name = name;
//         this.age = age;
//     }
//     talk(){
//         console.log(`Hi, my name is ${this.name}`);
//     }
// }

// let p1 = new Person('adam', 25);
// let p2 = new Person('eve', 23);

// p1.talk === p2.talk will give true. 

// Inheritance:
// Inheritance is a mechanism that allows us to create new classes on the basis of already existing classes.

// class Student{
//     constructor(name,age, marks){
//         this.name = name;
//         this.age = age;
//         this.marks = marks;
//     }
//     talk(){
//         console.log(`Hi, my name is ${this.name}`);
//     }
// }

// let s1 = new Student('adam', 25, 95);

// class Teacher{
//     constructor(name,age, subject){
//         this.name = name;
//         this.age = age;
//         this.subject = subject;
//     }
//     talk(){
//         console.log(`Hi, my name is ${this.name}`);
//     }
// }
// yha pr kaafi cheezein repeat ho rhi hai dono Student and Teacher class mein, isko handle krne ke  liye ek nayi class banayenge that has these common features:

class Person{
    constructor(name,age){
        console.log('person class constructor.');
        this.name = name;
        this.age = age;
    }
    talk(){
        console.log(`Hi, my name is ${this.name}`);
    }
}

// Now we can remove these common terms from both Student and Teacher class:
class Student extends Person{
    constructor(name,age, marks){
        console.log('student class constructor.');
        super(name, age)//super keyword sirf constructor ke andar hi use kr sakte hai aur super keyword ka matlab hota hai parent class ka constructor, yaha super keyword parent class yaani Person class ke constructor ko call laga rha hai.
        this.marks = marks;
    }
}

let s1 = new Student('adam', 25, 95);

class Teacher extends Person{
    constructor(name, age, subject){
        super(name, age)//parent class constructor is being called.
        this.subject = subject;
    }
}

let t1 = new Teacher('eve', 32, 'english');



class Mammal{//base class or parent class
    constructor(name){
        this.name= name;
        this.type = 'warm-blooded';
    }
    eat(){
        console.log('I am eating.');
    }
}
class Dog extends Mammal{//child class
    constructor(name){
        super(name);
    }
    bark(){
        console.log('woof');
    }
    eat(){
        console.log('Dog is eating.');//function overriding
    }
}
let d1 = new Dog('Liger');
class Cat extends Mammal{//child class
    constructor(name){
        super(name);
    }
    meow(){
        console.log('meow');
    }
}
