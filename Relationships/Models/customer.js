// One to Many / Approach 2: Store a reference(pointer, id) to the child(jaise ki ObjectId) document inside parent. Jaise apan Blinkit jaisi services provide kr rhe hai to Customers honge, unki details hongi + Jo different orders wo place kr rhe hai , uski details jaise ki price, quantity yeh sab. To Customers hai jo Orders ko place kr rhe hai. Yha pr thousads of fields ho sakti hai rather than just a few, to Customers aur Orders dono alag se models create krenge aur jin bhi orders ko place kra hoga kisi customer ne, un sabhi orders ki id(yaani reference) ham us customer mein store krenge. Is reference se actual data tak pahucha jaa sakta hai.

const mongoose = require('mongoose');
const {Schema} = mongoose; //mongoose se destructure hokr aa jayega.

main()
    .then(()=> console.log('Connection successful.'))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const orderSchema = new Schema({ //Defining orderSchema.
    item : String,
    price : Number,
});

const customerSchema = new Schema({
    name : String,
    orders : [
        {
            type : Schema.Types.ObjectId, //ObjectId ko as a type define krne ke liye, to type mein is tarah se ham likh sakte hai agr hamein kabhi bhi ObjectId store karani hoti hai apne child document ke liye.
            ref : 'Order', //ref yaani reference variable, us model ka naam jise ham refer krna chah rhe hai wo uske baad likhte hai kyuki hamein yeh batana padega ki kaunse collection se ye ObjectId aa rhi hogi. To MongoDB kaha se tally krega ki ObjectId exist krti hai ya nhi agr usko Collection name hi na pata ho? -> isliye  yha us collection ka naam aayega jise apan refer krna chahte hai.
        },
    ],
});

//pre Mongoose middleware for our customerSchema:
// customerSchema.pre('findOneAndDelete', async() => { //delete query ke run hone ke pehle execute ho jaata hai.
//     console.log('Pre Middleware.');
// });

//post Mongoose middleware for our customerSchema:
// customerSchema.post('findOneAndDelete', async() => { //delete query ke run hone ke baad execute hota hai.
//     console.log('Post Middleware.');
// });
customerSchema.post('findOneAndDelete', async(customer) => { //delete query ke run hone ke baad execute hota hai.
    if (customer.orders.length){ //yaani agr customer.orders.length > 0 hai, uske orders exist krte hai, to ye line execute hogi:
        let res = await Order.deleteMany({ _id : { $in: customer.orders } });//yaani customer.orders ki list ke andar jitne bhi orders hai, wo sabhi delete krne hai. Jab bhi ham kisi field ki list se matching krte hai to we use 'in' operator. To ham Order.deleteMany se wo saari ids delete kr denge jo hamari customer.orders wali ids se match krti hai. Ab isse Burger wala order delete ho jayega.
        console.log(res);
    }
});

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

// const addCustomer = async() => {
//     let cust1 = new Customer({
//         name : 'Rahul Kumar',
//     });
//     // Yha individual Id push nhi kr rhe, pura order hi ham push kr rhe hai: 
//     let order1 = await Order.findOne({item : 'Chips'}); //Order model/collection ke andar findOne method ko call kr rhe hai jismein item 'Chips' wala hoga uska pura data hamare order1 mein store ho jayega.
//     let order2 = await Order.findOne({item : 'Chocolate'});

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     let result = await cust1.save();
//     console.log(result); //ab mongoose yha dikhayega ki pura ka pura object hi push hua hai, lekin MongoDB shell ke andar dekhenge db.customers.find() krke to pata chalega ki sirf unki id hi actually push hoti hai. Kyu? -> kyuki type mein hamne sirf ObjectId ko hi define kara hai customerSchema mein.
// };

// addCustomer();

//agr chaho to yha vs code mein bhi uske terminal mein thi cheez verify kr sakte ho by making a findCustomer() method:
const findCustomer = async() => {
    // let result = await Customer.find({});
    let result = await Customer.find({}).populate('orders'); //result to order ke saath populate krna matlab orders pure add kr dena customer mein, to ab isse sabhi jo orders hai un orders id ki jagah pure orders ki details aa jayengi. To kai baar sirf reference se baat nhi banti ho sakta hai hamein pura data uska extract krna ho to aise mein we use populate method.
    console.log(result);
    console.log(result[0]);
};

