// One to Many / Approach 3 (one to squillions) : Store a reference to the parent document inside child. One data point connected to millions or even billions of other data points. Ex: Instagram ya Quora pr koi bhi user bahut saare posts ya create kr sakta ha throughout his/her lifetime. Aise cases mein agr user model bahut hi saare posts model ke data points se connected hai to ham har ek post model ke connected point mein us connected user point ke reference(ObjectId or _id) ko store krte hai. Yaani yha pr approach 2 ka opposite hota hai.

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
    email : String,
});

const postSchema = new Schema({
    content : String,
    likes : Number,
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    }
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// const addData = async() => {
//     // let user1 = new User({
//     //     username : 'rahulkumar',
//     //     email : 'rahul@gmail.com',
//     // });

//     let user = await User.findOne({username : 'rahulkumar'});

//     // let post1 = new Post({
//     //     content : 'Hello world.',
//     //     likes : 800,
//     // });

//     let post2 = new Post({
//         content : 'Bye Bye :)',
//         likes : 900,
//     });
//     post2.user = user;
//     // await user1.save();
//     // await post1.save();
//     await post2.save();
// };

// addData();

const getData = async() => {
    // let result = await Post.findOne({}).populate('user');
    let result = await Post.findOne({}).populate('user', 'username');//agr pura user ka object nhi chahiye sirf uske andar ka username hi chahiye ho to(_id to fir bhi print hokr aayegi hi).
    console.log(result);
};

getData();

// 6 Rules of thumb for MongoDB Schema design:
// Database denormalization rules of thumb: Your guide through the rainbow
// Here are some “rules of thumb” to guide you through these innumerable (but not infinite) choices:

// One: Favor embedding unless there is a compelling reason not to - Embedding yaani ek cheez ke andar dusri cheez ko store krwana, jo apni approach 1 thi(One to few).

// Two: Needing to access an object on its own is a compelling reason not to embed it - Yaani approach 2 aur approach 3 wala case.

// Three: Arrays should not grow without bound. If there are more than a couple of hundred documents on the “many” side, don’t embed them; if there are more than a few thousand documents on the “many” side, don’t use an array of ObjectID references. High-cardinality arrays are a compelling reason not to embed - Agr One to Many ka relation hai, to agr many mein few 'hundreds' se kam data hai, to apan embed kr sakte hai(approach 1), lekin agr greater than hundreds hai to don't embed them, instead use array of ObjectID references(approach 2). Aur agr many mein greater than few 'thousands' ho jaye to aise mein ObjectID references bhi use nhi krna, us case mein high cardinality ho jaati hai and arrays are a compelling reason not to embed. Aise mein har many mein parent ki ObjectID store kara dete hai(approach 3).

// Four: Don’t be afraid of application-level joins: If you index correctly and use the projection specifier, then application-level joins are barely more expensive than server-side joins in a relational database.

// Five: Consider the read-to-write ratio with denormalization. A field that will mostly be read and only seldom updated is a good candidate for denormalization. If you denormalize a field that is updated frequently then the extra work of finding and updating all the instances of redundant data is likely to overwhelm the savings that you get from denormalization - denormalization yaani data ko duplicate krke store krna, ek data ek table mein store ho rha hai aur wahi data dusri table mein bhi store ho rha hai. Aise case mein userSchema mein username field to hogi hi hogi, saath hi mein postSchema mein user field ke andar bhi apan username field add kr dete agr ham har baar user ke saath uska username bhi print krwana chah  rhe hai, aur kuch nhi(jo ki apan ne populate wali line ki help se kara hai customer.js wali file mein), yaani user ke saath to username ki information chahiye hi, saath hi mein har post ke saath bhi username chahiye ho. Thus aise mein username dono Schemas ke andar store hoga, yha pr isi duplicacy ko apan denormalization kehte hai. Denormalization ka ham tab use krte hai jab hamein us data ki baar baar zarurat pade. SQL mein generally denormalization isn't used, pr MongoDB mein ham denormalization ko use kr lete hai jin cases mein wo crucial ho jaata hai. Agr koi aisi cheez hai, jisko apan ko baar baar edit krna padta hai, to uski copies mat banao(due to replication process in this NoSql system, will require more resource and time). Isliye aisi cheez jiska bas data read krna hota hai, koi changes nhi krni hoti, usko denormalize kro.

// Six: As always with MongoDB, how you model your data depends entirely on your particular application’s data access patterns. You want to structure your data to match the ways that your application queries and updates it - ham kis tarah se apne models banate hai, unmein relationships create krte hai, wo entirely ham kaise apni websites ko design krna chahte hai, wo hamare upar depend krta hai. Yaani finalizing aur ending authority to hamesha developer ke pass hi rahegi.

// Two-way referencing: you can combine two techniques and include both styles of reference in your schema, having both references from the “one” side to the “many” side and references from the “many” side to the “one” side. Yaani collection1 ko collection2 ka data pata hai, aur collection2 ko collection1 ka bhi data pata hai.

// Aaj ke pure RELATIONSHIPS in MOngoDB ke summary notes : https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design
