// Mongo Relationships:
// One to Many / Approach 1 (one to few relationship) : Store the child document inside parent. Ex: Zomato se agr khaana order krna hai to locations har user ki  kuch selected hi hoti hai - home, hostel, office yeh sab. To ye kuch hi locations hai koi thousands ya millions of locations nhi stored rehti har user ki for ordering food online. yaha "one" hai hamara ek Zomato ka account aur "few" hai some selected addresses jo ki stored rehti hai. Another example would be Uber/Ola, jaha pr hamari few selected addresses hote hai jaha hamko jaana hota hai.
// MongoDB mein one to few relationship implement krne ke liye ham child document ko parent document mein store kr dete hai. Jaise 2 models hai - user model and address model, ab ye socho in dono ko alag banana bhale hi easy lage, lekin kya apan in dono models ko kabhi bhi "individually" use krenge? Aisa user ke case mein nhi hoga, kyuki kabhi bhi let's say food delivery ke case mein kitne bhi addresses ho, pr wo ek hi user se associated rehte hai, to ye hamare liye sense nhi banayega ki address ke liye ham ek alag model create krein, isliye apan Address model ki information User model ke andar hi store kara denge. 
// To kab naya model nhi banana apne project mein? -> Jab ham uske data ko individually kabhi use nhi kr sakte. 
// Yha address child document ho jayega aur user parent document. Kyuki user ke liye address store ho rha hai, address ke liye user store nhi ho rha. 

const mongoose = require('mongoose');
const {Schema} = mongoose; //mongoose se destructure hokr aa jayega.

main()
    .then(()=> console.log('Connection successful.'))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new Schema({ //Defining userSchema.
    username : String,
    addresses : [
        {
            _id : false, //kyu kara _id false? -> kyuki MongoDB data save krne ke baad har ek address ko bhi individually ek unique _id assign kr deta hai, apart from assigning _id to each user, kyuki wo isko ek aur document hi samajhta hai and thus wo aisa krta hai. Is statement se har individual address ke liye ek unique _id nhi banegi ab.
            location : String,
            city : String,
        },
    ],
});

const User = mongoose.model("User", userSchema);//creating User model using userSchema.

// For adding data into our userSchema: 
const addUsers = async() => {
    let user1 = new User({
        username : "sherlockholmes",
        addresses : [ //har user ke multiple addresses store krne ke liye array banai hai.
            {
                location : '221B Baker Street',
                city : 'London',
            },
        ],
    });

    user1.addresses.push({ location : 'P23 Wall Street', city : 'London'}); //we can push individual addersses into our user1. Ek default address to pehle se hi add kiya tha user1 mein aur iske through ek aur second address push kr diya.
    let result = await user1.save();
    console.log(result);
}

addUsers();