// findCustomer();

// const addOrders = async() => {
//     let result = await Order.insertMany([
//         {item : 'Samosa', price : 15},
//         {item : 'Chips', price : 10},
//         {item : 'Chocolate', price : 40},
//     ]);
//     console.log(result);
// };

// addOrders();

// One to Many (Populate) : Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s). We may populate a single document, multiple documents, a plain object, multiple plain objects, or all objects returned from a query. ab agr ham chahte hai ki jaise yha pr bas ObjectId show ho rhi hai Customer mein, to wo pure order ki information ke saath replace ho jaaye to us process ko population ka process keh sakte hai.

// Handling Deletion: using Mongoose Middleware
// We can use 2 middlewares :
// • Pre - run before the query is executed.
// • Post - run after the query is executed.

// Handling deletion yaani agr ek model agr kuch delete hua to fir dekha jata hai ki kya us model ka kisi dusre model ke saath relation to nhi tha, aur agr tha to us related data ko bhi delete krna padega. Jaise ki users aur posts do model hai. agr one to many relation hai jaha ek user kitne bhi post kr sakta hai. Lekin agr wahi user delete ho gya ho to posts model se bhi uska related data(uski sabhi posts) delete kr dena. Also known as Cascading of deletion, yaani  deletion ek jagah se dusri jagah tak kaise propagate krega.

// let's say customers aur orders do model hai, har ek customer mein orderIDs store ho rhi hai. Jaise jo kisi customer ko database se delete kiya jaaye, waise hi uske sabhi related orders ko bhi delete kr dein. Ye kaam apan Mongoose Middlewares se easily kr sakte hai. Ye middlewares Express ke middlewares se those se alag hote hai. Inka kaam bhi Express middlewares jaisa hi hota hai, bas kuch  characterstics alag alag hoti hai. Check this page for further info about that: https://mongoosejs.com/docs/middleware.html

// We'll use Query middlewares for handling deletion.

//function to add a customer in the database: 
const addCust = async() => {
    let newCust = new Customer({
        name : 'John Doe',
    });

    let newOrder = new Order({
        // item : 'Pizza',
        item : 'Burger',
        price : 250,
    });

    newCust.orders.push(newOrder);
    await newOrder.save();
    await newCust.save();

    console.log('Added a new Customer.');
};

const delCust = async() => {
    let data = await Customer.findByIdAndDelete('67694e7ed21f34f894b474b5');// pr isse bas wo customer (John Doe) delete ho jayega lekin uska Order(Pizza) abhi bhi database mein bana rhega, ham chahte hai ki wo related orders bhi delete ho jaaye, for that we have two Mongoose Middlewares : pre and post.
    console.log(data);
}

// addCust();
delCust();

// agr ham chahte hai ki query execute hone ke pehle kuch kaam ho to we use pre middleware, lekin agr ham chahte hai ki query execute hone ke baad kuch kaam ho to we use post middleware for that.
// Note: as per Mongoose's documentation, agr ham findByIdAndDelete() method ko call lagate hai, to ye method automatically findOneAndDelete middleware ko call lagata hai. To, agr hamne is findOneAndDelete middleware ke liye ek aur mongoose middleware ko define kr diya to ultimately findByIdAndDelete findOneAndDelete ko call lagayega, aur findOneAndDelete hamare defined mongoose middleware ko call lagayega.
// Ye kyu bataya? -> kyuki query middlwares mein findByIdAndDelete ke liye koi middlware nhi hota, lekin findOneAndDelete() ke liye hota hai, aur findOneAndDelete khud apne aap mein ek middleware hai for findByIdAndDelete().
// hamara additonal defined middleware pre bhi ho sakta hai, aur post middleware bhi ho sakta hai. 

// Hamare case mein ham chahte hai ki Customer ke delete hone ke baad uske orders bhi orders model se delete ho jaaye. To is case mein POST middleware ka ham use krenge, kyuki customer ke delete hone ke baad ham yeh kaam krwana chah rhe hai.