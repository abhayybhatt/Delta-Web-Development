//reducers related to todo list
import { createSlice, nanoid } from '@reduxjs/toolkit'; //createSlice function ki help se apan slice(yaani reducers aur action ka bundle) create krte hai. Aur nanoid is similar to uuidv4 npm package.

const initialState = { //ye object apne slice ke andar ke state varibales ki initial state ko define krta hai, yaani unko initialize kaise krna hai. Apne case mein apan ko ek todos naam ki empty array ko initialize krna hai, ya fir usmei ek sample object rakhna hai.
    todos: [{id: 'abc', task: 'demo-task', isDone: false}], //ek sample todo apni todo array mein store kr diya.
} 

export const todoSlice = createSlice({
    name: 'todo', //generally wahi name dete hai jo apne feature ko diya hai (todo in this case).
    initialState,
    reducers: { //yha apne main 3 actions the, to un 3 actions ke liye 3 reducers banate hai. Agr action apna event hai, to reducer ek type se event Handler hai. Yaani ye action ho gya, ab us state ke andar specified changes le aao. To apan ek type se reducers aur actions ke combo ko use krte hai apne slice ke andar. Reducers ko apan kehte hai an object of functions. Reducers ke andar 2 varibles aate hai - state aur action.

        addTodo: (state, action)  => { //state matlab apne state variables aur action matlab jo event occur hua hai. State ke andar complete state hogi jise access kr sakte hai, including our todos array. Pr us todo array ko access krne se pehle apan ko ek naya todo define krne hoga:  
            const newTodo = { //yha hamein assume krna hai ki action bhi aa gya hoga, yaani payload bhi aa gya hoga.
                // id: 123, //har todo ki ek unique id generate krni padegi, uske liye we know about an npm package known as uuidv4. Pr redux mein we have a function known  as nanoid, jo ki hamare liye ek unique id generate krke degi:
                id: nanoid(),
                task: action.payload, //task ko access krne ke liye action.payload Yha hamein action object ko define nhi krna, instead ye imagine krna hai ki action object ke andar type aur payload rhega. Similarly, delete  mein hamein imagine krna hai ki todo delete krne ke liye hamare pass payload mein uski id hogi. Aur wo id us action object mein aayegi kaise? -> wo apan components ke through pass krenge.
                isDone: false,
            };
            // Ab is object ko apne todo array ke andar push kr denge: 
            state.todos.push(newTodo); //yha apne state variable array ke andar directly apan ne value ko push kr diya. Ye normally React mein possible nhi hota - this is called direct mutation of the array. React mein hamein apne is array ko destructure krna padta: [...todos, newTodo] yaani ek completely new state pass krni padti hai. Yaani normally React mein hamein ek entirely new array create krna hota hai, purane array ko uske andar copy krna hota hai aur naye todo ko usmein extra add krna hota hai. Aur yha pr directly usi array mein apan ne newTodo push kr diya. Yo Redux toolkit ka ye aur benefit hai ki apan directly apne variable ko mutate kr sakte hai.
        },
        deleteTodo: (state, action) => {
            //action.payload ke andar apni id rhegi jisko delete krna hai.
            state.todos = state.todos.filter((todo) => todo.id !== action.payload); //hamara jo state hai uske andar todo mein filter method is tarah se apply krna hai ki wo saare todos nikaal lo jinki id action.payload ke equal na ho, kyuki us wale todo ko to apan ko delete krna hai. action.payload ke andar apni wo todo ki id hogi jisko delete krna hai. Ab yha se ek naya array return ho jayega jisko apan directly store kara rhe hai state.todos ke andar.
        },
        markAsDone: (state, action) => {
            //action.payload ke andar wo id rhegi jisko mark as done krna hai, yaani isDone ko krna hai true. For that we can use map function:
            state.todos = state.todos.map((todo) => { //har individual todo ko map kr lenge. Ye map function ek naya array return krke dega jisko apan state.todos mein hi store kara lenge.
                if(todo.id === action.payload){
                    return { ...todo, isDone: true }; // Return updated todo
                }
                return todo; // Return unchanged todo
            });
        },

        // ab ye teeno hi reducers kisi na kisi tarike se apne state ko change kr rhe hai, aur apan ko nayi updated state return krke de rhe hai.
    },
});

export const {addTodo, deleteTodo, markAsDone} = todoSlice.actions; //ye kya hai? -> Action creators are generated for each case reducer function. Yaani jo bhi apne reducer functions hote hai, unke liye redux toolkit automatically action creators generate krta hai. Action creators yaani those functions that create action objects. Ye action objects ko apan nhi banate, pr inko automatically redux toolkit ki help se generate krne ke liye action objects lagte hai. Lekin redux ko kaise pata chalega ki kaun-kaunse action objects create hone chahiye? to uske liye apan likhte hai todoSlice.actions Yaani har reducer function ke liye kya action object hona chahiye wo automatically create krne ke liye apne pass ek function aa jayega.
export default todoSlice.reducer; //isse hamare individual reducers export hokr aa jaate hai.

// *Redux Toolkit lets you write simpler immutable update logic using "mutating" syntax. Ye logically programming mein possible nhi hota lekin Redux toolkit mein mutating syntax ki help se apan ye achieve kr paa rhe hai.

// kisi bhi project pr kaam kr rhe ho, if you have to create a slice uska yeh procedure rehta hai:
// 1. Import createSlice
// 2. Define initialState 
// 3. Define your slice - usmein naam likhenge, initialState likhenge, aur apne reducer functions likhenge. Aur last mein export ki dono lines likh denge.
