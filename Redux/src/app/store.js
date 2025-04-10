// Redux: State Management Library for JS Apps. Redux is built for larger, more complex applications.
// Redux Toolkit is the official recommendation of writing Redux code. Redux ko sirf react hi nhi, Vuejs, Angularjs, ya simple vanilla JS code mein bhi use kr sakte hai. Pr generally, apan React ke saath isko use krte hai. Pr Redux React ka part nhi hota.
// Generally, apne small-scale applications mein Redux ki as such koi need nhi hoti. Isko generally tabhi use krna chahiye jab apan koi large aur complex application bana rhe ho aur bahut hi saare state variables use ho rhe ho. Ye generally real-life projects ke andar hota hai. Aise mein we use Redux.

// General Use-Case: Jin projects mein state hierarchial form mein props pass on krta ho, ya fir agr alag alag components same state variable ko share kr rhe ho. In these cases we can use Redux.
// Redux ko tabhi prefer kr rhe hai jab apni state-related cheezein complex ho rhi hai. Redux ko use krna yaani ek central store ko use krna, jo hamari sabhi state variables ko store krega aur manage krega. Jaise ki saari road ki dukaano ko ek mall ke andar locate kr dena. Ab saari cheezein unko mall mein hi mil jayengi. Kuch aisa hi apna Redux hota hai.
// Individual components ab banana ki need nhi rehti, instead apan ab ek single store bana lenge jiske andar state management hoga.
// Redux ko use krne ke liye (in React) we have a popular library named react-redux

// Redux ke andar hi apne pass kuch helpful tools hote hai, unko kehte hai Redux Toolkit. To maximum cases mein jaha apan functional components ka use kr rhe honge to apan Redux toolkit ka hi use kr rhe honge.

// Store is a central library that stores the states. Ye ek JavaScript object hoti hai jiske andar ab saare state variables aa jayenge. Jaise apne pass setState() method tha to make changes in our state variable, waise hi redux mein kisi bhi state ko change krna ho to we have functions for doing that. In functions ko apan kehte hai 'reducers'.

// store -> object
// reducers -> functions

// Reducers ko parameter mein 2 cheezein batani padti hai: state(yaani store ke andar jaake apan ko kaunsi state ko mutate ya change krna hai) aur dusra action(yaani kis action ke basis pr hamein ye kaam krna chahiye). Action ko apan Js event se relate kr sakte hai. 
// Ek central jagah pr state maintain kr li, aur jaise hi koisa specific action ho gya, to apan kaafi saare components mein ek saath changes la sakte hai using redux.
// action bhi apna ek plain Js object hi hota hai.

// General Definitions:
// Store : A centralized store holds the whole state tree of your application.
// Reducers : Functions that take the current state and an action as arguments, and return a new state result. In other words, (state, action) => newState.
// Action : It is a plain JavaScript object that has a type field. (like events)
// Slice : Collection of Redux reducer logic and actions for a single feature in your app, typically defined together in a single file. Agr apan logically apni website ko features ke andar define krein, to har feature ke jo reducers aur actions honge, unko apan saath mein ek single file ke andar likh sakte hai, jisko slice kehte hai. Jaise navbar ka jo pura reducers aur actions ka logic hoga wo ek alag file mein likha jayega, to navbar ki alag slice ban rhi hogi, similarly footer ki bhi alag slice ban rhi hogi, and so on.

// redux.js.org -> official documentation page of redux.

// Setup Project includes:
// 1. Store: Store ko design krna padta hai, yaani usmein kya-kya information honi chahiye.
// 2. Actions: Yaani jo bhi apan app bana rhe hai uske andar kya-kya actions ya events ho sakte hai jinke basis pr apan ko state ko change krna pad jaye.
// 3. Reducer(s): jab store aur actions define ho jaate hai, fir apan Reducers ko likhte hai, yaani aise functions jo actions ke upar dependent hai. Finally, ye reducers hamare store ke andar pass on kiye jaate hai. 

// we'll be creating a Todo list app here: 
// create/add , delete and mark As Done todo 

// Todo App:
// Designing the Store:
// todo -> id, task, isDone

// Sabhi todos ko array mein store kr denge aur har individual todo ko object ke form mein banayenge. Har ek todo mein id hogi(to identify individual task), task(yaani kya task hai - coding, sleeping, etc.), aur teesra apan Boolean variable isDone, jo check krega ki kya apna task complete ho gya ya Nhi. Initially sabhi isDone variables false honge.

// todo => {id, task, isDone}

// Actions
// Add a Todo, Mark as Done, Delete a Todo

// A general overview of Add a todo action: 
// {
//     type : "ADD_TODO", //redux mein action objects ke type define krna compulsory hota hai. Ye type kuch bhi ho sakta hai, jaise koisa number, object, etc. Generally apan ise string rakhte hai. Redux toolkit se ye fayda hota hai ki apan ko ye objects ab alag se define nhi krne hote hai, ye apne aap define ho jaate hai.
//     payload : "write code", // Action ke saath additional information ko pass on kr sakte hai, jisko payload kehte hai. Jaise Js mein event ke andar target information, type of event, etc. waise hi Action ke andar additinal information hoti hai jisko apan payload keh dete hai. Jaise yha todo mein additonal information hai ki "write code". Similarly, agr delete todo action hota to usmein type ho jaata "DELETE_TODO" aur payload mein apan us todo ki id pass kr dete. Agr multiple information aisi pass krni hai to apne payload mein object pass kr sakte hai consiting of all additonal information related to that action.
// }

// Actions yaani events, ki apne app ke andar kya-kya kaam ho sakte hai. Apni todo list app mein ye basic 3 kaam honge - Todo add krna, usko mark as done krna, ya fir delete krna.

// Creating a reducer: Redux Toolkit automatically generates action creators (fnxs that create action objects). Reducers ko apan slice ke according create krte hai. Jis component ke jitne reducers hai wo usi component wali slice mein jayenge. Jaise navbar component hai, to uske sabhi reducers navbar wali slice mein jayenge, and so on.

// Apne case mein we're just creating a single slice - Todo list slice. To usi mein apne sabhi reducer function jayenge. 

// (state, action) => { // update state )

import { configureStore } from '@reduxjs/toolkit'; //store ka basic setup krne ke liye.
// Adding slice reducers to the store:
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({ //ye method apna store return krke dega in the form of object.
    // reducer: {}, //yha pr apne sabhi reducers ko pass krte hai. Initially to empty object hi rahega kyuki koisa reducer nhi banaya.
    reducer: todoReducer, //ab yha apna todoReducer pass kr diya, which is an object as well.
});