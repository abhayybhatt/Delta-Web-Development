// Schema Validations:
// Basically, Rules for Schema. Similar to SQL, jaha pr schema rules hote the jaise ki column name, type and uske constraints, ham in Schema pr bhi rules specify kr sakte hai jo apan MongoDB mein use krte hai.

const mongoose = require('mongoose');
main().then((res) =>{
    console.log('connection successful.');
})
    .catch((err) => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');//amazon database ke andar ham book ka collection form krenge, jismein we'll store data for individual books.
}

// const bookSchema = new mongoose.Schema({
//     title: String,
//     author: String,
//     price: Number,
// }); ye short form tarika tha jo apan ne index.js mein use kr liya hai, jab datatype ke alawa aur koi constraint nhi tha.

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // MongoDB mein 'required' constraint = SQL ka 'Not Null' constraint. Jis field pr constraint define kiya hota hai wo usi field pr applicable hota hai.
        maxLength: 20,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
        min: [1, 'Price is too low for Amazon selling'],//custom validation error message.
    },
    discount: {
        type: Number,
        default: 0, // default value of discount is 0, if discount is not provided.
    },
    category: {
        type: String,
        enum: ['fiction', 'non-fiction'], //enum validator, yaani inhi mein se kuch value ho sakti hai category ki, inke alawa aur koisi rakhi to error aayegi.
    },
    genre: [String],//arrays ko bhi store kara sakte hai.
});

// Creating Model for Books: 
const Book = mongoose.model('Book', bookSchema);

// let book1 = new Book({
//     title: 'Mathematics Class XII',//agr title miss kr diya to Book Validation failed message aayega terminal pr kyuki titile ek 'required' attribute hai, as defined in our Schema above.
//     author: 'RD Sharma',
//     price: 1200
// });
// book1.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

// let book2 = new Book({//yha author ko miss kr diya, pr error nhi aayegi kyuki wo ek 'required' attribute nhi tha.
//     title: 'Mathematics Class VIII',
//     price: 1200
// });
// book2.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

// let book3 = new Book({//yha author ko miss kr diya, pr error nhi aayegi kyuki wo ek 'required' attribute nhi tha.
//     title: 'How To Kill A Mockingbird',
//     author: 'Harper Lee',
//     price: '299',//although string format mein bheja hai, pr number hi hai. Jab ye MongoDB shell mein jayega to bas ye condition rehti hai ki ye value iske Number form mein parse ya fir cast ho jaye. Agr nhi hoti to error aata hai, yha agr 'abc' bhejte to cast failed error aata kyuki wo uske number format mein cast nhi ho paata.
//     // To condition ye hai ki yha ham jo bhi value bheje, wo eventually database mein jaakr parse ho jaaye, agr parse nhi ho payega, to error aayegi. 
// });
// book3.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });
// let book4 = new Book({
//     title: 'Gone Girl',
//     price: '399',
// });
// book4.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

// let book5 = new Book({//yha author ko miss kr diya, pr error nhi aayegi kyuki wo ek 'required' attribute nhi tha.
//     title: 'Marvel Comics',
//     price: '500',
//     category: 'fiction',
// });
// book5.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

// let book6 = new Book({//yha author ko miss kr diya, pr error nhi aayegi kyuki wo ek 'required' attribute nhi tha.
//     title: 'Marvel Comics v2',
//     price: '600',
//     genre: ['comics', 'superheroes','fiction'],
// });
// book6.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

// Book.findByIdAndUpdate('671908ca4550cfcd5df9950e', {price:  -500})//ab yha jo hamne validations mein rule define kiye the, jaise ki price should be minimum 1, wo yha updation mein kaam nhi krte, meaning ki ye statement work krega, without any error.
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

// Agr ham chahte hai ki hamare ye validations ke rules updation mein bhi kaam kre, aise update methods mein 3rd parameter yaani options paramemter mein runValidators option ko true set krna hota hai.

Book.findByIdAndUpdate('671908ca4550cfcd5df9950e', {price:  -100}, {runValidators : true})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err.errors.price.properties.message);
});

// Handling Errors:
// console. log(err.errors.category.properties.message);//agr puri depth tak jaha error aayi hai usko print karana ho to
// Ham custom errors bhi define kr sakte hai agr koisa validator galat ho jaata hai to, jaise ki -> 
// min: [1, 'Price is too low for Amazon selling'].